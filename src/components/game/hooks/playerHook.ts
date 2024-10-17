import { defineStore } from 'pinia'
import { onMounted, onUnmounted } from 'vue'
import { usePosition } from '~/componsables'
import { usePlayerStore } from '~/store'

export enum KEY_CODE {
  LEFT = 'ArrowLeft',
  RIGHT = 'ArrowRight',
  UP = 'ArrowUp',
  DOWN = 'ArrowDown',
}

export const usePlayerHook = defineStore('playHook', () => {
  function useMove () {
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
  const { player } = usePlayerStore()
  const { position } = usePosition(player)

  return {
    useMove,
    position,
  }
})
