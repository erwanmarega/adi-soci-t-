<script setup lang="ts">
import { RouterLink } from 'vue-router'
import CtaBand from '@/components/CtaBand.vue'
import PageHero from '@/components/PageHero.vue'
import PhotoGallery from '@/components/PhotoGallery.vue'
import SectionHeading from '@/components/SectionHeading.vue'
import { temoinPhotos, temoinText } from '@/data/temoin'

const gallery = [
  temoinPhotos.living,
  temoinPhotos.suite,
  temoinPhotos.bedroom,
  temoinPhotos.kids,
  temoinPhotos.lounge,
]
</script>

<template>
  <div>
    <PageHero
      eyebrow="Logement témoin"
      title="Décoration d’appartement ou maison témoin"
      :image="temoinPhotos.living.src"
      :image-alt="temoinPhotos.living.alt"
    >
      <RouterLink to="/contact" class="btn btn-primary">Demander un devis</RouterLink>
    </PageHero>

    <!-- Intro -->
    <section class="py-16 lg:py-24" aria-labelledby="intro-title">
      <div class="shell grid gap-8 lg:grid-cols-12 lg:gap-16">
        <h2
          id="intro-title"
          v-reveal
          class="text-[clamp(1.6rem,2.6vw,2.3rem)] leading-[1.2] lg:col-span-7"
        >
          {{ temoinText.lead }}
        </h2>
        <p v-reveal="140" class="max-w-[46ch] text-ink-soft lg:col-span-4 lg:col-start-9 lg:pt-3">
          {{ temoinText.why }}
        </p>
      </div>
    </section>

    <!-- Full-width photo -->
    <section aria-label="Salon d’un appartement témoin">
      <div class="shell">
        <div v-reveal class="overflow-hidden bg-paper-deep">
          <img
            :src="temoinPhotos.lounge.src"
            :alt="temoinPhotos.lounge.alt"
            loading="lazy"
            decoding="async"
            class="aspect-[4/3] w-full object-cover sm:aspect-[16/9] lg:aspect-[2/1]"
          />
        </div>
      </div>
    </section>

    <!-- Pull quote -->
    <section class="mt-20 bg-ink py-20 text-paper lg:mt-28 lg:py-28" aria-labelledby="quote-title">
      <div class="shell grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-16">
        <div class="lg:col-span-6">
          <h2 id="quote-title" v-reveal>L’effet <em>coup de cœur</em></h2>
          <p
            v-reveal="120"
            class="mt-6 max-w-[34ch] font-display text-[clamp(1.4rem,2.3vw,2rem)] leading-[1.25]"
          >
            {{ temoinText.quote }}
          </p>
        </div>
        <div v-reveal="200" class="lg:col-span-6">
          <div class="overflow-hidden">
            <img
              :src="temoinPhotos.suite.src"
              :alt="temoinPhotos.suite.alt"
              loading="lazy"
              decoding="async"
              class="aspect-[4/3] w-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- Gallery -->
    <section class="bg-paper-deep py-20 lg:py-28" aria-labelledby="gallery-title">
      <div class="shell">
        <SectionHeading
          id="gallery-title"
          title="Pièce après pièce, un logement où l’on s’imagine vivre"
        />
        <div class="mt-10 lg:mt-14">
          <PhotoGallery :images="gallery" layout="mosaic" />
        </div>
      </div>
    </section>

    <CtaBand
      title="Mettez en scène votre prochain logement témoin"
      text="Notre équipe se tient à votre disposition pour vous proposer des solutions adaptées, sur-mesure et novatrices."
    />
  </div>
</template>
