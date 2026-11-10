import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { defineComponent, h, withDirectives } from 'vue'
import { reveal } from './reveal'

describe('v-reveal', () => {
  it('marks the element visible immediately without IntersectionObserver', () => {
    const Comp = defineComponent({
      render: () => withDirectives(h('div'), [[reveal, 150]]),
    })
    const wrapper = mount(Comp)
    expect(wrapper.classes()).toContain('reveal')
    expect(wrapper.classes()).toContain('is-visible')
    expect((wrapper.element as HTMLElement).style.getPropertyValue('--reveal-delay')).toBe('150ms')
  })
})
