import { defineStore } from 'pinia'
import { reactive } from 'vue'
import { generateId } from '~/utils/ids'

export interface TargetItem {
  id?: number | string
  x: number
  y: number
}

export const useTargetStore = defineStore('target', () => {
  const targets = reactive<TargetItem[]>([])

  function createTarget (pos: { x: number, y: number }): TargetItem {
    return {
      // 添加id 避免因为 vue3 的优化导致的组件复用带来的问题
      id: generateId(),
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

  function cleanAllTargets () {
    targets.splice(0, targets.length)
  }

  return {
    targets,
    addTarget,
    createTarget,
    findTargetItem,
    cleanAllTargets,
  }
})
