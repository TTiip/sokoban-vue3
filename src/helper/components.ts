import { mount } from '@vue/test-utils'

export function useSetUp (setup: (...arg) => void) {
  const Com = {
    render () {},
    setup,
  }

  const wrapper = mount(Com)

  return {
    wrapper,
  }
}
