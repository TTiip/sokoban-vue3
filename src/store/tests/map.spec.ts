import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, describe, expect, it } from 'vitest'
import { useMapStore } from '../map'

describe('map', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('should setup map', () => {
    const newMap = [
      [1, 1, 1],
      [1, 1, 1],
      [1, 1, 1],
    ]
    const { map, setupMap } = useMapStore()
    setupMap(newMap)

    expect(map).toEqual(newMap)
  })
})
