import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, describe, expect, it } from 'vitest'
import { useCargoStore } from '../cargo'
import { useMapStore } from '../map'
import { useTargetStore } from '../target'

describe('cargos', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    let map = [
      [1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 2, 2, 2, 2, 2, 2, 2, 1],
      [1, 2, 2, 2, 2, 2, 2, 2, 1],
      [1, 2, 2, 2, 2, 2, 2, 2, 1],
      [1, 2, 2, 2, 2, 2, 2, 2, 1],
      [1, 2, 2, 2, 2, 2, 2, 2, 1],
      [1, 2, 2, 2, 2, 2, 2, 2, 1],
      [1, 2, 2, 2, 2, 2, 2, 2, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1],
    ]

    const { setupMap } = useMapStore()
    setupMap(map)
  })

  it('should create cargo an add cargos', () => {
    const { cargos, addCargo, createCargo } = useCargoStore()

    const cargoItem = createCargo({ x: 2, y: 1 })
    addCargo(cargoItem)

    expect(cargos.length).toBe(1)
  })

  describe('cargo on target', () => {
    it('press in target', () => {
      const { addCargo, createCargo, moveCargo } = useCargoStore()
      const { addTarget, createTarget } = useTargetStore()

      const cargoItem = createCargo({ x: 2, y: 1 })
      addCargo(cargoItem)

      const targetItem = createTarget({ x: 3, y: 1 })
      addTarget(targetItem)

      moveCargo(cargoItem, 1, 0)
      expect(cargoItem?.onTarget).toBe(true)
    })

    it('press out target', () => {
      const { addCargo, createCargo, moveCargo } = useCargoStore()
      const { addTarget, createTarget } = useTargetStore()

      const cargoItem = createCargo({ x: 1, y: 1 })
      addCargo(cargoItem)

      const targetItem = createTarget({ x: 2, y: 1 })
      addTarget(targetItem)

      moveCargo(cargoItem, 1, 0)
      expect(cargoItem?.onTarget).toBe(true)
      moveCargo(cargoItem, 1, 0)
      expect(cargoItem?.onTarget).toBe(false)
    })

    it('should clean all cargos', () => {
      const { addCargo, createCargo, cleanAllCargos, cargos } = useCargoStore()
      addCargo(createCargo({ x: 2, y: 1 }))
      addCargo(createCargo({ x: 3, y: 1 }))

      cleanAllCargos()

      expect(cargos.length).toBe(0)
    })
  })
})
