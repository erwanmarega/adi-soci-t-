import { flushPromises, mount, type VueWrapper } from '@vue/test-utils'
import { afterEach, describe, expect, it } from 'vitest'
import { createMemoryHistory, createRouter } from 'vue-router'
import SiteHeader from './SiteHeader.vue'

let wrapper: VueWrapper | null = null
afterEach(() => {
  wrapper?.unmount()
  wrapper = null
  document.body.style.overflow = ''
})

async function mountHeader() {
  const Stub = { template: '<div />' }
  const router = createRouter({
    history: createMemoryHistory(),
    routes: [
      { path: '/', component: Stub },
      { path: '/cuisine', component: Stub },
    ],
  })
  await router.push('/')
  await router.isReady()
  wrapper = mount(SiteHeader, { attachTo: document.body, global: { plugins: [router] } })
  return { w: wrapper, router }
}

const burger = (w: VueWrapper) => w.find('button[aria-controls="mobile-menu"]')
const menuVisible = (w: VueWrapper) => (w.find('#mobile-menu').element as HTMLElement).style.display !== 'none'

describe('SiteHeader mobile menu', () => {
  it('is closed initially', async () => {
    const { w } = await mountHeader()
    expect(burger(w).attributes('aria-expanded')).toBe('false')
    expect(menuVisible(w)).toBe(false)
  })

  it('burger toggles aria-expanded, label, menu and scroll lock', async () => {
    const { w } = await mountHeader()
    await burger(w).trigger('click')
    expect(burger(w).attributes('aria-expanded')).toBe('true')
    expect(burger(w).attributes('aria-label')).toBe('Fermer le menu')
    expect(menuVisible(w)).toBe(true)
    expect(document.body.style.overflow).toBe('hidden')

    await burger(w).trigger('click')
    expect(burger(w).attributes('aria-expanded')).toBe('false')
    expect(menuVisible(w)).toBe(false)
    expect(document.body.style.overflow).toBe('')
  })

  it('Escape closes the menu and returns focus to the burger', async () => {
    const { w } = await mountHeader()
    await burger(w).trigger('click')
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }))
    await w.vm.$nextTick()
    expect(burger(w).attributes('aria-expanded')).toBe('false')
    expect(menuVisible(w)).toBe(false)
    expect(document.activeElement).toBe(burger(w).element)
  })

  it('closes on route change', async () => {
    const { w, router } = await mountHeader()
    await burger(w).trigger('click')
    await router.push('/cuisine')
    await flushPromises()
    expect(burger(w).attributes('aria-expanded')).toBe('false')
    expect(menuVisible(w)).toBe(false)
  })

  it('ignores Escape while closed', async () => {
    const { w } = await mountHeader()
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }))
    await w.vm.$nextTick()
    expect(burger(w).attributes('aria-expanded')).toBe('false')
  })
})
