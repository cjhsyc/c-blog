export const useNumberPuzzle = (order = 4) => {
  order = Math.min(Math.max(2, Math.floor(order)), 10)
  const length = order * order

  const directions = ['R', 'L', 'U', 'D'] as const
  const initBoard = new Array(length)
    .fill(0)
    .map((num, index) => (length - 1 === index ? 0 : index + 1))
  const board = ref([...initBoard])
  let lastBoard = [...initBoard]
  const moves = ref<(typeof directions)[number][]>([])
  const isSolved = ref(false)
  const startTime = ref(0)
  const endTime = ref(0)

  const blankIndex = computed(() => board.value.indexOf(0))
  const time = computed(() => ((endTime.value - startTime.value) / 1000).toFixed(3))
  const steps = computed(() => moves.value.length)

  let timer: NodeJS.Timeout | null = null

  const move = (index: number) => {
    if (
      isSolved.value ||
      index === blankIndex.value ||
      index < 0 ||
      index >= length ||
      index % 1 !== 0
    )
      return
    const dirs: (typeof directions)[number][] = []
    let steps = 0
    let dir: (typeof directions)[number] | '' = ''
    if (isSameRow(index)) {
      steps = index - blankIndex.value
      dir = steps > 0 ? 'R' : 'L'
    } else if (isSameCol(index)) {
      steps = (index - blankIndex.value) / order
      dir = steps > 0 ? 'D' : 'U'
    }
    dirs.push(...new Array(Math.abs(steps)).fill(dir))
    if (dirs.length) {
      if (moves.value.length === 0) {
        startTime.value = performance.now()
        endTime.value = startTime.value
        timer = setInterval(() => {
          endTime.value = performance.now()
        }, 95)
      }
      dirs.forEach((dir) => {
        moves.value.push(dir)
        _move(dir)
      })
      isSolved.value = check()
      if (isSolved.value) {
        timer && clearInterval(timer)
        endTime.value = performance.now()
      }
    }
  }

  const isSameRow = (index: number) => {
    return Math.floor(index / order) === Math.floor(blankIndex.value / order)
  }

  const isSameCol = (index: number) => {
    return Math.floor(index % order) === Math.floor(blankIndex.value % order)
  }

  /** 移动一步 */
  const _move = (dir: (typeof directions)[number]) => {
    let index = -1
    if (dir === 'R' && (blankIndex.value + 1) % order !== 0) {
      index = blankIndex.value + 1
    } else if (dir === 'L' && blankIndex.value % order !== 0) {
      index = blankIndex.value - 1
    } else if (dir === 'U' && blankIndex.value - order >= 0) {
      index = blankIndex.value - order
    } else if (dir === 'D' && blankIndex.value + order < board.value.length) {
      index = blankIndex.value + order
    }
    if (index > -1) {
      board.value[blankIndex.value] = board.value[index]
      board.value[index] = 0
    }
  }

  /** 检查是否完成 */
  const check = () => {
    return board.value.every((num, index) => num === initBoard[index])
  }

  /** 打乱 */
  const randomize = () => {
    do {
      board.value.sort(() => Math.random() - 0.5)
    } while (!isSolvable() || check())
    lastBoard = [...board.value]
    clear()
  }

  /** 判断是否有解 */
  const isSolvable = () => {
    let invCount = 0
    for (let i = 0; i < length - 1; i++) {
      for (let j = i + 1; j < length; j++) {
        if (board.value[j] && board.value[i] && board.value[i] > board.value[j]) {
          invCount++
        }
      }
    }
    // 空缺块的行数从底部开始计算
    const rowWithBlank = order - Math.floor(blankIndex.value / order)
    // 如果阶数为奇数，逆序数必须为偶数才有解
    if (order % 2 === 1) {
      return invCount % 2 === 0
    }
    // 如果阶数为偶数，逆序数和空缺块所在行数的奇偶性必须不同才有解
    else {
      return invCount % 2 !== rowWithBlank % 2
    }
  }

  const reset = () => {
    board.value = [...lastBoard]
    clear()
  }

  const clear = () => {
    timer && clearInterval(timer)
    moves.value = []
    isSolved.value = false
    startTime.value = 0
    endTime.value = 0
  }

  randomize()

  return { board, moves, isSolved, order, time, steps, move, randomize, reset }
}
