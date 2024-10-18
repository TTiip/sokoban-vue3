import { defineStore } from 'pinia'
import { reactive } from 'vue'

export interface CargoItem {
  x: number
  y: number
}

export const useCargoStore = defineStore('cargo', () => {
  const cargos: CargoItem[] = reactive([])

  function createCargo (pos: { x: number, y: number }): CargoItem {
    return {
      x: pos.x,
      y: pos.y,
    }
  }

  function addCargo (carItem: CargoItem) {
    cargos.push(carItem)
  }

  function getCargoItem (targetItem: CargoItem) {
    return cargos.find(item => {
      return (item.x === targetItem.x) && (item.y === targetItem.y)
    })
  }

  return {
    cargos,
    addCargo,
    createCargo,
    getCargoItem,
  }
})
