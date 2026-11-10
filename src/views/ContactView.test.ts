import { flushPromises, mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { createMemoryHistory, createRouter } from 'vue-router'
import { reveal } from '@/directives/reveal'
import ContactView from './ContactView.vue'

async function mountAt(url: string) {
  const router = createRouter({
    history: createMemoryHistory(),
    routes: [{ path: '/contact', component: ContactView }],
  })
  await router.push(url)
  await router.isReady()
  const wrapper = mount(ContactView, { global: { plugins: [router], directives: { reveal } } })
  await flushPromises()
  return (wrapper.find('#contact-service').element as HTMLSelectElement).value
}

describe('ContactView ?service preselection', () => {
  it('preselects a known service slug', async () => {
    expect(await mountAt('/contact?service=pack-investisseur')).toBe('pack-investisseur')
  })

  it('accepts the "autre" option', async () => {
    expect(await mountAt('/contact?service=autre')).toBe('autre')
  })

  it('ignores an unknown slug', async () => {
    expect(await mountAt('/contact?service=hacker')).toBe('')
  })

  it('uses the first value when the param is repeated', async () => {
    expect(await mountAt('/contact?service=cuisine&service=autre')).toBe('cuisine')
  })

  it('selects nothing without a query', async () => {
    expect(await mountAt('/contact')).toBe('')
  })
})
