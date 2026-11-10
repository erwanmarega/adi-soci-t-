<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, ref, watch } from 'vue'
import { lockScroll, unlockScroll } from '@/composables/useScrollLock'

interface GalleryImage {
  src: string
  alt: string
  caption?: string
}

const props = withDefaults(
  defineProps<{
    images: GalleryImage[]
    layout?: 'mosaic' | 'strip'
  }>(),
  { layout: 'mosaic' },
)

/* Asymmetric span pattern for the mosaic grid (repeats every 7 tiles). */
const spans = [
  'col-span-2 row-span-2',
  '',
  '',
  'row-span-2',
  'col-span-2',
  '',
  '',
]

const openIndex = ref<number | null>(null)
const dialog = ref<HTMLElement | null>(null)
const closeButton = ref<HTMLButtonElement | null>(null)
const strip = ref<HTMLElement | null>(null)
let opener: HTMLElement | null = null

const current = computed(() => (openIndex.value === null ? null : props.images[openIndex.value]))

function open(index: number, event: Event) {
  opener = event.currentTarget as HTMLElement
  openIndex.value = index
}

function close() {
  openIndex.value = null
}

function step(delta: number) {
  if (openIndex.value === null) return
  const n = props.images.length
  openIndex.value = (openIndex.value + delta + n) % n
}

function onKeydown(event: KeyboardEvent) {
  if (openIndex.value === null) return
  if (event.key === 'Escape') {
    event.preventDefault()
    close()
  } else if (event.key === 'ArrowRight') {
    step(1)
  } else if (event.key === 'ArrowLeft') {
    step(-1)
  } else if (event.key === 'Tab' && dialog.value) {
    const items = Array.from(dialog.value.querySelectorAll<HTMLElement>('button'))
    const first = items[0]
    const last = items[items.length - 1]
    if (!first || !last) return
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault()
      last.focus()
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault()
      first.focus()
    }
  }
}

watch(
  () => openIndex.value !== null,
  async (isOpen) => {
    if (isOpen) {
      lockScroll()
      window.addEventListener('keydown', onKeydown)
      await nextTick()
      closeButton.value?.focus()
    } else {
      unlockScroll()
      window.removeEventListener('keydown', onKeydown)
      opener?.focus()
      opener = null
    }
  },
)

onBeforeUnmount(() => {
  if (openIndex.value !== null) {
    unlockScroll()
    window.removeEventListener('keydown', onKeydown)
  }
})

function scrollStrip(direction: 1 | -1) {
  const el = strip.value
  if (!el) return
  el.scrollBy({ left: direction * el.clientWidth * 0.8, behavior: 'smooth' })
}
</script>

