/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** HTTPS endpoint receiving the contact form as JSON (POST). Optional. */
  readonly VITE_CONTACT_ENDPOINT?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
