import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, describe, expect, it } from 'vitest'
import { useCargoStore } from '../cargo'
import { useGameStore } from '../game'
import { useTargetStore } from '../target'

describe('map', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('should game completed', () => {
    const { addCargo, createCargo, moveCargo } = useCargoStore()
    const { addTarget, createTarget } = useTargetStore()

    const cargoItem = createCargo({ x: 2, y: 1 })
    addCargo(cargoItem)

    const targetItem = createTarget({ x: 3, y: 1 })
    addTarget(targetItem)
    moveCargo(cargoItem, 1, 0)

    const { game, detectionGameCompleted } = useGameStore()

    detectionGameCompleted()
    expect(game.isGameCompleted).toBe(true)
  })

  it('should not completed', () => {
    const { addCargo, createCargo, moveCargo } = useCargoStore()
    const { addTarget, createTarget } = useTargetStore()

    const cargoItem = createCargo({ x: 2, y: 1 })
    addCargo(cargoItem)

    const targetItem = createTarget({ x: 3, y: 1 })
    addTarget(targetItem)

    const { game, detectionGameCompleted } = useGameStore()

    moveCargo(cargoItem, 1, 0)
    moveCargo(cargoItem, 1, 0)
    detectionGameCompleted()
    expect(game.isGameCompleted).toBe(false)
  })
})
