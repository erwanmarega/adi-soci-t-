import { computed, reactive, ref } from 'vue'

export type ContactField = 'name' | 'email' | 'phone' | 'message' | 'consent'
export type ContactStatus = 'idle' | 'sending' | 'success' | 'error' | 'unavailable'

export const contactLimits = {
  name: 100,
  company: 100,
  email: 254,
  phone: 30,
  message: 3000,
} as const

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
const PHONE_RE = /^\+?[\d\s().-]{6,30}$/
const REQUEST_TIMEOUT_MS = 15000

/** Returns the endpoint only when it is a well-formed https URL. */
function readEndpoint(): string | null {
  const raw = import.meta.env.VITE_CONTACT_ENDPOINT
  if (typeof raw !== 'string' || raw.trim() === '') return null
  try {
    const url = new URL(raw.trim())
    return url.protocol === 'https:' ? url.toString() : null
  } catch {
    return null
  }
}

export function useContactForm(options: { serviceLabel: (value: string) => string }) {
  const endpoint = readEndpoint()
  const isConfigured = endpoint !== null

  const values = reactive({
    name: '',
    company: '',
    email: '',
    phone: '',
    service: '',
    message: '',
    consent: false,
    /** Honeypot: real users never see or fill this field. */
    website: '',
  })

  const errors = reactive<Partial<Record<ContactField, string>>>({})
  const status = ref<ContactStatus>('idle')
  const isSending = computed(() => status.value === 'sending')

  function validate(): ContactField | null {
    const next: Partial<Record<ContactField, string>> = {}
    const name = values.name.trim()
    const email = values.email.trim()
    const phone = values.phone.trim()
    const message = values.message.trim()

    if (!name) next.name = 'Indiquez votre nom.'
    else if (name.length > contactLimits.name) {
      next.name = `Votre nom ne peut pas dépasser ${contactLimits.name} caractères.`
    }

    if (!email) next.email = 'Indiquez votre adresse e-mail.'
    else if (email.length > contactLimits.email || !EMAIL_RE.test(email)) {
      next.email = 'Cette adresse e-mail ne semble pas valide.'
    }

    if (phone && !PHONE_RE.test(phone)) {
      next.phone = 'Ce numéro de téléphone ne semble pas valide.'
    }

    if (!message) next.message = 'Décrivez votre besoin en quelques mots.'
    else if (message.length > contactLimits.message) {
      next.message = `Votre message ne peut pas dépasser ${contactLimits.message} caractères.`
    }

    if (!values.consent) next.consent = 'Vous devez accepter pour envoyer votre demande.'

    const order: ContactField[] = ['name', 'email', 'phone', 'message', 'consent']
    for (const key of order) {
      if (next[key]) errors[key] = next[key]
      else delete errors[key]
    }
    return order.find((key) => next[key]) ?? null
  }

  function clearError(field: ContactField) {
    delete errors[field]
  }

  function reset() {
    values.name = ''
    values.company = ''
    values.email = ''
    values.phone = ''
    values.service = ''
    values.message = ''
    values.consent = false
    values.website = ''
  }

  /** Returns the first invalid field (to focus), or null. */
  async function submit(): Promise<ContactField | null> {
    if (isSending.value) return null

    const firstInvalid = validate()
    if (firstInvalid) {
      status.value = 'idle'
      return firstInvalid
    }

    // Bots fill the hidden field: acknowledge silently without sending anything.
    if (values.website.trim() !== '') {
      status.value = 'success'
      reset()
      return null
    }

    if (!endpoint) {
      status.value = 'unavailable'
      return null
    }

    status.value = 'sending'
    const controller = new AbortController()
    const timer = window.setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS)

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        credentials: 'omit',
        referrerPolicy: 'no-referrer',
        signal: controller.signal,
        body: JSON.stringify({
          name: values.name.trim().slice(0, contactLimits.name),
          company: values.company.trim().slice(0, contactLimits.company),
          email: values.email.trim().slice(0, contactLimits.email),
          phone: values.phone.trim().slice(0, contactLimits.phone),
          service: options.serviceLabel(values.service),
          message: values.message.trim().slice(0, contactLimits.message),
          consent: true,
        }),
      })
      if (!response.ok) throw new Error('request-failed')
      status.value = 'success'
      reset()
    } catch {
      status.value = 'error'
    } finally {
      window.clearTimeout(timer)
    }
    return null
  }

  return { values, errors, status, isSending, isConfigured, clearError, submit }
}
