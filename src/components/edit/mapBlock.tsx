import type { PropType } from 'vue'
import { defineComponent } from 'vue'
import Footer from '~/assets/floor.png'
import Wall from '~/assets/wall.png'
import { MapTile } from '~/store'
import { useMapEidtStore } from '~/store/edit/mapedit'

export default defineComponent({
  name: 'MapBlock',
  props: {
    x: {
      type: Number as PropType<number>,
      require: true,
    },
    y: {
      type: Number as PropType<number>,
      require: true,
    },
  },
  setup (props) {
    const { map } = useMapEidtStore()
    const { x, y } = props

    function handleClick (x: MapTile, y: MapTile) {
      map[y][x] = MapTile.WALL
    }

    return () => (
      <>
        <div
          class="border border-#fff"
          onClick={() => handleClick(x, y)}
        >
          <img src={map[y][x] === MapTile.WALL ? Wall : Footer} alt="" />
        </div>
      </>
    )
  },
})
