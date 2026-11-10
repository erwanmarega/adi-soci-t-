import { flushPromises, mount } from '@vue/test-utils'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import ContactForm from './ContactForm.vue'

const services = [
  { value: 'cuisine', label: 'Cuisine' },
  { value: 'autre', label: 'Autre' },
]

let fetchMock: ReturnType<typeof vi.fn>

beforeEach(() => {
  fetchMock = vi.fn().mockResolvedValue({ ok: true })
  vi.stubGlobal('fetch', fetchMock)
})
afterEach(() => {
  vi.unstubAllEnvs()
  vi.unstubAllGlobals()
})

function mountForm(props: Record<string, unknown> = {}) {
  return mount(ContactForm, { props: { services, ...props }, attachTo: document.body })
}

describe('ContactForm', () => {
  it('shows a not-enabled notice when no endpoint is configured', () => {
    vi.stubEnv('VITE_CONTACT_ENDPOINT', '')
    const wrapper = mountForm()
    expect(wrapper.text()).toContain('pas encore activé')
    wrapper.unmount()
  })

  it('links error messages via aria-describedby, sets aria-invalid and focuses the first invalid field', async () => {
    vi.stubEnv('VITE_CONTACT_ENDPOINT', 'https://forms.example.com/x')
    const wrapper = mountForm()
    expect(wrapper.find('#contact-name').attributes('aria-invalid')).toBe('false')
    expect(wrapper.find('#contact-name').attributes('aria-describedby')).toBeUndefined()

    await wrapper.find('form').trigger('submit')
    await flushPromises()

    for (const f of ['name', 'email', 'message', 'consent']) {
      const input = wrapper.find(`#contact-${f}`)
      expect(input.attributes('aria-invalid')).toBe('true')
      const errId = input.attributes('aria-describedby')
      expect(errId).toBe(`contact-${f}-error`)
      expect(wrapper.find(`#${errId}`).text().length).toBeGreaterThan(0)
    }
    expect(document.activeElement?.id).toBe('contact-name')
    expect(wrapper.find('[role="alert"]').text()).toContain('4 erreurs')
    expect(fetchMock).not.toHaveBeenCalled()
    wrapper.unmount()
  })

  it('clears a field error when the user types in it', async () => {
    vi.stubEnv('VITE_CONTACT_ENDPOINT', 'https://forms.example.com/x')
    const wrapper = mountForm()
    await wrapper.find('form').trigger('submit')
    await flushPromises()
    await wrapper.find('#contact-name').setValue('Jeanne')
    expect(wrapper.find('#contact-name').attributes('aria-invalid')).toBe('false')
    expect(wrapper.find('#contact-name-error').exists()).toBe(false)
    wrapper.unmount()
  })

  it('submits a valid form and shows the success message', async () => {
    vi.stubEnv('VITE_CONTACT_ENDPOINT', 'https://forms.example.com/x')
    const wrapper = mountForm({ initialService: 'cuisine' })
    await wrapper.find('#contact-name').setValue('Jeanne')
    await wrapper.find('#contact-email').setValue('j@example.com')
    await wrapper.find('#contact-message').setValue('Hello')
    await wrapper.find('#contact-consent').setValue(true)
    await wrapper.find('form').trigger('submit')
    await flushPromises()

    expect(fetchMock).toHaveBeenCalledTimes(1)
    expect(JSON.parse((fetchMock.mock.calls[0][1] as RequestInit).body as string).service).toBe('Cuisine')
    expect(wrapper.find('[role="status"]').text()).toContain('bien été envoyée')
    wrapper.unmount()
  })

  it('shows the error message on a failed request', async () => {
    vi.stubEnv('VITE_CONTACT_ENDPOINT', 'https://forms.example.com/x')
    fetchMock.mockResolvedValue({ ok: false })
    const wrapper = mountForm()
    await wrapper.find('#contact-name').setValue('Jeanne')
    await wrapper.find('#contact-email').setValue('j@example.com')
    await wrapper.find('#contact-message').setValue('Hello')
    await wrapper.find('#contact-consent').setValue(true)
    await wrapper.find('form').trigger('submit')
    await flushPromises()
    expect(wrapper.find('[role="status"]').text()).toContain('pas pu être envoyée')
    wrapper.unmount()
  })

  it('preselects initialService', () => {
    vi.stubEnv('VITE_CONTACT_ENDPOINT', '')
    const wrapper = mountForm({ initialService: 'autre' })
    expect((wrapper.find('#contact-service').element as HTMLSelectElement).value).toBe('autre')
    wrapper.unmount()
  })
})
