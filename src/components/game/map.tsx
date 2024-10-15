import { defineComponent } from 'vue'
import Footer from '~/assets/floor.png'
import Wall from '~/assets/wall.png'
import { MapTile, useMapStore } from '~/store'

export default defineComponent({
  name: 'Map',
  setup () {
    const { map } = useMapStore()

    return () => (
      <>
        {
          map.map(row => (
            <div class="flex">
              {row.map(col => (
                <div>
                  <img src={col === MapTile.WALL ? Wall : Footer} alt="" />
                </div>
              ))}
            </div>
          ))
        }

      </>
    )
  },
})
