import type { PropType } from 'vue'
import { defineComponent } from 'vue'
import Cargo from '~/assets/cargo.png'
import CargoNoTaget from '~/assets/cargo_on_target.png'
import { usePosition } from '~/componsables'

export default defineComponent({
  name: 'Cargo',
  props: {
    x: {
      type: Number as PropType<number>,
      retuired: true,
    },
    y: {
      type: Number as PropType<number>,
      retuired: true,
    },
  },
  setup (props) {
    const cargoPosition = {
      x: props.x,
      y: props.y,
    }

    const { position } = usePosition(cargoPosition)

    return () => (
      <div class="absolute" style={position.value}>
        <img src={Cargo} />
      </div>
    )
  },
})
