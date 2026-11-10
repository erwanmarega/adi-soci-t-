<script setup lang="ts">
import { nextTick, ref } from 'vue'
import { RouterLink } from 'vue-router'
import CtaBand from '@/components/CtaBand.vue'
import FeatureList from '@/components/FeatureList.vue'
import PageHero from '@/components/PageHero.vue'
import SectionHeading from '@/components/SectionHeading.vue'
import {
  packBenefits,
  packFootnote,
  packGuarantee,
  packSizes,
  packSteps,
  packStory,
} from '@/data/pack'

const posters = [
  '/images/temoin/20230313_113640.jpg',
  '/images/temoin/20230313_112719.jpg',
  '/images/temoin/20220720_170507.jpg',
]

const activeIndex = ref(0)
const tabRefs = ref<HTMLButtonElement[]>([])

function select(index: number, focus = false) {
  activeIndex.value = index
  if (focus) void nextTick(() => tabRefs.value[index]?.focus())
}

function onTabKeydown(event: KeyboardEvent) {
  const last = packSizes.length - 1
  let next: number | null = null
  if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
    next = activeIndex.value === last ? 0 : activeIndex.value + 1
  } else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
    next = activeIndex.value === 0 ? last : activeIndex.value - 1
  } else if (event.key === 'Home') {
    next = 0
  } else if (event.key === 'End') {
    next = last
  }
  if (next === null) return
  event.preventDefault()
  select(next, true)
}
</script>

