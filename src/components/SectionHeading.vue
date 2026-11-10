<script setup lang="ts">
withDefaults(
  defineProps<{
    eyebrow?: string
    title: string
    lead?: string
    align?: 'left' | 'center'
    tone?: 'ink' | 'paper'
  }>(),
  { align: 'left', tone: 'ink' },
)
</script>

<template>
  <div
    v-reveal
    :class="[align === 'center' ? 'mx-auto text-center' : '', tone === 'paper' ? 'text-paper' : 'text-ink', 'max-w-3xl']"
  >
    <p v-if="eyebrow" class="eyebrow mb-3" :class="tone === 'paper' ? '!text-mist' : ''">{{ eyebrow }}</p>
    <h2>{{ title }}</h2>
    <p v-if="lead" class="mt-5 max-w-[60ch]" :class="tone === 'paper' ? 'text-mist' : 'text-ink-soft'">
      {{ lead }}
    </p>
  </div>
</template>
