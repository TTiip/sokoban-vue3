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

  it('should clean all targets', () => {
    const { addTarget, createTarget, targets, cleanAllTargets } = useTargetStore()
    addTarget(createTarget({ x: 3, y: 1 }))
    addTarget(createTarget({ x: 2, y: 1 }))

    cleanAllTargets()

    expect(targets.length).toBe(0)
  })
})
