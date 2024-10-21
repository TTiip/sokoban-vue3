import type { PropType } from 'vue'
import { defineComponent } from 'vue'
import Cargo from '~/assets/cargo.png'
import CargoNoTaget from '~/assets/cargo_on_target.png'
import { usePosition } from '~/componsables'
import type { CargoItem } from '~/store'

export default defineComponent({
  name: 'Cargo',
  props: {
    cargoItem: {
      type: Object as PropType<CargoItem>,
      required: true,
    },
  },
  setup (props) {
    const { position } = usePosition(props.cargoItem)

    return () => (
      <div class="absolute" style={position.value}>
        <img src={props.cargoItem?.onTarget ? Cargo : CargoNoTaget} />
      </div>
    )
  },
})
