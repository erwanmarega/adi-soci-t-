<script setup lang="ts">
import { RouterLink } from 'vue-router'
import CtaBand from '@/components/CtaBand.vue'
import FeatureList from '@/components/FeatureList.vue'
import PageHero from '@/components/PageHero.vue'
import PhotoGallery from '@/components/PhotoGallery.vue'
import SectionHeading from '@/components/SectionHeading.vue'
import {
  bureauIntro,
  bureauOtherServices,
  bureauQualities,
  bureauServices,
} from '@/data/bureau'

const heroImage = '/images/bureau/img_3491.jpg'
const heroAlt =
  'Espace de vente à deux niveaux, enseigne et bandeau bleu roi, grandes baies vitrées et visuel du programme en façade'

/* With three extra photos, the last one spans the full row. */
function isWide(index: number, total: number) {
  return total === 3 && index === 2
}
</script>

<template>
  <div>
    <PageHero
      eyebrow="Bureau de vente"
      title="Des espaces de vente sur mesure"
      lead="Des solutions modulables et économiques pour répondre à tous vos besoins."
      :image="heroImage"
      :image-alt="heroAlt"
    >
      <RouterLink to="/contact" class="btn btn-primary">Demander un devis</RouterLink>
    </PageHero>

    <!-- Intro -->
    <section class="py-16 lg:py-24" aria-labelledby="intro-title">
      <div class="shell grid gap-10 lg:grid-cols-12 lg:gap-16">
        <h2 id="intro-title" v-reveal class="lg:col-span-6">
          {{ bureauIntro.title }}
        </h2>
        <div v-reveal="120" class="lg:col-span-6 lg:pt-2">
          <p class="max-w-[62ch] text-ink-soft">{{ bureauIntro.text }}</p>
          <ul class="mt-8 border-t border-line">
            <li
              v-for="goal in bureauIntro.goals"
              :key="goal"
              class="border-b border-line py-4 font-display text-xl leading-snug sm:text-2xl"
            >
              {{ goal.charAt(0).toUpperCase() + goal.slice(1) }}
            </li>
          </ul>
        </div>
      </div>
    </section>

    <!-- Qualities -->
    <section class="bg-paper-deep py-20 lg:py-28" aria-labelledby="qualities-title">
      <div class="shell">
        <SectionHeading
          id="qualities-title"
          title="Modulables, économiques, personnalisables, durables"
        />
        <div class="mt-12 lg:mt-16">
          <FeatureList :items="bureauQualities" :columns="4" />
        </div>
      </div>
    </section>

    <!-- Illustrated services -->
    <section class="py-20 lg:py-28" aria-labelledby="services-title">
      <div class="shell">
        <h2 id="services-title" v-reveal>De la construction à l’entretien</h2>

        <div class="mt-12 space-y-20 lg:mt-16 lg:space-y-28">
          <article
            v-for="(service, i) in bureauServices"
            :key="service.slug"
            :aria-labelledby="`service-${service.slug}`"
            class="grid gap-8 border-t border-line pt-10 lg:grid-cols-12 lg:gap-14 lg:pt-14"
          >
            <div v-reveal class="lg:col-span-4" :class="i % 2 === 1 ? 'lg:order-2 lg:col-start-9' : ''">
              <h3 :id="`service-${service.slug}`">
                {{ service.title }}
              </h3>
              <p class="mt-5 font-display text-xl leading-snug italic sm:text-2xl">
                {{ service.hook }}
              </p>
              <p class="mt-4 max-w-[46ch] text-ink-soft">{{ service.text }}</p>
            </div>

            <div class="lg:col-span-7" :class="i % 2 === 1 ? 'lg:order-1' : 'lg:col-start-6'">
              <figure v-reveal="100">
                <div class="overflow-hidden bg-paper-deep">
                  <img
                    :src="service.images[0]?.src"
                    :alt="service.images[0]?.alt"
                    loading="lazy"
                    decoding="async"
                    class="aspect-[4/3] w-full object-cover"
                  />
                </div>
                <figcaption v-if="service.images[0]?.caption" class="mt-3 text-sm text-slate">
                  {{ service.images[0].caption }}
                </figcaption>
              </figure>

              <ul
                v-if="service.images.length > 1 && service.images.length <= 4"
                class="mt-4 grid grid-cols-2 gap-4"
              >
                <li
                  v-for="(image, j) in service.images.slice(1)"
                  :key="image.src"
                  v-reveal="j * 80"
                  :class="isWide(j, service.images.length - 1) ? 'col-span-2' : ''"
                >
                  <figure>
                    <div class="overflow-hidden bg-paper-deep">
                      <img
                        :src="image.src"
                        :alt="image.alt"
                        loading="lazy"
                        decoding="async"
                        class="w-full object-cover"
                        :class="isWide(j, service.images.length - 1) ? 'aspect-[16/9]' : 'aspect-[4/3]'"
                      />
                    </div>
                    <figcaption v-if="image.caption" class="mt-2 text-sm text-slate">
                      {{ image.caption }}
                    </figcaption>
                  </figure>
                </li>
              </ul>
            </div>

            <div v-if="service.images.length > 4" class="lg:col-span-12">
              <p v-reveal class="mb-6 font-display text-2xl">Plus de réalisations</p>
              <PhotoGallery :images="service.images.slice(1)" layout="strip" />
            </div>
          </article>
        </div>
      </div>
    </section>

    <!-- Other services -->
    <section class="border-t border-line py-20 lg:py-28" aria-labelledby="support-title">
      <div class="shell">
        <SectionHeading id="support-title" title="Le quotidien de vos espaces, pris en charge" />
        <div class="mt-12 grid gap-x-14 gap-y-12 lg:mt-16 lg:grid-cols-2">
          <article v-for="(item, i) in bureauOtherServices" :key="item.title" v-reveal="i * 100" class="border-t border-ink/30 pt-6">
            <h3>{{ item.title }}</h3>
            <p class="mt-4 font-display text-xl leading-snug italic sm:text-2xl">
              {{ item.hook }}
            </p>
            <p class="mt-4 max-w-[46ch] text-ink-soft">{{ item.text }}</p>
          </article>
        </div>
      </div>
    </section>

    <!-- Mobile sales office -->
    <section class="bg-ink text-paper" aria-labelledby="mobile-title">
      <div class="shell grid items-center gap-10 py-16 lg:grid-cols-12 lg:gap-16 lg:py-24">
        <div class="lg:col-span-5">
          <p class="eyebrow !text-mist" v-reveal>Nouveau</p>
          <h2 id="mobile-title" v-reveal="80" class="mt-3">
            Louez votre bureau de vente mobile
          </h2>
          <div v-reveal="160" class="mt-7">
            <RouterLink to="/contact" class="btn btn-primary">Nous contacter</RouterLink>
          </div>
        </div>
        <div v-reveal="120" class="overflow-hidden lg:col-span-7">
          <img
            src="/images/home/truck.jpg"
            alt="Véhicule blanc aménagé en bureau de vente mobile, auvent déployé et porte ouverte"
            loading="lazy"
            decoding="async"
            class="aspect-[16/10] w-full object-cover"
          />
        </div>
      </div>
    </section>

    <CtaBand />
  </div>
</template>
