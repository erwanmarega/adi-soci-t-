<script setup lang="ts">
import { RouterLink } from 'vue-router'
import CtaBand from '@/components/CtaBand.vue'
import FeatureList from '@/components/FeatureList.vue'
import PageHero from '@/components/PageHero.vue'
import PhotoGallery from '@/components/PhotoGallery.vue'
import SectionHeading from '@/components/SectionHeading.vue'
import {
  cuisineEngagements,
  cuisineGallery,
  cuisineHero,
  cuisineSidePhoto,
  cuisineSteps,
} from '@/data/cuisine'
</script>

<template>
  <div>
    <PageHero
      eyebrow="Cuisine"
      title="Votre cuisine sur mesure"
      lead="Des designs uniques adaptés à vos besoins et à votre espace."
      :image="cuisineHero.src"
      :image-alt="cuisineHero.alt"
    >
      <RouterLink to="/contact" class="btn btn-primary">Demander un devis</RouterLink>
    </PageHero>

    <!-- Engagements -->
    <section class="py-16 lg:py-24" aria-labelledby="engagements-title">
      <div class="shell grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div class="lg:col-span-7">
          <SectionHeading
            id="engagements-title"
            title="Une cuisine pensée, fabriquée et installée avec soin"
          />
          <div class="mt-10 lg:mt-14">
            <FeatureList :items="cuisineEngagements" :columns="2" />
          </div>
        </div>
        <div v-reveal="150" class="lg:col-span-5 lg:pt-20">
          <div class="overflow-hidden bg-paper-deep">
            <img
              :src="cuisineSidePhoto.src"
              :alt="cuisineSidePhoto.alt"
              loading="lazy"
              decoding="async"
              class="aspect-[4/5] w-full object-cover object-[35%_50%]"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- Process -->
    <section class="bg-paper-deep py-20 lg:py-28" aria-labelledby="process-title">
      <div class="shell">
        <SectionHeading id="process-title" title="De la conception à la satisfaction" />
        <div class="mt-12 lg:mt-16">
          <FeatureList :items="cuisineSteps" :columns="3" numbered />
        </div>
      </div>
    </section>

    <!-- Gallery -->
    <section class="py-20 lg:py-28" aria-labelledby="gallery-title">
      <div class="shell">
        <SectionHeading id="gallery-title" title="Des cuisines installées pour vos programmes" />
        <div class="mt-10 lg:mt-14">
          <PhotoGallery :images="cuisineGallery" layout="strip" />
        </div>
      </div>
    </section>

    <CtaBand
      title="Parlons de votre projet de cuisine"
      text="Rencontrez nos designers pour créer la cuisine de vos rêves."
    />
  </div>
</template>
