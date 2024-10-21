import { defineStore } from 'pinia'
import { reactive } from 'vue'
import { useMapStore } from '~/store'

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

  function findCargoItem (targetItem: CargoItem) {
    return cargos.find(item => {
      return (item.x === targetItem.x) && (item.y === targetItem.y)
    })
  }

  function moveCargo (cargoItem: CargoItem, dx: number, dy: number) {
    const { isWall } = useMapStore()
    const posi = {
      x: cargoItem.x + dx,
      y: cargoItem.y + dy,
    }
    // 如果是箱子 不能推动
    if (findCargoItem(posi)) {
      return false
    }
    // 如果是墙壁 就不能推动
    if (isWall(posi)) {
      return false
    }

    cargoItem.x += dx
    cargoItem.y += dy
    return true
  }

  return {
    cargos,
    addCargo,
    createCargo,
    findCargoItem,
    moveCargo,
  }
})
