import { defineComponent } from 'vue'
import Cargo from '~/components/game/cargo'
import Map from '~/components/game/map'
import Player from '~/components/game/player'
import { useCargoStore } from '~/store'

export default defineComponent({
  name: 'Game',
  setup () {
    const { cargos } = useCargoStore()
    return () => (
      <>
        <Map />
        <Player />
        {
          cargos.map(cargoItem => <Cargo x={cargoItem.x} y={cargoItem.y} />)
        }
      </>
    )
  },
})
