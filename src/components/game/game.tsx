import { defineComponent } from 'vue'
import Cargo from '~/components/game/cargo'
import Map from '~/components/game/map'
import Player from '~/components/game/player'
import Target from '~/components/game/target'
import { useCargoStore, useTargetStore } from '~/store'
import { useGameStore } from '~/store/game'

export default defineComponent({
  name: 'Game',
  setup () {
    const { cargos, addCargo, createCargo } = useCargoStore()
    addCargo(createCargo({ x: 4, y: 4 }))
    addCargo(createCargo({ x: 3, y: 3 }))

    const { targets, addTarget, createTarget } = useTargetStore()
    addTarget(createTarget({ x: 6, y: 6 }))
    addTarget(createTarget({ x: 7, y: 7 }))

    const { game } = useGameStore()
    return () => (
      <>
        <Map />
        {
          targets.map(targetItem => <Target targetItem={targetItem} />)
        }
        <Player />
        {
          cargos.map(cargoItem => <Cargo cargoItem={cargoItem} />)
        }
        {
          game.isGameCompleted
            ? (
              <button class="bg-sky rounded-4px text-#fff px-4px py-2px">下一关</button>
            )
            : null
        }

      </>
    )
  },
})
