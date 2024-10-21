import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, describe, expect, it } from 'vitest'
import { useCargoStore } from '../cargo'

describe('cargos', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('should create cargo an add cargos', () => {
    const { cargos, addCargo, createCargo } = useCargoStore()

    const cargoItem = createCargo({ x: 2, y: 1 })
    addCargo(cargoItem)

    expect(cargos.length).toBe(1)
  })
})
