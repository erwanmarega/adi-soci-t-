<script setup lang="ts">
import { RouterView } from 'vue-router'
import SiteFooter from '@/components/SiteFooter.vue'
import SiteHeader from '@/components/SiteHeader.vue'
</script>

<template>
  <a
    href="#main"
    class="sr-only z-[100] rounded-sm bg-ink px-5 py-3 text-sm font-medium text-paper focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
  >
    Aller au contenu
  </a>
  <SiteHeader />
  <main id="main" class="overflow-x-clip">
    <RouterView v-slot="{ Component }">
      <Transition name="page" mode="out-in">
        <component :is="Component" />
      </Transition>
    </RouterView>
  </main>
  <SiteFooter />
</template>

<style>
.page-enter-active,
.page-leave-active {
  transition: opacity 0.3s ease;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
}
@media (prefers-reduced-motion: reduce) {
  .page-enter-active,
  .page-leave-active {
    transition: none;
  }
}
</style>
