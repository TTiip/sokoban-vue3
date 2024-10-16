import { defineComponent } from 'vue'
import Keeper from '~/assets/keeper.png'
import { useMove, usePosition } from './playerHook'

export default defineComponent({
  name: 'Player',
  setup () {
    useMove()
    const { position } = usePosition()

    return () => (
      <div class="absolute" style={position.value}>
        <img src={Keeper} />
      </div>
    )
  },
})
