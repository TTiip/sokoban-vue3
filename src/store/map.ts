import { defineStore } from 'pinia'

export const useMapStore = defineStore('map', () => {
  const arr = [1, 12, 123]
  return {
    arr,
  }
})
