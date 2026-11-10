<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import CtaBand from '@/components/CtaBand.vue'
import PageHero from '@/components/PageHero.vue'
import PhotoGallery from '@/components/PhotoGallery.vue'
import { supportFamilies } from '@/data/supports'

const [permis, palissade, bache, kakemono, covering] = supportFamilies as [
  (typeof supportFamilies)[number],
  (typeof supportFamilies)[number],
  (typeof supportFamilies)[number],
  (typeof supportFamilies)[number],
  (typeof supportFamilies)[number],
]

const activeId = ref<string>(permis.id)
let observer: IntersectionObserver | null = null

onMounted(() => {
  if (typeof IntersectionObserver === 'undefined') return
  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) activeId.value = entry.target.id
      }
    },
    { rootMargin: '-35% 0px -55% 0px' },
  )
  for (const family of supportFamilies) {
    const el = document.getElementById(family.id)
    if (el) observer.observe(el)
  }
})

onBeforeUnmount(() => observer?.disconnect())
</script>

<template>
  <div>
    <PageHero
      eyebrow="Signalétique"
      title="Supports de communication"
      lead="Permis de construire, palissades, bâches, kakémonos et covering : tous les supports qui rendent vos programmes immobiliers visibles, de la création à la pose."
      image="/images/supports/palissade_emerige.jpg"
      image-alt="Palissade de chantier imprimée annonçant un programme immobilier à Paris, avec perspectives de terrasses"
    />

    <!-- Sticky in-page index (desktop) -->
    <nav
      class="sticky top-20 z-40 hidden border-y border-line bg-paper/95 backdrop-blur lg:block"
      aria-label="Sur cette page"
    >
      <ul class="shell flex items-center gap-10">
        <li v-for="family in supportFamilies" :key="family.id">
          <a
            :href="`#${family.id}`"
            class="relative block py-4 text-[0.95rem] transition-colors"
            :class="activeId === family.id ? 'font-medium text-ink' : 'text-slate hover:text-accent'"
            :aria-current="activeId === family.id ? 'true' : undefined"
          >
            {{ family.label }}
            <span
              class="absolute inset-x-0 bottom-0 h-0.5 origin-left bg-accent transition-transform duration-500"
              :class="activeId === family.id ? 'scale-x-100' : 'scale-x-0'"
              aria-hidden="true"
            ></span>
          </a>
        </li>
      </ul>
    </nav>

    <!-- Permis de construire -->
    <section :id="permis.id" class="scroll-mt-36 py-16 lg:py-24" :aria-labelledby="`${permis.id}-title`">
      <div class="shell">
        <div class="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div class="lg:col-span-6">
            <p class="eyebrow" v-reveal>{{ permis.label }}</p>
            <h2 :id="`${permis.id}-title`" v-reveal="80" class="mt-3">
              {{ permis.title }}
            </h2>
            <p v-reveal="160" class="mt-6 max-w-[46ch] text-lg leading-snug text-ink">
              {{ permis.paragraphs[0] }}
            </p>
          </div>

          <div class="lg:col-span-6 lg:pt-8">
            <dl class="grid gap-10 sm:grid-cols-2 lg:gap-12">
              <div v-reveal="120" class="border-t border-ink/30 pt-5">
                <dt class="text-sm text-slate">Fabrication et pose</dt>
                <dd class="mt-3">
                  <span class="block font-display text-[clamp(3.5rem,6vw,5.5rem)] leading-none font-medium">
                    36&thinsp;h
                  </span>
                  <span class="mt-4 block max-w-[30ch] text-ink-soft">
                    suivant la signature du devis, à partir des informations que vous nous fournissez.
                  </span>
                </dd>
              </div>
              <div v-reveal="240" class="border-t border-ink/30 pt-5">
                <dt class="text-sm text-slate">Création confiée à ADI</dt>
                <dd class="mt-3">
                  <span class="block font-display text-[clamp(3.5rem,6vw,5.5rem)] leading-none font-medium">
                    48&thinsp;h
                  </span>
                  <span class="mt-4 block max-w-[30ch] text-ink-soft">
                    pour la pose, après validation de la création.
                  </span>
                </dd>
              </div>
            </dl>
          </div>
        </div>

        <div class="mt-12 grid gap-6 lg:mt-16 lg:grid-cols-12 lg:gap-16">
          <p v-reveal class="max-w-[56ch] text-ink-soft lg:col-span-6">{{ permis.paragraphs[1] }}</p>
          <p v-reveal="120" class="max-w-[56ch] text-ink-soft lg:col-span-6">{{ permis.paragraphs[2] }}</p>
        </div>

        <div class="mt-12 lg:mt-16">
          <PhotoGallery :images="permis.images" layout="strip" />
        </div>
      </div>
    </section>

    <!-- Palissade -->
    <section :id="palissade.id" class="scroll-mt-36 bg-paper-deep py-20 lg:py-28" :aria-labelledby="`${palissade.id}-title`">
      <div class="shell">
        <div class="grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-16">
          <div class="lg:col-span-6">
            <p class="eyebrow" v-reveal>{{ palissade.label }}</p>
            <h2 :id="`${palissade.id}-title`" v-reveal="80" class="mt-3">
              Un chantier qui parle
            </h2>
          </div>
          <div class="space-y-4 text-ink-soft lg:col-span-6">
            <p v-reveal="120">{{ palissade.paragraphs[0] }}</p>
            <p v-reveal="200" class="text-ink">{{ palissade.paragraphs[1] }}</p>
          </div>
        </div>
        <div class="mt-10 lg:mt-14">
          <PhotoGallery :images="palissade.images" />
        </div>
      </div>
    </section>

    <!-- Bâche -->
    <section :id="bache.id" class="scroll-mt-36 py-20 lg:py-28" :aria-labelledby="`${bache.id}-title`">
      <div class="shell">
        <div class="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div class="lg:sticky lg:top-56 lg:col-span-4 lg:self-start">
            <p class="eyebrow" v-reveal>{{ bache.label }}</p>
            <h2 :id="`${bache.id}-title`" v-reveal="80" class="mt-3">
              {{ bache.title }}
            </h2>
            <p v-reveal="160" class="mt-6 max-w-[40ch] text-ink-soft">
              {{ bache.paragraphs[0] }}
            </p>
          </div>
          <div class="lg:col-span-8">
            <PhotoGallery :images="bache.images" />
          </div>
        </div>
      </div>
    </section>

    <!-- Kakémono -->
    <section :id="kakemono.id" class="scroll-mt-36 bg-paper-deep py-20 lg:py-28" :aria-labelledby="`${kakemono.id}-title`">
      <div class="shell">
        <div class="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div class="lg:col-span-5">
            <p class="eyebrow" v-reveal>{{ kakemono.label }}</p>
            <h2 :id="`${kakemono.id}-title`" v-reveal="80" class="mt-3">
              Efficace, rapide, économique
            </h2>
            <p v-reveal="160" class="mt-6 max-w-[46ch] text-ink-soft">
              {{ kakemono.paragraphs[0] }}
            </p>
          </div>
          <ul class="grid gap-6 sm:grid-cols-2 lg:col-span-7 lg:gap-8">
            <li v-for="(image, i) in kakemono.images" :key="image.src" v-reveal="i * 120">
              <figure>
                <div class="overflow-hidden bg-paper">
                  <img
                    :src="image.src"
                    :alt="image.alt"
                    loading="lazy"
                    decoding="async"
                    class="aspect-[4/5] w-full object-cover"
                  />
                </div>
                <figcaption class="mt-3 text-sm text-slate">
                  {{ image.caption }}
                </figcaption>
              </figure>
            </li>
          </ul>
        </div>
      </div>
    </section>

    <!-- Covering -->
    <section :id="covering.id" class="scroll-mt-36 py-20 lg:py-28" :aria-labelledby="`${covering.id}-title`">
      <div class="shell">
        <div class="grid gap-8 lg:grid-cols-12 lg:gap-16">
          <div class="lg:col-span-6">
            <p class="eyebrow" v-reveal>{{ covering.label }}</p>
            <h2 :id="`${covering.id}-title`" v-reveal="80" class="mt-3">
              Votre programme prend la route
            </h2>
          </div>
          <div class="space-y-4 text-ink-soft lg:col-span-6">
            <p v-reveal="120" class="text-ink">{{ covering.paragraphs[0] }}</p>
            <p v-reveal="200">{{ covering.paragraphs[1] }}</p>
          </div>
        </div>
        <div class="mt-10 lg:mt-14">
          <PhotoGallery :images="covering.images" />
        </div>
      </div>
    </section>

    <CtaBand />
  </div>
</template>
