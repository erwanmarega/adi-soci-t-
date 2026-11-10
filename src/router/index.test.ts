import { describe, expect, it } from 'vitest'
import { navItems, services } from '@/data/site'
import router from './index'

describe('router', () => {
  const paths = [...new Set([...navItems.map((n) => n.to), ...services.map((s) => s.route), '/', '/contact'])]

  it.each(paths)('%s resolves to a real, non catch-all route', (path) => {
    const resolved = router.resolve(path)
    expect(resolved.name).toBeTruthy()
    expect(resolved.name).not.toBe('not-found')
    expect(resolved.matched).toHaveLength(1)
  })

  it('resolves an unknown path to the not-found route', () => {
    expect(router.resolve('/does/not/exist').name).toBe('not-found')
  })

  it('every route has a meta title', () => {
    for (const r of router.getRoutes()) expect(r.meta.title, String(r.name)).toBeTruthy()
  })

  it('updates document.title from meta.title after navigation', async () => {
    await router.push('/contact')
    expect(document.title).toBe('Contact — ADI')
    await router.push('/nope')
    expect(document.title).toBe('Page introuvable — ADI')
  })
})
