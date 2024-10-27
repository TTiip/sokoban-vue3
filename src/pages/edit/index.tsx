import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Game',
  setup () {
    return () => (
      <>
        <div class="flex">
          <div class="w-4/6 bg-pink-400">地图编辑区域</div>
          <div>数据展示区域</div>
        </div>
        <div>
          元素选择区
        </div>
      </>
    )
  },
})
