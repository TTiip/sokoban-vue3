import type { Player } from './player'
import { defineStore } from 'pinia'

export enum MapTile {
  WALL = 1,
  FLOOR = 2,
}

type Map = MapTile[][]

export const useMapStore = defineStore('map', () => {
  let map = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 2, 2, 2, 2, 2, 2, 2, 1],
    [1, 2, 2, 2, 2, 2, 2, 2, 1],
    [1, 2, 2, 2, 2, 2, 2, 2, 1],
    [1, 2, 2, 2, 2, 2, 2, 2, 1],
    [1, 2, 2, 2, 2, 2, 2, 2, 1],
    [1, 2, 2, 2, 2, 2, 2, 2, 1],
    [1, 2, 2, 2, 2, 2, 2, 2, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1],
  ]

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
