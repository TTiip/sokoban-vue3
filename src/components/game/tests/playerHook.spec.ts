import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, describe, expect, it } from 'vitest'
import { useSetUp } from '~/helper/components'
import { useMapStore, usePlayerStore } from '~/store'
import { KEY_CODE, useMove } from '../playerHook'

describe('playerHook', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    const { resetPlayer } = usePlayerStore()
    // 每调用前都重置一下参数
    resetPlayer()
  })
  it('should move to left when press ArrowLeft', () => {
    const { wrapper } = useSetUp(() => {
      // setup 中调用 注册键盘事件
      useMove()
    })

    // 针对每个不同的测试case 进行数据init
    const { setupMap } = useMapStore()
    const newMap = [
      [2, 2, 2],
      [2, 2, 2],
      [2, 2, 2],
    ]
    setupMap(newMap)

    const { player } = usePlayerStore()

    window.dispatchEvent(new KeyboardEvent('keyup', { code: KEY_CODE.LEFT }))

    expect(player.x).toBe(0)

    // 每次执行完 mounted 以后一定记得要 清除掉!!!
    wrapper.unmount()
  })
})
