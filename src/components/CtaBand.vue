<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { site } from '@/data/site'

withDefaults(defineProps<{ title?: string; text?: string }>(), {
  title: 'Parlons de votre prochain programme',
  text: 'Notre équipe se tient à votre disposition pour vous proposer des solutions adaptées, sur-mesure et novatrices.',
})
</script>

<template>
  <section class="bg-paper-deep" aria-labelledby="cta-title">
    <div class="shell grid gap-10 py-16 lg:grid-cols-12 lg:items-end lg:py-24">
      <div v-reveal class="lg:col-span-7">
        <h2 id="cta-title" class="max-w-[22ch]">{{ title }}</h2>
        <p class="mt-5 max-w-[52ch] text-ink-soft">{{ text }}</p>
      </div>
      <div v-reveal="120" class="flex flex-col items-start gap-6 lg:col-span-5 lg:items-end">
        <a :href="site.phoneHref" class="link font-display text-3xl font-medium">
          {{ site.phoneDisplay }}
        </a>
        <RouterLink to="/contact" class="btn btn-primary">Demander un devis</RouterLink>
      </div>
    </div>
  </section>
</template>
