import { defineComponent } from 'vue'
import Map from '~/components/game/map'

export default defineComponent({
  name: 'Game',
  setup () {
    return () => (
      <>
        <Map />
      </>
    )
  },
})
