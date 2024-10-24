import type { Player } from './player'
import { defineStore } from 'pinia'
import { reactive } from 'vue'

export enum MapTile {
  WALL = 1,
  FLOOR = 2,
}

export type Map = MapTile[][]

export const useMapStore = defineStore('map', () => {
  let map = reactive<Map>([])

  function setupMap (newMap: Map) {
    // 直接赋值会导致 map 和 newMap 的地址不一样 测试时候的equal不通过 (错误示范❌)
    // map = newMap

    // 正确做法是 删除掉 map的数据 然后通过splice复制数组
    map.splice(0, map.length, ...newMap)
  }

  function isWall (position: Player) {
    return map[position.y][position.x] === MapTile.WALL
  }
  return {
    map,
    setupMap,
    isWall,
  }
})
