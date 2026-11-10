import { describe, expect, it } from 'vitest'

const sources = import.meta.glob<string>(
  ['/src/data/*.ts', '/src/views/*.vue', '/src/components/*.vue', '!/src/**/*.test.ts'],
  { query: '?raw', import: 'default', eager: true },
)
const publicFiles = new Set(
  Object.keys(import.meta.glob('/public/images/**/*')).map((p) => p.replace('/public', '')),
)

const IMAGE_RE = /\/images\/[^'"`\s)]+\.[a-z0-9]+/gi

describe('image references', () => {
  it('finds public images and references to check', () => {
    expect(publicFiles.size).toBeGreaterThan(10)
    const total = Object.values(sources).flatMap((s) => s.match(IMAGE_RE) ?? [])
    expect(total.length).toBeGreaterThan(10)
  })

  for (const [file, content] of Object.entries(sources)) {
    const refs = [...new Set(content.match(IMAGE_RE) ?? [])]
    if (refs.length === 0) continue
    it(`all /images/ paths in ${file} exist under public/`, () => {
      expect(refs.filter((ref) => !publicFiles.has(ref))).toEqual([])
    })
  }
})
