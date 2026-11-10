<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { navItems, site } from '@/data/site'

const year = new Date().getFullYear()
</script>

<template>
  <footer class="bg-ink text-paper">
    <div class="shell pt-16 pb-8 lg:pt-24">
      <div class="grid gap-12 lg:grid-cols-12">
        <div class="lg:col-span-7">
          <p class="font-display text-[clamp(2rem,3.6vw,3rem)] leading-[1.1] font-medium">
            Un programme à lancer, un espace de vente à aménager
          </p>
          <div class="mt-8 flex flex-wrap items-center gap-x-8 gap-y-5">
            <a :href="site.phoneHref" class="font-display text-2xl font-medium underline decoration-paper/30 underline-offset-[0.35em] transition-colors hover:decoration-accent sm:text-3xl">
              {{ site.phoneDisplay }}
            </a>
            <RouterLink to="/contact" class="btn btn-primary">Demander un devis</RouterLink>
          </div>
        </div>

        <nav class="grid grid-cols-2 gap-10 lg:col-span-5 lg:pl-10" aria-label="Pied de page">
          <div>
            <h2 class="font-sans text-sm font-medium text-mist">Services</h2>
            <ul class="mt-5 space-y-3">
              <li v-for="item in navItems" :key="item.to">
                <RouterLink :to="item.to" class="text-paper/85 transition-colors hover:text-white hover:underline hover:decoration-accent hover:underline-offset-4">
                  {{ item.label }}
                </RouterLink>
              </li>
            </ul>
          </div>
          <div>
            <h2 class="font-sans text-sm font-medium text-mist">Contact</h2>
            <ul class="mt-5 space-y-3">
              <li>
                <a :href="site.phoneHref" class="text-paper/85 transition-colors hover:text-white hover:underline hover:decoration-accent hover:underline-offset-4">
                  {{ site.phoneDisplay }}
                </a>
              </li>
              <li>
                <RouterLink to="/contact" class="text-paper/85 transition-colors hover:text-white hover:underline hover:decoration-accent hover:underline-offset-4">
                  Demander un devis
                </RouterLink>
              </li>
              <li>
                <a
                  :href="site.instagram"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="inline-flex items-center gap-2 text-paper/85 transition-colors hover:text-white hover:underline hover:decoration-accent hover:underline-offset-4"
                >
                  <svg class="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true">
                    <rect x="3.5" y="3.5" width="17" height="17" rx="1" />
                    <circle cx="12" cy="12" r="4" />
                    <circle cx="17.2" cy="6.8" r="0.8" fill="currentColor" stroke="none" />
                  </svg>
                  Instagram
                  <span class="sr-only">(nouvel onglet)</span>
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </div>

      <div class="mt-16 flex flex-col gap-4 border-t border-paper/15 pt-6 text-sm text-mist sm:flex-row sm:items-center sm:justify-between">
        <p class="flex items-baseline gap-4">
          <span class="font-display text-2xl font-medium tracking-[0.06em] text-paper">ADI</span>
          <span class="text-xs text-mist">Agencement · Décoration · Immo</span>
        </p>
        <p>© ADI Société {{ year }}</p>
      </div>
    </div>
  </footer>
</template>
