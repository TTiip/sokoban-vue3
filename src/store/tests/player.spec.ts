import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, describe, expect, it } from 'vitest'
import { useMapStore } from '../map'
import { usePlayerStore } from '../player'

describe('player', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  describe('normal move', () => {
    beforeEach(() => {
      const { setupMap } = useMapStore()
      const newMap = [
        [2, 2, 2],
        [2, 2, 2],
        [2, 2, 2],
      ]
      setupMap(newMap)
    })
    it('should move to left', () => {
      const { movePlayerToLeft, player } = usePlayerStore()

      player.x = 1
      player.y = 1

      movePlayerToLeft()

      expect(player.x).toBe(0)
      expect(player.y).toBe(1)
    })

    it('should move to right', () => {
      const { movePlayerToRight, player } = usePlayerStore()

      player.x = 1
      player.y = 1

      movePlayerToRight()

      expect(player.x).toBe(2)
      expect(player.y).toBe(1)
    })

    it('should move to top', () => {
      const { movePlayerToUp, player } = usePlayerStore()

      player.x = 1
      player.y = 1

      movePlayerToUp()

      expect(player.x).toBe(1)
      expect(player.y).toBe(0)
    })

    it('should move to bottom', () => {
      const { movePlayerToDown, player } = usePlayerStore()

      player.x = 1
      player.y = 1

      movePlayerToDown()

      expect(player.x).toBe(1)
      expect(player.y).toBe(2)
    })
  })

  describe('collision wall', () => {
    beforeEach(() => {
      const { setupMap } = useMapStore()
      const newMap = [
        [1, 1, 1, 1, 1],
        [1, 2, 2, 2, 1],
        [1, 2, 2, 2, 1],
        [1, 2, 2, 2, 1],
        [1, 1, 1, 1, 1],
      ]
      setupMap(newMap)
    })

    it('should not move to left when collision a wall', () => {
      const { movePlayerToLeft, player } = usePlayerStore()

      player.x = 1
      player.y = 1

      movePlayerToLeft()

      expect(player.x).toBe(1)
      expect(player.y).toBe(1)
    })

    it('should not move to right when collision a wall', () => {
      const { movePlayerToRight, player } = usePlayerStore()

      player.x = 3
      player.y = 1

      movePlayerToRight()

      expect(player.x).toBe(3)
      expect(player.y).toBe(1)
    })

    it('should not move to up when collision a wall', () => {
      const { movePlayerToUp, player } = usePlayerStore()

      player.x = 1
      player.y = 1

      movePlayerToUp()

      expect(player.x).toBe(1)
      expect(player.y).toBe(1)
    })

    it('should not move to down when collision a wall', () => {
      const { movePlayerToDown, player } = usePlayerStore()

      player.x = 1
      player.y = 3

      movePlayerToDown()

      expect(player.x).toBe(1)
      expect(player.y).toBe(3)
    })
  })
})
