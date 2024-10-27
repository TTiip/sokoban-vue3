import { defineComponent } from 'vue'
import { useMapEidtStore } from '~/store/edit/mapedit'
import MapBlock from './mapBlock'

export default defineComponent({
  name: 'MapEdit',
  setup () {
    const { map } = useMapEidtStore()

    return () => (
      <>
        {
          map.map((row, i) => (
            <div class="flex">
              {row.map((col, j) => (
                <MapBlock x={j} y={i}></MapBlock>
              ))}
            </div>
          ))
        }
      </>
    )
  },
})
