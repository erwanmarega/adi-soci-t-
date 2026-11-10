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
    overlay.value?.querySelector<HTMLElement>('a[href]')?.focus()
  } else {
    unlockScroll()
  }
})

watch(() => route.fullPath, closeMenu)

onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('keydown', onKeydown)
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('keydown', onKeydown)
  if (menuOpen.value) unlockScroll()
})
</script>

<template>
  <header
    class="sticky top-0 z-[60] border-b transition-[background-color,border-color,backdrop-filter] duration-500"
    :class="[
      scrolled && !menuOpen
        ? 'border-line bg-paper/90 backdrop-blur-md'
        : 'border-transparent bg-paper',
      menuOpen ? 'text-paper' : 'text-ink',
    ]"
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
          class="relative flex size-11 items-center justify-center rounded-sm border border-current xl:hidden"
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
      class="fixed inset-0 z-50 overflow-y-auto bg-ink text-paper xl:hidden"
    >
      <nav class="shell flex min-h-full flex-col justify-between gap-10 pt-28 pb-10" aria-label="Menu mobile">
        <ul class="flex flex-col">
          <li v-for="item in navItems" :key="item.to" class="border-b border-paper/15">
            <RouterLink
              :to="item.to"
              class="block py-4 font-display text-[clamp(1.9rem,8vw,2.6rem)] font-medium"
            >
              {{ item.label }}
            </RouterLink>
          </li>
        </ul>
        <div class="flex flex-col gap-5">
          <RouterLink to="/contact" class="btn btn-primary w-full">Demander un devis</RouterLink>
          <a :href="site.phoneHref" class="text-center font-display text-2xl font-medium">
            {{ site.phoneDisplay }}
          </a>
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

.menu-enter-active,
.menu-leave-active {
  transition: opacity 0.35s ease;
}
.menu-enter-from,
.menu-leave-to {
  opacity: 0;
}

@media (prefers-reduced-motion: reduce) {
  .menu-enter-active,
  .menu-leave-active,
  .burger-bar,
  .nav-link::after {
    transition: none;
  }
}
</style>
