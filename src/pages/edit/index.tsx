import { defineComponent } from 'vue'
import MapEdit from '~/components/edit/mapEdit'

export default defineComponent({
  name: 'Game',
  setup () {
    return () => (
      <>
        <div class="flex">
          <div class="w-4/6 bg-pink-400">
            <MapEdit />
          </div>
          <div>数据展示区域</div>
        </div>
        <div>
          元素选择区
        </div>
      </>
    )
  },
})
