import { defineStore } from 'pinia'
import { reactive } from 'vue'
import type { MapTile } from '~/store'

export const useMapEidtStore = defineStore('mapEdit', () => {
  const map = reactive<MapTile[][]>([
    [2, 2, 2, 2, 2],
    [2, 2, 2, 2, 2],
    [2, 2, 2, 2, 2],
    [2, 2, 2, 2, 2],
    [2, 2, 2, 2, 2],
  ])
  return {
    map,
  }
})
