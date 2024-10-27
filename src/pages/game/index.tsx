import { defineComponent } from 'vue'
import Cargo from '~/components/game/cargo'
import Map from '~/components/game/map'
import Player from '~/components/game/player'
import Target from '~/components/game/target'
import { gameData } from '~/data/gameData'
import { useCargoStore, useTargetStore } from '~/store'
import { useGameStore } from '~/store/game'

export default defineComponent({
  name: 'Game',
  setup () {
    const { cargos } = useCargoStore()

    const { targets } = useTargetStore()

    const { game, setupGame, toNextLevel } = useGameStore()
    setupGame(gameData)

    return () => (
      <>
        <Map />
        {
          targets.map(targetItem => <Target key={targetItem.id} targetItem={targetItem} />)
        }
        <Player />
        {
          cargos.map(cargoItem => <Cargo key={cargoItem.id} cargoItem={cargoItem} />)
        }
        {
          game.isGameCompleted
            ? (
              <button onClick={toNextLevel} class="bg-sky rounded-4px text-#fff px-4px py-2px">下一关</button>
            )
            : null
        }

      </>
    )
  },
})
