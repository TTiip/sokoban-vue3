import { defineStore } from 'pinia'
import { reactive } from 'vue'

export interface TargetItem {
  x: number
  y: number
}

export const useTargetStore = defineStore('target', () => {
  const targets: TargetItem[] = reactive([])

  function createTarget (pos: { x: number, y: number }): TargetItem {
    return {
      x: pos.x,
      y: pos.y,
    }
  }

  function addTarget (targetItem: TargetItem) {
    targets.push(targetItem)
  }

  function findTargetItem (targetItem: TargetItem) {
    return targets.find(item => {
      return (item.x === targetItem.x) && (item.y === targetItem.y)
    })
  }

  return {
    targets,
    addTarget,
    createTarget,
    findTargetItem,
  }
})
