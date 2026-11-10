<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <section class="shell flex min-h-[60vh] flex-col justify-center py-20">
    <p class="eyebrow">Erreur 404</p>
    <h1 class="mt-4 max-w-[18ch]">Cette page n’existe pas</h1>
    <p class="mt-6 max-w-[52ch] text-ink-soft">
      Le lien est peut-être incorrect, ou la page a été déplacée. Revenez à l’accueil pour retrouver
      nos réalisations.
    </p>
    <div class="mt-8">
      <RouterLink to="/" class="btn btn-ink">Retour à l’accueil</RouterLink>
    </div>
  </section>
</template>
