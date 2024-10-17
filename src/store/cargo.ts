import { defineStore } from 'pinia'

interface CargoItem {
  x: number
  y: number
}

export const useCargoStore = defineStore('cargo', () => {
  const cargos: CargoItem[] = [
    {
      x: 2,
      y: 1,
    },
    {
      x: 2,
      y: 2,
    },
  ]

  return {
    cargos,
  }
})
