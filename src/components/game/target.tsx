import type { PropType } from 'vue'
import { defineComponent } from 'vue'
import Target from '~/assets/target.png'
import { usePosition } from '~/componsables'
import type { TargetItem } from '~/store'

export default defineComponent({
  name: 'Cargo',
  props: {
    targetItem: {
      type: Object as PropType<TargetItem>,
      required: true,
    },
  },
  setup (props) {
    const { position } = usePosition(props.targetItem)

    return () => (
      <div class="absolute" style={position.value}>
        <img src={Target} />
      </div>
    )
  },
})
