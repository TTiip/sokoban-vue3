import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, describe, expect, it } from 'vitest'
import { useTargetStore } from '../target'

describe('targets', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('should create cargo an add cargos', () => {
    const { targets, createTarget, addTarget } = useTargetStore()

    const cargoItem = createTarget({ x: 2, y: 1 })
    addTarget(cargoItem)

    expect(targets.length).toBe(1)
  })
})