<template>
  <div>
    <PageHero
      eyebrow="Meublé clé en main"
      title="Pack investisseur LMNP"
      lead="Des packs meubles et décoration, du studio au 3 pièces, livrés en une à deux fois maximum et installés pour vos logements locatifs."
      image="/images/home/pack-clean.jpg"
      image-alt="Studio meublé avec canapé gris, verrière d’atelier et chambre en alcôve"
      image-position="top"
      wide
    >
      <RouterLink to="/contact?service=pack-investisseur" class="btn btn-primary">
        Demander un devis
      </RouterLink>
    </PageHero>

    <section class="pt-4 pb-20 lg:pb-28" aria-labelledby="story-title">
      <div class="shell">
        <h2 id="story-title" class="sr-only">L’histoire de Pierre, avant et après ADI</h2>
        <div class="grid gap-12 border-t border-line pt-10 lg:grid-cols-12 lg:gap-16 lg:pt-14">
          <article v-reveal class="lg:col-span-5">
            <p class="font-display text-[clamp(1.9rem,3vw,2.6rem)] leading-none font-medium text-slate">
              Avant
            </p>
            <div class="mt-6 space-y-4 text-ink-soft">
              <p v-for="text in packStory.before" :key="text">{{ text }}</p>
            </div>
          </article>

          <article v-reveal="140" class="lg:col-span-6 lg:col-start-7">
            <p class="font-display text-[clamp(1.9rem,3vw,2.6rem)] leading-none font-medium">
              Après
            </p>
            <div class="mt-6 max-w-[60ch] space-y-4 text-ink">
              <p v-for="text in packStory.after" :key="text">{{ text }}</p>
            </div>
          </article>
        </div>
      </div>
    </section>

    <section class="border-y border-line py-20 lg:py-28" aria-labelledby="adi-is-title">
      <div class="shell grid gap-10 lg:grid-cols-12 lg:gap-16">
        <h2 id="adi-is-title" v-reveal class="lg:col-span-5">ADI, c’est&nbsp;:</h2>
        <ul class="lg:col-span-7">
          <li
            v-for="(benefit, i) in packBenefits"
            :key="benefit"
            v-reveal="i * 100"
            class="border-t border-line py-5 font-display text-[clamp(1.4rem,2.2vw,1.9rem)] leading-tight"
          >
            {{ benefit }}
          </li>
          <li
            v-reveal="200"
            class="border-y border-line py-5 font-display text-[clamp(1.4rem,2.2vw,1.9rem)] leading-tight italic"
          >
            {{ packGuarantee }}
          </li>
        </ul>
      </div>
    </section>

    <section class="bg-paper-deep py-20 lg:py-28" aria-labelledby="steps-title">
      <div class="shell">
        <SectionHeading id="steps-title" title="Du choix à la livraison, sans détour" />
        <div class="mt-12 lg:mt-16">
          <FeatureList :items="packSteps" :columns="3" numbered />
        </div>
      </div>
    </section>

    <section class="py-20 lg:py-28" aria-labelledby="packs-title">
      <div class="shell">
        <div class="grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-10">
          <h2 id="packs-title" v-reveal class="lg:col-span-7">Un thème pour chaque typologie</h2>
          <p v-reveal="100" class="text-ink-soft lg:col-span-4 lg:col-start-9">
            Choisissez la taille de votre logement pour découvrir le pack, sa vidéo de présentation
            et ses tarifs.
          </p>
        </div>

        <div v-reveal class="mt-12 lg:mt-14">
          <div
            role="tablist"
            aria-label="Typologie du logement"
            class="flex flex-wrap gap-x-10 gap-y-2 border-b border-line"
          >
            <button
              v-for="(size, i) in packSizes"
              :id="`pack-tab-${size.id}`"
              :key="size.id"
              :ref="(el) => { if (el) tabRefs[i] = el as HTMLButtonElement }"
              type="button"
              role="tab"
              :aria-selected="activeIndex === i"
              :aria-controls="`pack-panel-${size.id}`"
              :tabindex="activeIndex === i ? 0 : -1"
              class="relative pb-3 font-display text-[clamp(1.5rem,2.6vw,2.1rem)] font-medium transition-colors duration-300"
              :class="activeIndex === i ? 'text-ink' : 'text-ink/45 hover:text-accent'"
              @click="select(i)"
              @keydown="onTabKeydown"
            >
              {{ size.label }}
              <span
                class="absolute inset-x-0 -bottom-px h-0.5 origin-left bg-accent transition-transform duration-500"
                :class="activeIndex === i ? 'scale-x-100' : 'scale-x-0'"
                aria-hidden="true"
              ></span>
            </button>
          </div>

          <div
            v-for="(size, i) in packSizes"
            v-show="activeIndex === i"
            :id="`pack-panel-${size.id}`"
            :key="size.id"
            role="tabpanel"
            :aria-labelledby="`pack-tab-${size.id}`"
            tabindex="0"
            class="mt-8 grid gap-10 lg:mt-12 lg:grid-cols-12 lg:gap-14"
          >
            <div class="lg:col-span-7">
              <div class="overflow-hidden bg-ink">
                <video
                  controls
                  preload="none"
                  playsinline
                  :poster="posters[i]"
                  :aria-label="`Vidéo de présentation du pack ${size.label}, thème ${size.theme}`"
                  class="aspect-video w-full bg-ink object-cover"
                >
                  <source :src="size.videoSrc" type="video/mp4" />
                  Votre navigateur ne peut pas lire cette vidéo.
                </video>
              </div>
            </div>

            <div class="lg:col-span-5">
              <p class="text-sm text-slate">Thème</p>
              <h3 class="mt-2 text-[clamp(1.9rem,3vw,2.6rem)]">« {{ size.theme }} »</h3>

              <ul class="mt-8 space-y-7">
                <li v-for="offer in size.offers" :key="offer.name" class="border-t border-ink/30 pt-5">
                  <p class="font-display text-xl font-medium">{{ offer.name }}</p>
                  <p class="mt-3 text-ink-soft">
                    Prix à partir de
                    <strong class="font-display text-3xl font-medium text-ink">
                      {{ offer.priceFrom }}*
                    </strong>
                    TTC
                  </p>
                  <dl class="mt-3 flex flex-wrap gap-x-8 gap-y-1 text-sm text-ink-soft">
                    <div class="flex gap-2">
                      <dt>Livraison :</dt>
                      <dd class="font-medium text-ink">{{ offer.delivery }}</dd>
                    </div>
                    <div class="flex gap-2">
                      <dt>Installation :</dt>
                      <dd class="font-medium text-ink">{{ offer.installation }}</dd>
                    </div>
                  </dl>
                </li>
              </ul>
            </div>
          </div>

          <p class="mt-12 text-sm text-ink-soft">{{ packFootnote }}</p>
        </div>
      </div>
    </section>

    <CtaBand
      title="Meublons vos logements locatifs"
      text="Choisissez votre pack, recevez votre devis, et laissez-nous nous occuper de la livraison et de l’installation."
    />
  </div>
</template>