<template>
  <div>
    <ul
      v-if="layout === 'mosaic'"
      class="grid auto-rows-[10.5rem] grid-flow-dense grid-cols-2 gap-3 sm:auto-rows-[13rem] md:grid-cols-4 md:gap-4 lg:auto-rows-[15rem]"
    >
      <li
        v-for="(image, i) in images"
        :key="image.src"
        v-reveal="(i % 4) * 70"
        :class="spans[i % spans.length]"
      >
        <button
          type="button"
          class="group relative block size-full overflow-hidden bg-paper-deep"
          :aria-label="`Agrandir la photo : ${image.alt}`"
          @click="open(i, $event)"
        >
          <img
            :src="image.src"
            :alt="image.alt"
            loading="lazy"
            decoding="async"
            class="size-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
          />
        </button>
      </li>
    </ul>

    <div v-else>
      <ul
        ref="strip"
        class="strip -mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth px-5 pb-2 sm:-mx-8 sm:px-8 lg:-mx-14 lg:px-14"
        tabindex="-1"
      >
        <li
          v-for="image in images"
          :key="image.src"
          class="w-[82%] shrink-0 snap-start sm:w-[46%] lg:w-[32%]"
        >
          <button
            type="button"
            class="group block aspect-[4/3] w-full overflow-hidden bg-paper-deep"
            :aria-label="`Agrandir la photo : ${image.alt}`"
            @click="open(images.indexOf(image), $event)"
          >
            <img
              :src="image.src"
              :alt="image.alt"
              loading="lazy"
              decoding="async"
              class="size-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
            />
          </button>
        </li>
      </ul>
      <div class="mt-6 flex gap-3">
        <button type="button" class="strip-btn" aria-label="Photos précédentes" @click="scrollStrip(-1)">
          <svg viewBox="0 0 24 24" class="size-5" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true">
            <path d="M15 5l-7 7 7 7" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </button>
        <button type="button" class="strip-btn" aria-label="Photos suivantes" @click="scrollStrip(1)">
          <svg viewBox="0 0 24 24" class="size-5" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true">
            <path d="M9 5l7 7-7 7" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </button>
      </div>
    </div>

    <Teleport to="body">
      <Transition name="lightbox">
        <div
          v-if="current"
          ref="dialog"
          role="dialog"
          aria-modal="true"
          aria-label="Galerie photo"
          class="fixed inset-0 z-[80] flex flex-col bg-ink/95 text-paper"
          @click.self="close"
        >
          <div class="flex items-center justify-between px-5 py-4 sm:px-8" @click.self="close">
            <p class="text-sm text-mist" aria-live="polite">
              {{ (openIndex ?? 0) + 1 }} / {{ images.length }}
            </p>
            <button
              ref="closeButton"
              type="button"
              class="lightbox-btn"
              aria-label="Fermer la galerie"
              @click="close"
            >
              <svg viewBox="0 0 24 24" class="size-5" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true">
                <path d="M6 6l12 12M18 6L6 18" stroke-linecap="round" />
              </svg>
            </button>
          </div>

          <div class="relative flex min-h-0 flex-1 items-center justify-center px-4 sm:px-20" @click.self="close">
            <button
              v-if="images.length > 1"
              type="button"
              class="lightbox-btn absolute left-3 z-10 sm:left-6"
              aria-label="Photo précédente"
              @click="step(-1)"
            >
              <svg viewBox="0 0 24 24" class="size-5" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true">
                <path d="M15 5l-7 7 7 7" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </button>
            <img
              :key="current.src"
              :src="current.src"
              :alt="current.alt"
              decoding="async"
              class="max-h-full max-w-full object-contain"
            />
            <button
              v-if="images.length > 1"
              type="button"
              class="lightbox-btn absolute right-3 z-10 sm:right-6"
              aria-label="Photo suivante"
              @click="step(1)"
            >
              <svg viewBox="0 0 24 24" class="size-5" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true">
                <path d="M9 5l7 7-7 7" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </button>
          </div>

          <p class="min-h-[4.5rem] px-5 py-5 text-center text-sm text-mist sm:px-8">
            {{ current.caption ?? current.alt }}
          </p>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<style scoped>
.strip {
  scrollbar-width: none;
}
.strip::-webkit-scrollbar {
  display: none;
}
.strip-btn {
  display: inline-flex;
  width: 3rem;
  height: 3rem;
  align-items: center;
  justify-content: center;
  border: 1px solid currentColor;
  border-radius: 2px;
  transition:
    background-color 0.3s,
    color 0.3s;
}
.strip-btn:hover {
  background: var(--color-ink);
  color: var(--color-paper);
}
.lightbox-btn {
  display: inline-flex;
  width: 3rem;
  height: 3rem;
  align-items: center;
  justify-content: center;
  border: 1px solid rgb(255 255 255 / 0.35);
  border-radius: 9999px;
  background: rgb(17 21 31 / 0.6);
  transition: background-color 0.3s;
}
.lightbox-btn:hover {
  background: var(--color-accent);
}
.lightbox-enter-active,
.lightbox-leave-active {
  transition: opacity 0.3s ease;
}
.lightbox-enter-from,
.lightbox-leave-to {
  opacity: 0;
}
@media (prefers-reduced-motion: reduce) {
  .lightbox-enter-active,
  .lightbox-leave-active,
  .strip {
    transition: none;
    scroll-behavior: auto;
  }
}
</style>
