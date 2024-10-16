import { defineComponent } from 'vue'
import Map from '~/components/game/map'
import Player from '~/components/game/player'

export default defineComponent({
  name: 'Game',
  setup () {
    return () => (
      <>
        <Map />
        <Player />
      </>
    )
  },
})
