import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { contactLimits, useContactForm } from './useContactForm'

const ENDPOINT = 'https://forms.example.com/submit'

function setup(endpoint: string | undefined = ENDPOINT) {
  vi.stubEnv('VITE_CONTACT_ENDPOINT', endpoint ?? '')
  const form = useContactForm({ serviceLabel: (v) => (v ? `Label ${v}` : '') })
  return form
}

function fillValid(form: ReturnType<typeof setup>) {
  form.values.name = '  Jeanne Martin '
  form.values.email = ' jeanne@example.com '
  form.values.message = '  Bonjour  '
  form.values.consent = true
}

let fetchMock: ReturnType<typeof vi.fn>

beforeEach(() => {
  fetchMock = vi.fn().mockResolvedValue({ ok: true })
  vi.stubGlobal('fetch', fetchMock)
})

afterEach(() => {
  vi.unstubAllEnvs()
  vi.unstubAllGlobals()
})

describe('useContactForm validation', () => {
  it('reports every missing required field and returns the first one', async () => {
    const form = setup()
    const first = await form.submit()
    expect(first).toBe('name')
    expect(Object.keys(form.errors).sort()).toEqual(['consent', 'email', 'message', 'name'])
    expect(fetchMock).not.toHaveBeenCalled()
  })

  it('treats whitespace-only values as empty', async () => {
    const form = setup()
    fillValid(form)
    form.values.name = '   '
    form.values.message = '\n  '
    await form.submit()
    expect(form.errors.name).toBeTruthy()
    expect(form.errors.message).toBeTruthy()
    expect(fetchMock).not.toHaveBeenCalled()
  })

  it.each(['foo', 'foo@bar', 'foo@bar.c', 'a b@c.com', '@c.com'])('rejects invalid email %s', async (email) => {
    const form = setup()
    fillValid(form)
    form.values.email = email
    expect(await form.submit()).toBe('email')
    expect(form.errors.email).toBeTruthy()
  })

  it('requires consent', async () => {
    const form = setup()
    fillValid(form)
    form.values.consent = false
    expect(await form.submit()).toBe('consent')
  })

  it('rejects an invalid optional phone but accepts an empty one', async () => {
    const form = setup()
    fillValid(form)
    form.values.phone = 'abc'
    expect(await form.submit()).toBe('phone')
    form.values.phone = '01 84 81 11 35'
    expect(await form.submit()).toBeNull()
  })

  it('enforces name length limit (100)', async () => {
    const form = setup()
    fillValid(form)
    form.values.name = 'a'.repeat(contactLimits.name)
    expect(await form.submit()).toBeNull()
    form.values.name = 'a'.repeat(contactLimits.name + 1)
    expect(await form.submit()).toBe('name')
  })

  it('enforces email length limit (254)', async () => {
    const form = setup()
    fillValid(form)
    form.values.email = `${'a'.repeat(250)}@b.co`
    expect(await form.submit()).toBe('email')
  })

  it('enforces message length limit (3000)', async () => {
    const form = setup()
    fillValid(form)
    form.values.message = 'a'.repeat(contactLimits.message + 1)
    expect(await form.submit()).toBe('message')
    form.values.message = 'a'.repeat(contactLimits.message)
    expect(await form.submit()).toBeNull()
  })

  it('clearError removes a single error', async () => {
    const form = setup()
    await form.submit()
    form.clearError('name')
    expect(form.errors.name).toBeUndefined()
    expect(form.errors.email).toBeTruthy()
  })
})

describe('useContactForm submission', () => {
  it('ignores a honeypot submission: reports success but sends nothing', async () => {
    const form = setup()
    fillValid(form)
    form.values.website = 'http://spam.example'
    await form.submit()
    expect(fetchMock).not.toHaveBeenCalled()
    expect(form.status.value).toBe('success')
  })

  it('sets unavailable and does not fetch when no endpoint is configured', async () => {
    const form = setup('')
    expect(form.isConfigured).toBe(false)
    fillValid(form)
    await form.submit()
    expect(fetchMock).not.toHaveBeenCalled()
    expect(form.status.value).toBe('unavailable')
  })

  it.each(['http://forms.example.com/x', 'not a url', 'ftp://x.com', 'javascript:alert(1)'])(
    'rejects non-https endpoint %s',
    async (endpoint) => {
      const form = setup(endpoint)
      expect(form.isConfigured).toBe(false)
      fillValid(form)
      await form.submit()
      expect(fetchMock).not.toHaveBeenCalled()
      expect(form.status.value).toBe('unavailable')
    },
  )

  it('POSTs trimmed JSON once with credentials omitted, then resets the form', async () => {
    const form = setup()
    expect(form.isConfigured).toBe(true)
    fillValid(form)
    form.values.service = 'cuisine'
    expect(await form.submit()).toBeNull()

    expect(fetchMock).toHaveBeenCalledTimes(1)
    const [url, init] = fetchMock.mock.calls[0] as [string, RequestInit]
    expect(url).toBe(ENDPOINT)
    expect(init.method).toBe('POST')
    expect(init.credentials).toBe('omit')
    expect((init.headers as Record<string, string>)['Content-Type']).toBe('application/json')
    expect(JSON.parse(init.body as string)).toEqual({
      name: 'Jeanne Martin',
      company: '',
      email: 'jeanne@example.com',
      phone: '',
      service: 'Label cuisine',
      message: 'Bonjour',
      consent: true,
    })
    expect(form.status.value).toBe('success')
    expect(form.values.name).toBe('')
    expect(form.values.consent).toBe(false)
  })

  it('sets error status on a non-ok response and keeps the values', async () => {
    fetchMock.mockResolvedValue({ ok: false, status: 500 })
    const form = setup()
    fillValid(form)
    await form.submit()
    expect(form.status.value).toBe('error')
    expect(form.values.name).not.toBe('')
  })

  it('sets error status on network failure', async () => {
    fetchMock.mockRejectedValue(new TypeError('network'))
    const form = setup()
    fillValid(form)
    await form.submit()
    expect(form.status.value).toBe('error')
    expect(form.isSending.value).toBe(false)
  })

  it('prevents double submission while a request is in flight', async () => {
    let resolve!: (v: { ok: boolean }) => void
    fetchMock.mockReturnValue(new Promise((r) => (resolve = r)))
    const form = setup()
    fillValid(form)
    const first = form.submit()
    expect(form.isSending.value).toBe(true)
    await form.submit()
    expect(fetchMock).toHaveBeenCalledTimes(1)
    resolve({ ok: true })
    await first
    expect(form.status.value).toBe('success')
  })
})
