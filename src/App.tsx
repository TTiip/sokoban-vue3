import { defineComponent } from 'vue'
import { useMapStore } from '~/store'

export default defineComponent({
  name: 'AppComponent',
  setup () {
    const { arr } = useMapStore()
    console.log(arr, 'arr')

    return () => (
      <main class="font-sans text-gray-700 dark:text-gray-200">
        { arr.map(item => {
          console.log(item, 'item')
        }) }
        <router-view />
      </main>
    )
  },
})
