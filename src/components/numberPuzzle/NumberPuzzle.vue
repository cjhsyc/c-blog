<template>
  <div class="number-puzzle">
    <div class="header">
      <div class="left">
        <div class="time">
          <el-icon><Timer /></el-icon>
          {{ Math.floor(time) }}
        </div>
      </div>
      <div class="steps">步数 {{ steps }}</div>
      <div class="setting">
        <div class="order" @click="handleChangeOrder">{{ order }}×{{ order }}</div>
      </div>
    </div>
    <div class="puzzle-board">
      <div class="view-board">
        <TransitionGroup name="number-block">
          <NumberBlock v-for="num in board" :key="num" :num="num" />
        </TransitionGroup>
      </div>
      <div class="event-board">
        <NumberBlock
          v-for="(num, index) in board"
          :key="num"
          :num="num"
          @click="handleClick(index)"
          @mouseenter="handleMouseenter(index)"
        />
      </div>
    </div>
    <div class="footer">
      <div class="randomize" @click="handleRandomize">
        <el-icon><Refresh /></el-icon>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useNumberPuzzle } from '@/hooks/numberPuzzle'
import NumberBlock from './numberBlock/NumberBlock.vue'
import { Refresh, Timer } from '@element-plus/icons-vue'

const props = defineProps({
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
  },
  transition: {
    type: Boolean,
    default: true
  }
})

const order = ref(4)
const { board, time, steps, move, randomize } = useNumberPuzzle(order)

const handleClick = (index: number) => {
  props.mode === 'click' && move(index)
}

const handleMouseenter = (index: number) => {
  props.mode === 'move' && move(index)
}

const handleChangeOrder = () => {
  order.value = order.value + 1 > 5 ? 3 : order.value + 1
}

const handleRandomize = () => {
  randomize()
}
</script>

<style scoped lang="scss">
.number-puzzle {
  display: flex;
  flex-direction: column;
  gap: 2em;
  width: 50vw;
  min-width: 250px;
  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    user-select: none;
    .left {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: start;
      .time {
        display: flex;
        align-items: center;
        gap: 0.2em;
        padding: 0.2em 0.5em;
        border-radius: 0.2em;
        color: white;
        background-color: black;
      }
    }
    .steps {
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .setting {
      flex: 1;
      display: flex;
      justify-content: end;
      align-items: center;
      .order {
        cursor: pointer;
        padding: 0.2em 0.5em;
        border-radius: 0.2em;
        &:hover {
          background-color: var(--bgc-hover);
        }
      }
    }
  }
  .puzzle-board {
    --size: calc(v-bind('$props.size') * 1px);
    --border-radius: calc(v-bind('$props.borderRadius') * 1px);
    display: flex;
    position: relative;
    justify-content: center;
    .view-board,
    .event-board {
      display: grid;
      grid-template-columns: repeat(v-bind(order), min-content);
      grid-template-rows: repeat(v-bind(order), 1fr);
      grid-gap: calc(v-bind('$props.gap') * 1px);
    }
    .view-board {
      pointer-events: none;
      .number-block-move {
        transition: all 0.2s;
      }
    }
    .event-board {
      opacity: 0;
      position: absolute;
    }
  }
  .footer {
    display: flex;
    justify-content: center;
    .randomize {
      width: 80%;
      cursor: pointer;
      padding: 5px 0;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 4px;
      font-size: 1.5em;
      &:hover {
        background-color: var(--bgc-hover);
      }
    }
  }
}
</style>
