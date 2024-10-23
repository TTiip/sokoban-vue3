import { defineStore } from 'pinia'
import { reactive } from 'vue'
import { useCargoStore } from './cargo'
import { useTargetStore } from './target'

interface Game {
  isGameCompleted: boolean
}

export const useGameStore = defineStore('game', () => {
  const game = reactive<Game>({
    isGameCompleted: false,
  })

  function detectionGameCompleted () {
    const { cargos } = useCargoStore()

    game.isGameCompleted = cargos.every(item => item.onTarget)
  }

  function setupGame () {
    const { cargos, addCargo, createCargo } = useCargoStore()
    addCargo(createCargo({ x: 4, y: 4 }))
    addCargo(createCargo({ x: 3, y: 3 }))

    const { targets, addTarget, createTarget } = useTargetStore()
    addTarget(createTarget({ x: 6, y: 6 }))
    addTarget(createTarget({ x: 7, y: 7 }))

    return {
      cargos,
      targets,
    }
  }
  return {
    game,
    setupGame,
    detectionGameCompleted,
  }
})
