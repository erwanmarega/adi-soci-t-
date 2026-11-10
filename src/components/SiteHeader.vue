<script setup lang="ts">
import { nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { lockScroll, unlockScroll } from '@/composables/useScrollLock'
import { navItems, site } from '@/data/site'

const route = useRoute()
const scrolled = ref(false)
const menuOpen = ref(false)
const burger = ref<HTMLButtonElement | null>(null)
const overlay = ref<HTMLElement | null>(null)

function onScroll() {
  scrolled.value = window.scrollY > 8
}

function focusables(): HTMLElement[] {
  const inside = overlay.value
    ? Array.from(overlay.value.querySelectorAll<HTMLElement>('a[href], button'))
    : []
  return burger.value ? [burger.value, ...inside] : inside
}

function onKeydown(event: KeyboardEvent) {
  if (!menuOpen.value) return
  if (event.key === 'Escape') {
    closeMenu()
    burger.value?.focus()
    return
  }
  if (event.key !== 'Tab') return
  const items = focusables()
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

function closeMenu() {
  menuOpen.value = false
}

function toggleMenu() {
  menuOpen.value = !menuOpen.value
}

watch(menuOpen, async (open) => {
  if (open) {
    lockScroll()
    await nextTick()
    if (overlay.value) overlay.value.scrollTop = 0
  } else {
    unlockScroll()
  }
})

watch(() => route.fullPath, closeMenu)

let desktopQuery: MediaQueryList | null = null

function onDesktopChange(event: MediaQueryListEvent) {
  if (event.matches) closeMenu()
}

onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('keydown', onKeydown)
  if (typeof window.matchMedia === 'function') {
    desktopQuery = window.matchMedia('(min-width: 80rem)')
    desktopQuery.addEventListener('change', onDesktopChange)
  }
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('keydown', onKeydown)
  desktopQuery?.removeEventListener('change', onDesktopChange)
  if (menuOpen.value) unlockScroll()
})
</script>

