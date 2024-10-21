import { defineStore } from 'pinia'
import { reactive } from 'vue'
import { useCargoStore } from './cargo'
import { useMapStore } from './map'

export interface Player {
  x: number
  y: number
}

export const usePlayerStore = defineStore('player', () => {
  const player = reactive<Player>({
    x: 1,
    y: 1,
  })

  const { isWall } = useMapStore()

  function _move (dx: number, dy: number) {
    const position = { x: player.x + dx, y: player.y + dy, onTarget: false }
    if (isWall(position)) {
      return
    }

    const { findCargoItem, moveCargo } = useCargoStore()
    const cargoItem = findCargoItem(position)
    if (cargoItem) {
      const isMoveCargo = moveCargo(cargoItem, dx, dy)
      if (!isMoveCargo) {
        return
      }
    }

    player.x += dx
    player.y += dy
  }
  function movePlayerToLeft () {
    _move(-1, 0)
  }

  function movePlayerToRight () {
    _move(1, 0)
  }

  function movePlayerToUp () {
    _move(0, -1)
  }

  function movePlayerToDown () {
    _move(0, 1)
  }

  return {
    player,
    movePlayerToLeft,
    movePlayerToRight,
    movePlayerToUp,
    movePlayerToDown,
  }
})
