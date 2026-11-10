<script setup lang="ts">
withDefaults(
  defineProps<{
    items: { title: string; text: string }[]
    columns?: 2 | 3 | 4
    tone?: 'ink' | 'paper'
    /** Show 01/02/03 only for true step-by-step processes. */
    numbered?: boolean
  }>(),
  { columns: 3, tone: 'ink', numbered: false },
)

const columnClasses = {
  2: 'sm:grid-cols-2',
  3: 'sm:grid-cols-2 lg:grid-cols-3',
  4: 'sm:grid-cols-2 lg:grid-cols-4',
} as const
</script>

<template>
  <ol class="grid gap-x-10 gap-y-10" :class="columnClasses[columns]">
    <li
      v-for="(item, i) in items"
      :key="item.title"
      v-reveal="i * 90"
      class="border-t pt-5"
      :class="tone === 'paper' ? 'border-paper/25 text-paper' : 'border-ink/20 text-ink'"
    >
      <span
        v-if="numbered"
        class="block font-display text-3xl font-medium text-slate"
        :class="tone === 'paper' ? '!text-mist' : ''"
      >
        {{ String(i + 1).padStart(2, '0') }}
      </span>
      <h3 :class="numbered ? 'mt-4' : ''">{{ item.title }}</h3>
      <p class="mt-3 max-w-[38ch]" :class="tone === 'paper' ? 'text-mist' : 'text-ink-soft'">
        {{ item.text }}
      </p>
    </li>
  </ol>
</template>
