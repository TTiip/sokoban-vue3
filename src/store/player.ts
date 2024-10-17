import { defineStore } from 'pinia'
import { reactive } from 'vue'
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

  function movePlayerToLeft () {
    const position = {
      x: player.x - 1,
      y: player.y,
    }
    if (isWall(position)) {
      return
    }
    player.x -= 1
  }

  function movePlayerToRight () {
    const position = {
      x: player.x + 1,
      y: player.y,
    }
    if (isWall(position)) {
      return
    }
    player.x += 1
  }

  function movePlayerToUp () {
    const position = {
      x: player.x,
      y: player.y - 1,
    }
    if (isWall(position)) {
      return
    }
    player.y -= 1
  }

  function movePlayerToDown () {
    const position = {
      x: player.x,
      y: player.y + 1,
    }
    if (isWall(position)) {
      return
    }
    player.y += 1
  }

  function resetPlayer () {
    player.x = 1
    player.y = 1
  }

  return {
    player,
    movePlayerToLeft,
    movePlayerToRight,
    movePlayerToUp,
    movePlayerToDown,
    resetPlayer,
  }
})
