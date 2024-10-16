import { computed, onMounted, onUnmounted } from 'vue'
import { usePlayerStore } from '~/store'

export enum KEY_CODE {
  LEFT = 'ArrowLeft',
  RIGHT = 'ArrowRight',
  UP = 'ArrowUp',
  DOWN = 'ArrowDown',
}

export function useMove () {
  const { movePlayerToLeft, movePlayerToRight, movePlayerToUp, movePlayerToDown } = usePlayerStore()

  function handleKeyUp (e: KeyboardEvent) {
    switch (e.code) {
      case KEY_CODE.LEFT:
        movePlayerToLeft()
        break
      case KEY_CODE.RIGHT:
        movePlayerToRight()
        break
      case KEY_CODE.UP:
        movePlayerToUp()
        break
      case KEY_CODE.DOWN:
        movePlayerToDown()
        break
      default:
        break
    }
  }
  onMounted(() => {
    window.addEventListener('keyup', handleKeyUp)
  })

  onUnmounted(() => {
    window.removeEventListener('keyup', handleKeyUp)
  })
}

export function usePosition () {
  const STEP = 32
  const { player } = usePlayerStore()

  const position = computed(() => {
    return {
      left: `${player.x * STEP}px`,
      top: `${player.y * STEP}px`,
    }
  })

  return {
    position,
  }
}
