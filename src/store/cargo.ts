import { defineStore } from 'pinia'
import { reactive } from 'vue'
import { useMapStore, useTargetStore } from '~/store'

export interface CargoItem {
  x: number
  y: number
  onTarget: boolean
}

export const useCargoStore = defineStore('cargo', () => {
  const cargos: CargoItem[] = reactive([])

  function createCargo (pos: { x: number, y: number }): CargoItem {
    return {
      x: pos.x,
      y: pos.y,
      onTarget: false,
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
      onTarget: cargoItem.onTarget,
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
    // 根据状态 改变cargo的状态 显示不同的箱子图片
    detectionTarget(cargoItem)

    return true
  }

  function detectionTarget (cargo: CargoItem) {
    const { findTargetItem } = useTargetStore()
    cargo.onTarget = !!findTargetItem(cargo)
  }

  return {
    cargos,
    addCargo,
    createCargo,
    findCargoItem,
    moveCargo,
  }
})
