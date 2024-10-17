import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, describe, expect, it } from 'vitest'
import { useMapStore } from '../map'

describe('map', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })
  it('init map data', () => {
    const mapData = [
      [1, 1, 1, 1, 1],
      [1, 2, 2, 2, 1],
      [1, 2, 2, 2, 1],
      [1, 2, 2, 2, 1],
      [1, 1, 1, 1, 1],
    ]
    const { map } = useMapStore()

    expect(map).toEqual(mapData)
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
