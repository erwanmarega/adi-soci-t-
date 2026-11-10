import { mount, type VueWrapper } from '@vue/test-utils'
import { afterEach, describe, expect, it } from 'vitest'
import { nextTick } from 'vue'
import { reveal } from '@/directives/reveal'
import PhotoGallery from './PhotoGallery.vue'

const images = [
  { src: '/images/a.jpg', alt: 'A' },
  { src: '/images/b.jpg', alt: 'B', caption: 'Légende B' },
  { src: '/images/c.jpg', alt: 'C' },
]

let wrapper: VueWrapper | null = null
afterEach(() => {
  wrapper?.unmount()
  wrapper = null
  document.body.innerHTML = ''
  document.body.style.overflow = ''
})

function mountGallery(layout: 'mosaic' | 'strip' = 'mosaic') {
  wrapper = mount(PhotoGallery, {
    props: { images, layout },
    attachTo: document.body,
    global: { directives: { reveal } },
  })
  return wrapper
}

const dialog = () => document.body.querySelector('[role="dialog"]')
const counter = () => dialog()?.querySelector('p')?.textContent?.replace(/\s+/g, ' ').trim()
async function press(key: string) {
  window.dispatchEvent(new KeyboardEvent('keydown', { key, bubbles: true }))
  await nextTick()
  await nextTick()
}

describe('PhotoGallery lightbox', () => {
  it('is closed initially', () => {
    mountGallery()
    expect(dialog()).toBeNull()
  })

  it('opens the dialog on the clicked image, locks scroll and focuses close button', async () => {
    const w = mountGallery()
    await w.findAll('button')[1]!.trigger('click')
    await nextTick()
    await nextTick()
    expect(dialog()).not.toBeNull()
    expect(dialog()!.getAttribute('aria-modal')).toBe('true')
    expect(counter()).toBe('2 / 3')
    expect(dialog()!.querySelector('img')!.getAttribute('src')).toBe('/images/b.jpg')
    expect(dialog()!.textContent).toContain('Légende B')
    expect(document.body.style.overflow).toBe('hidden')
    expect(document.activeElement?.getAttribute('aria-label')).toBe('Fermer la galerie')
  })

  it('closes on Escape, unlocks scroll and restores focus to the trigger', async () => {
    const w = mountGallery()
    const trigger = w.findAll('button')[0]!
    await trigger.trigger('click')
    await nextTick()
    await press('Escape')
    expect(dialog()).toBeNull()
    expect(document.body.style.overflow).toBe('')
    expect(document.activeElement).toBe(trigger.element)
  })

  it('ArrowRight / ArrowLeft navigate with wraparound', async () => {
    const w = mountGallery()
    await w.findAll('button')[2]!.trigger('click')
    await nextTick()
    await press('ArrowRight')
    expect(counter()).toBe('1 / 3')
    await press('ArrowLeft')
    expect(counter()).toBe('3 / 3')
    await press('ArrowLeft')
    expect(counter()).toBe('2 / 3')
  })

  it('closes with the close button and works from the strip layout', async () => {
    const w = mountGallery('strip')
    await w.findAll('button')[1]!.trigger('click')
    await nextTick()
    expect(counter()).toBe('2 / 3')
    ;(dialog()!.querySelector('[aria-label="Fermer la galerie"]') as HTMLElement).click()
    await nextTick()
    expect(dialog()).toBeNull()
  })

  it('ignores keys when closed', async () => {
    mountGallery()
    await press('ArrowRight')
    expect(dialog()).toBeNull()
  })
})
