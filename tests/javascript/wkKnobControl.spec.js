import { shallowMount } from '@vue/test-utils'
import webskitKnobControl from '../../src/webskitKnobControl.vue'

describe('webskitKnobControl', () => {
  test('is a Vue instance', () => {
    const wrapper = shallowMount(webskitKnobControl)
    expect(wrapper.isVueInstance()).toBeTruthy()
  })

  it('Set degree to 45', async () => {
    const wrapper = shallowMount(webskitKnobControl)

    await wrapper.vm.$nextTick()

    expect(wrapper.vm.wheelDegrees).toBe(0)

    wrapper.find('[jest-wk-knob-rotate-45]').trigger('mousedown')

    await wrapper.vm.$nextTick()

    expect(wrapper.vm.wheelDegrees).toBe('45.00')
  })
})
