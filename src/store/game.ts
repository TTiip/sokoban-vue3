import { defineStore } from 'pinia'
import { reactive } from 'vue'
import type { GameData, LevelGameData } from '~/data/gameData'
import { useCargoStore } from './cargo'
import { useMapStore } from './map'
import { usePlayerStore } from './player'
import { useTargetStore } from './target'

interface Game {
  isGameCompleted: boolean
  level: number
}

export const useGameStore = defineStore('game', () => {
  const game = reactive<Game>({
    isGameCompleted: false,
    level: 1,
  })

  let _gameData: GameData

  function detectionGameCompleted () {
    const { cargos } = useCargoStore()

    game.isGameCompleted = cargos.every(item => item.onTarget)
  }

  function setupGame (gameData: LevelGameData[]) {
    _gameData = gameData
    setupLevel()
  }

  function setupLevel () {
    const levelGameData = _gameData[game.level - 1]
    const { player } = usePlayerStore()
    const { setupMap } = useMapStore()
    const { cargos, addCargo, createCargo, cleanAllCargos } = useCargoStore()
    const { targets, addTarget, createTarget, cleanAllTargets } = useTargetStore()

    const {
      player: playData = { x: 0, y: 0 },
      cargos: cargosData = [],
      targets: targetsData = [],
      map: mapData = [],
    } = levelGameData

    setupMap(mapData)

    player.x = playData?.x
    player.y = playData?.y

    cleanAllCargos()
    cargosData?.map(cargo => {
      addCargo(createCargo(cargo))
    })

    cleanAllTargets()
    targetsData?.map(target => {
      addTarget(createTarget(target))
    })
  }

  function toNextLevel () {
    game.level += 1
    game.isGameCompleted = false
    setupLevel()
  }

  return {
    game,
    setupGame,
    detectionGameCompleted,
    toNextLevel,
  }
})
