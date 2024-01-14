<template>
  <div class="number-puzzle">
    <div class="header">
      <div class="time">{{ time }}</div>
    </div>
    <div class="puzzle-board">
      <NumberBlock
        v-for="(num, index) in board"
        :key="num"
        :num="num"
        @click="handleClick(index)"
        @mouseenter="handleMouseenter(index)"
      />
    </div>
    <div class="footer">
      <el-button @click="randomize">打乱</el-button>
      <el-button @click="reset">重置</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useNumberPuzzle } from '@/hooks/numberPuzzle'
import NumberBlock from './numberBlock/NumberBlock.vue'

const props = defineProps({
  order: {
    type: Number,
    default: 4
  },
  gap: {
    type: Number,
    default: 2
  },
  size: {
    type: Number,
    default: 60
  },
  borderRadius: {
    type: Number,
    default: 0
  },
  /** 操作方式：点击 / 滑动 */
  mode: {
    type: String as PropType<'click' | 'move'>,
    default: 'move'
  }
})

const { board, order, time, move, randomize, reset } = useNumberPuzzle(props.order)

const handleClick = (index: number) => {
  props.mode === 'click' && move(index)
}

const handleMouseenter = (index: number) => {
  props.mode === 'move' && move(index)
}
</script>

<style scoped lang="scss">
.number-puzzle {
  display: flex;
  flex-direction: column;
  gap: 20px;
  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .puzzle-board {
    --size: calc(v-bind('$props.size') * 1px);
    --border-radius: calc(v-bind('$props.borderRadius') * 1px);
    display: grid;
    grid-template-columns: repeat(v-bind(order), min-content);
    grid-template-rows: repeat(v-bind(order), 1fr);
    grid-gap: calc(v-bind('$props.gap') * 1px);
  }
}
</style>
