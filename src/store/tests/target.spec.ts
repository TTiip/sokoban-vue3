import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, describe, expect, it } from 'vitest'
import { useTargetStore } from '../target'

describe('targets', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('should create target an add targets', () => {
    const { targets, createTarget, addTarget } = useTargetStore()

    const targetItem = createTarget({ x: 2, y: 1 })
    addTarget(targetItem)

    expect(targets.length).toBe(1)
  })
})
