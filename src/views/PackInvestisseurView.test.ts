import { mount, type VueWrapper } from '@vue/test-utils'
import { afterEach, describe, expect, it } from 'vitest'
import { createMemoryHistory, createRouter } from 'vue-router'
import { packSizes } from '@/data/pack'
import { reveal } from '@/directives/reveal'
import PackInvestisseurView from './PackInvestisseurView.vue'

let wrapper: VueWrapper | null = null
afterEach(() => {
  wrapper?.unmount()
  wrapper = null
})

function mountView() {
  const router = createRouter({ history: createMemoryHistory(), routes: [{ path: '/', component: PackInvestisseurView }] })
  wrapper = mount(PackInvestisseurView, {
    attachTo: document.body,
    global: { plugins: [router], directives: { reveal } },
  })
  return wrapper
}

const selected = (w: VueWrapper) =>
  w.findAll('[role="tab"]').map((t) => t.attributes('aria-selected') === 'true')
const visiblePanels = (w: VueWrapper) =>
  w.findAll('[role="tabpanel"]').map((p) => (p.element as HTMLElement).style.display !== 'none')

function expectActive(w: VueWrapper, index: number) {
  const expected = packSizes.map((_, i) => i === index)
  expect(selected(w)).toEqual(expected)
  expect(visiblePanels(w)).toEqual(expected)
  const tabs = w.findAll('[role="tab"]')
  tabs.forEach((t, i) => expect(t.attributes('tabindex')).toBe(i === index ? '0' : '-1'))
}

describe('PackInvestisseurView tabs', () => {
  it('has the same number of tabs and panels as pack sizes, first active, panels linked', () => {
    const w = mountView()
    expect(w.findAll('[role="tab"]')).toHaveLength(packSizes.length)
    expect(w.findAll('[role="tabpanel"]')).toHaveLength(packSizes.length)
    expectActive(w, 0)
    const tab = w.findAll('[role="tab"]')[0]!
    expect(w.find(`#${tab.attributes('aria-controls')}`).attributes('aria-labelledby')).toBe(tab.attributes('id'))
  })

  it('activates a tab on click', async () => {
    const w = mountView()
    await w.findAll('[role="tab"]')[2]!.trigger('click')
    expectActive(w, 2)
  })

  it('ArrowRight moves forward and wraps to the first tab, moving focus', async () => {
    const w = mountView()
    const last = packSizes.length - 1
    await w.findAll('[role="tab"]')[0]!.trigger('keydown', { key: 'ArrowRight' })
    expectActive(w, 1)
    await w.findAll('[role="tab"]')[1]!.trigger('keydown', { key: 'End' })
    await w.vm.$nextTick()
    expectActive(w, last)
    expect(document.activeElement).toBe(w.findAll('[role="tab"]')[last]!.element)
    await w.findAll('[role="tab"]')[last]!.trigger('keydown', { key: 'ArrowRight' })
    expectActive(w, 0)
  })

  it('ArrowLeft wraps to the last tab; Home goes back to the first', async () => {
    const w = mountView()
    await w.findAll('[role="tab"]')[0]!.trigger('keydown', { key: 'ArrowLeft' })
    expectActive(w, packSizes.length - 1)
    await w.findAll('[role="tab"]')[0]!.trigger('keydown', { key: 'Home' })
    expectActive(w, 0)
  })

  it('ignores unrelated keys', async () => {
    const w = mountView()
    await w.findAll('[role="tab"]')[0]!.trigger('keydown', { key: 'a' })
    expectActive(w, 0)
  })
})
