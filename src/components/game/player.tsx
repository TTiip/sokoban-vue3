import { defineComponent, ref } from 'vue'
import Keeper from '~/assets/keeper.png'
import { usePlayerHook } from './hooks/playerHook'

export default defineComponent({
  name: 'Player',
  setup () {
    const usePlayerInstance = usePlayerHook()
    usePlayerInstance.useMove()

    return () => (
      <div class="absolute" style={usePlayerInstance.position}>
        <img src={Keeper} />
      </div>
    )
  },
})
