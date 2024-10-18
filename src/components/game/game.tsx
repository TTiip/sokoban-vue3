import { defineComponent } from 'vue'
import Cargo from '~/components/game/cargo'
import Map from '~/components/game/map'
import Player from '~/components/game/player'
import { useCargoStore } from '~/store'

export default defineComponent({
  name: 'Game',
  setup () {
    const { cargos, addCargo, createCargo } = useCargoStore()
    addCargo(createCargo({ x: 4, y: 4 }))
    addCargo(createCargo({ x: 3, y: 3 }))

    return () => (
      <>
        <Map />
        <Player />
        {
          cargos.map(cargoItem => <Cargo cargoItem={cargoItem} />)
        }
      </>
    )
  },
})
