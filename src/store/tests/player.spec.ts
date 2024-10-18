import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, describe, expect, it } from 'vitest'
import { useCargoStore } from '../cargo'
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

      movePlayerToLeft()

      expect(player.x).toBe(0)
    })

    it('should move to right', () => {
      const { movePlayerToRight, player } = usePlayerStore()

      player.x = 1

      movePlayerToRight()

      expect(player.x).toBe(2)
    })

    it('should move to top', () => {
      const { movePlayerToUp, player } = usePlayerStore()

      player.y = 1

      movePlayerToUp()

      expect(player.y).toBe(0)
    })

    it('should move to bottom', () => {
      const { movePlayerToDown, player } = usePlayerStore()

      player.y = 1

      movePlayerToDown()

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

      movePlayerToLeft()

      expect(player.x).toBe(1)
    })

    it('should not move to right when collision a wall', () => {
      const { movePlayerToRight, player } = usePlayerStore()

      player.x = 3

      movePlayerToRight()

      expect(player.x).toBe(3)
    })

    it('should not move to up when collision a wall', () => {
      const { movePlayerToUp, player } = usePlayerStore()

      player.y = 1

      movePlayerToUp()

      expect(player.y).toBe(1)
    })

    it('should not move to down when collision a wall', () => {
      const { movePlayerToDown, player } = usePlayerStore()

      player.y = 3

      movePlayerToDown()

      expect(player.y).toBe(3)
    })
  })

  describe('push cargo', () => {
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
    it('push cargo to left', () => {
      const { player, movePlayerToLeft } = usePlayerStore()
      const { addCargo, createCargo } = useCargoStore()

      player.x = 3

      const cargoItem = createCargo({ x: 2, y: 1 })
      addCargo(cargoItem)

      movePlayerToLeft()
      expect(player.x).toBe(2)
      expect(cargoItem.x).toBe(1)
    })

    it('push cargo to right', () => {
      const { player, movePlayerToRight } = usePlayerStore()
      const { addCargo, createCargo } = useCargoStore()

      player.x = 1

      const cargoItem = createCargo({ x: 2, y: 1 })
      addCargo(cargoItem)

      movePlayerToRight()

      expect(player.x).toBe(2)
      expect(cargoItem.x).toBe(3)
    })

    it('push cargo to up', () => {
      const { player, movePlayerToUp } = usePlayerStore()
      const { addCargo, createCargo } = useCargoStore()

      player.y = 3

      const cargoItem = createCargo({ x: 1, y: 2 })
      addCargo(cargoItem)

      movePlayerToUp()

      expect(player.y).toBe(2)
      expect(cargoItem.y).toBe(1)
    })

    it('push cargo to down', () => {
      const { player, movePlayerToDown } = usePlayerStore()
      const { addCargo, createCargo } = useCargoStore()

      player.y = 1

      const cargoItem = createCargo({ x: 1, y: 2 })
      addCargo(cargoItem)

      movePlayerToDown()

      expect(player.y).toBe(2)
      expect(cargoItem.y).toBe(3)
    })
  })
})
