import { defineComponent } from 'vue'
import Cargo from '~/components/game/cargo'
import Map from '~/components/game/map'
import Player from '~/components/game/player'
import Target from '~/components/game/target'
import { useCargoStore, useTargetStore } from '~/store'

export default defineComponent({
  name: 'Game',
  setup () {
    const { cargos, addCargo, createCargo } = useCargoStore()
    addCargo(createCargo({ x: 4, y: 4 }))
    addCargo(createCargo({ x: 3, y: 3 }))

    const { targets, addTarget, createTarget } = useTargetStore()
    addTarget(createTarget({ x: 6, y: 6 }))
    addTarget(createTarget({ x: 7, y: 7 }))

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
      </>
    )
  },
})
