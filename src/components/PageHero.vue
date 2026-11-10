<script setup lang="ts">
withDefaults(
  defineProps<{
    eyebrow: string
    title: string
    lead?: string
    image: string
    imageAlt: string
    imagePosition?: string
    wide?: boolean
  }>(),
  { imagePosition: 'center', wide: false },
)
</script>

<template>
  <section class="pt-8 pb-14 lg:pt-14 lg:pb-20">
    <div class="shell">
      <p class="eyebrow" v-reveal>{{ eyebrow }}</p>
      <div class="mt-4 grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-10">
        <h1 v-reveal="80" class="lg:col-span-8">
          {{ title }}
        </h1>
        <div v-if="lead || $slots.default" v-reveal="180" class="lg:col-span-4">
          <p v-if="lead" class="text-ink-soft">{{ lead }}</p>
          <div v-if="$slots.default" class="flex flex-wrap items-center gap-4" :class="lead ? 'mt-6' : ''">
            <slot />
          </div>
        </div>
      </div>
    </div>

    <div class="shell mt-10 lg:mt-14">
      <div class="overflow-hidden bg-paper-deep">
        <img
          :src="image"
          :alt="imageAlt"
          :style="{ objectPosition: imagePosition }"
          class="hero-img w-full object-cover"
          :class="
            wide
              ? 'aspect-[2/1] sm:aspect-[21/9] lg:aspect-[5/2]'
              : 'aspect-[4/3] sm:aspect-[16/9] lg:aspect-[21/9]'
          "
          fetchpriority="high"
          decoding="async"
        />
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero-img {
  animation: hero-zoom 2s var(--ease-out-expo) both;
}
@keyframes hero-zoom {
  from {
    transform: scale(1.05);
  }
  to {
    transform: scale(1);
  }
}
@media (prefers-reduced-motion: reduce) {
  .hero-img {
    animation: none;
  }
}
</style>
