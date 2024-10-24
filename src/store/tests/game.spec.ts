import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, describe, expect, it } from 'vitest'
import type { LevelGameData } from '~/data/gameData'
import { useCargoStore } from '../cargo'
import { useGameStore } from '../game'
import { useMapStore } from '../map'
import { usePlayerStore } from '../player'
import { useTargetStore } from '../target'

const firstLevelGameData = {
  player: {
    x: 1,
    y: 1,
  },
  map: [
    [1, 1, 1, 1, 1, 1, 1, 1],
    [1, 2, 2, 2, 2, 2, 2, 1],
    [1, 2, 2, 2, 2, 2, 2, 1],
    [1, 2, 2, 2, 2, 2, 2, 1],
    [1, 1, 1, 1, 1, 1, 1, 1],
  ],
  cargos: [
    {
      x: 2,
      y: 2,
    },
    {
      x: 3,
      y: 3,
    },
  ],
  targets: [
    {
      x: 4,
      y: 3,
    },
    {
      x: 6,
      y: 3,
    },
  ],
}

const secondLevelGameData = {
  player: {
    x: 2,
    y: 1,
  },
  map: [
    [1, 1, 1, 1, 1, 1, 1, 1],
    [1, 2, 2, 2, 2, 2, 2, 1],
    [1, 2, 2, 2, 2, 2, 2, 1],
    [1, 2, 2, 2, 2, 2, 2, 1],
    [1, 1, 1, 1, 1, 1, 1, 1],
  ],
  cargos: [
    {
      x: 2,
      y: 2,
    },
    {
      x: 3,
      y: 3,
    },
  ],
  targets: [
    {
      x: 4,
      y: 3,
    },
    {
      x: 6,
      y: 3,
    },
  ],
}

const gameData = [firstLevelGameData, secondLevelGameData]

function expectSetupLevelGameData (levelGameData: LevelGameData) {
  const { player } = usePlayerStore()
  const { map } = useMapStore()
  const { cargos } = useCargoStore()
  const { targets } = useTargetStore()

  expect(player.x).toBe(levelGameData.player.x)
  expect(player.y).toBe(levelGameData.player.y)
  expect(map).toEqual(levelGameData.map)
  expect(cargos.length).toBe(levelGameData.cargos.length)
  expect(targets.length).toBe(levelGameData.targets.length)
}

describe('game', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
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

    const { setupMap } = useMapStore()
    setupMap(map)
  })

  it('should game completed', () => {
    const { addCargo, createCargo, moveCargo } = useCargoStore()
    const { addTarget, createTarget } = useTargetStore()

    const cargoItem = createCargo({ x: 2, y: 1 })
    addCargo(cargoItem)

    const targetItem = createTarget({ x: 3, y: 1 })
    addTarget(targetItem)
    moveCargo(cargoItem, 1, 0)

    const { game, detectionGameCompleted } = useGameStore()

    detectionGameCompleted()
    expect(game.isGameCompleted).toBe(true)
  })

  it('should not completed', () => {
    const { addCargo, createCargo, moveCargo } = useCargoStore()
    const { addTarget, createTarget } = useTargetStore()

    const cargoItem = createCargo({ x: 2, y: 1 })
    addCargo(cargoItem)

    const targetItem = createTarget({ x: 3, y: 1 })
    addTarget(targetItem)

    const { game, detectionGameCompleted } = useGameStore()

    moveCargo(cargoItem, 1, 0)
    moveCargo(cargoItem, 1, 0)
    detectionGameCompleted()
    expect(game.isGameCompleted).toBe(false)
  })

  it('should be setup game', () => {
    const { setupGame } = useGameStore()

    setupGame(gameData)

    expectSetupLevelGameData(firstLevelGameData)
  })

  it('should be go to next level & level +1', () => {
    const { game, toNextLevel, setupGame } = useGameStore()
    setupGame(gameData)

    game.level = 1
    toNextLevel()

    expect(game.level).toBe(2)

    expectSetupLevelGameData(secondLevelGameData)
  })

  it('should be go to next level & isGameCompleted is false', () => {
    const { game, toNextLevel, setupGame } = useGameStore()
    setupGame(gameData)

    game.isGameCompleted = false
    toNextLevel()

    expect(game.isGameCompleted).toBe(false)

    expectSetupLevelGameData(secondLevelGameData)
  })
})