<template>
  <header
    class="sticky top-0 z-[60] border-b text-ink transition-[background-color,border-color,backdrop-filter] duration-500"
    :class="
      menuOpen
        ? 'border-line bg-paper'
        : scrolled
          ? 'border-line bg-paper/90 backdrop-blur-md'
          : 'border-transparent bg-paper'
    "
  >
    <div class="shell flex h-[4.5rem] items-center justify-between gap-6 lg:h-20">
      <RouterLink to="/" class="flex items-baseline gap-4 leading-none" aria-label="ADI, retour à l’accueil">
        <span class="font-display text-[2.1rem] font-medium tracking-[0.06em]">ADI</span>
        <span class="hidden text-xs text-slate lg:block xl:hidden 2xl:block">
          Agencement · Décoration · Immo
        </span>
      </RouterLink>

      <nav class="hidden items-center gap-7 xl:flex" aria-label="Navigation principale">
        <RouterLink
          v-for="item in navItems"
          :key="item.to"
          :to="item.to"
          class="nav-link text-[0.95rem]"
        >
          {{ item.label }}
        </RouterLink>
      </nav>

      <div class="flex items-center gap-3">
        <a
          :href="site.phoneHref"
          class="hidden items-center gap-2 text-sm font-medium transition-colors hover:text-accent xl:flex"
          :aria-label="`Appeler le ${site.phoneDisplay}`"
        >
          <svg class="size-[1.1rem]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true">
            <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a1 1 0 0 1-1 1A16 16 0 0 1 4 5a1 1 0 0 1 1-1Z" stroke-linejoin="round" />
          </svg>
          <span class="hidden 2xl:inline">{{ site.phoneDisplay }}</span>
        </a>
        <RouterLink to="/contact" class="btn btn-primary hidden xl:inline-flex">Demander un devis</RouterLink>

        <button
          ref="burger"
          type="button"
          class="relative -mr-2.5 flex size-11 items-center justify-center xl:hidden"
          :aria-expanded="menuOpen"
          aria-controls="mobile-menu"
          :aria-label="menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'"
          @click="toggleMenu"
        >
          <span class="burger-bar top-[1.1rem]" :class="{ 'is-open': menuOpen }"></span>
          <span class="burger-bar top-[1.6rem]" :class="{ 'is-open': menuOpen }"></span>
        </button>
      </div>
    </div>
  </header>

  <Transition name="menu">
    <div
      v-show="menuOpen"
      id="mobile-menu"
      ref="overlay"
      class="mobile-menu fixed inset-x-0 top-[4.5rem] bottom-0 z-50 overflow-y-auto overscroll-contain bg-paper text-ink lg:top-20 xl:hidden"
    >
      <nav class="shell flex min-h-full flex-col gap-10 pt-4 pb-[max(2rem,env(safe-area-inset-bottom))]" aria-label="Menu mobile">
        <ul class="flex flex-col">
          <li
            v-for="(item, index) in navItems"
            :key="item.to"
            class="menu-item border-b border-line"
            :style="{ '--i': index }"
          >
            <RouterLink
              :to="item.to"
              class="mobile-link group flex min-h-14 items-center justify-between gap-4 py-3 font-display text-[1.75rem] leading-tight font-medium"
              @click="closeMenu"
            >
              <span>{{ item.label }}</span>
              <svg
                class="size-5 shrink-0 text-slate transition-transform duration-300 group-hover:translate-x-1"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.5"
                aria-hidden="true"
              >
                <path d="M5 12h14M13 6l6 6-6 6" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </RouterLink>
          </li>
        </ul>

        <div class="menu-item mt-auto flex flex-col gap-3" :style="{ '--i': navItems.length }">
          <RouterLink to="/contact" class="btn btn-primary w-full" @click="closeMenu">
            Demander un devis
          </RouterLink>
          <a :href="site.phoneHref" class="btn btn-ghost w-full">
            <svg class="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true">
              <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a1 1 0 0 1-1 1A16 16 0 0 1 4 5a1 1 0 0 1 1-1Z" stroke-linejoin="round" />
            </svg>
            Appeler le {{ site.phoneDisplay }}
          </a>
          <div class="mt-3 flex items-center justify-between text-sm text-slate">
            <span>Agencement · Décoration · Immo</span>
            <a
              :href="site.instagram"
              target="_blank"
              rel="noopener noreferrer"
              class="link -my-1 py-3"
            >
              Instagram
            </a>
          </div>
        </div>
      </nav>
    </div>
  </Transition>
</template>

<style scoped>
.nav-link {
  position: relative;
  padding-block: 0.25rem;
}
.nav-link::after {
  content: '';
  position: absolute;
  inset-inline: 0;
  bottom: -2px;
  height: 1px;
  background: var(--color-accent);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.4s var(--ease-out-expo);
}
.nav-link:hover::after,
.nav-link.router-link-active::after {
  transform: scaleX(1);
}

.burger-bar {
  position: absolute;
  left: 50%;
  width: 1.1rem;
  height: 1.5px;
  margin-left: -0.55rem;
  background: currentColor;
  transition:
    transform 0.4s var(--ease-out-expo),
    top 0.4s var(--ease-out-expo);
}
.burger-bar.is-open:first-of-type {
  top: 1.35rem;
  transform: rotate(45deg);
}
.burger-bar.is-open:last-of-type {
  top: 1.35rem;
  transform: rotate(-45deg);
}

.mobile-link.router-link-active {
  color: var(--color-accent);
}
.mobile-link.router-link-active svg {
  color: currentColor;
}

.menu-enter-active,
.menu-leave-active {
  transition: opacity 0.3s ease;
}
.menu-enter-from,
.menu-leave-to {
  opacity: 0;
}
.menu-enter-active .menu-item {
  transition:
    opacity 0.5s var(--ease-out-expo),
    transform 0.5s var(--ease-out-expo);
  transition-delay: calc(var(--i, 0) * 40ms + 60ms);
}
.menu-enter-from .menu-item {
  opacity: 0;
  transform: translateY(0.75rem);
}

@media (prefers-reduced-motion: reduce) {
  .menu-enter-active,
  .menu-leave-active,
  .menu-enter-active .menu-item,
  .burger-bar,
  .nav-link::after {
    transition: none;
  }
  .menu-enter-from .menu-item {
    transform: none;
  }
}
</style>
