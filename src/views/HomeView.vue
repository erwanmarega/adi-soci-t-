<script setup lang="ts">
import { nextTick, ref } from 'vue'
import { RouterLink } from 'vue-router'
import CtaBand from '@/components/CtaBand.vue'
import FeatureList from '@/components/FeatureList.vue'
import SectionHeading from '@/components/SectionHeading.vue'
import { clients, services, site, values } from '@/data/site'

const videoPlaying = ref(false)
const videoFrame = ref<HTMLIFrameElement | null>(null)

async function playVideo() {
  videoPlaying.value = true
  await nextTick()
  videoFrame.value?.focus()
}

const projects = [
  {
    src: '/images/bureau/savana_studio_bv_icade_nanterre.jpg',
    alt: 'Bureau de vente sur deux niveaux à l’ossature rouge et noire, enseigne « Espace de vente » et visuels du programme en vitrine',
    client: 'Icade — Nanterre',
    work: 'Bureau de vente',
    to: '/bureau-de-vente',
    position: '50% 50%',
  },
  {
    src: '/images/bureau/savana_studio_espace_de_vente_st-ouen4_icade.jpg',
    alt: 'Intérieur d’un bureau de vente lumineux : table de présentation, chaises jaunes et visuels du programme au mur',
    client: 'Icade — Saint-Ouen',
    work: 'Bureau de vente',
    to: '/bureau-de-vente',
    position: '30% 50%',
  },
  {
    src: '/images/supports/palissade_emerige.jpg',
    alt: 'Palissade de chantier imprimée annonçant un programme de 168 appartements à Paris 19e, avec perspectives de terrasses',
    client: 'Emerige — Paris 19e',
    work: 'Palissade de chantier',
    to: '/supports-de-communication',
    position: '50% 50%',
  },
  {
    src: '/images/bureau/savana_studio_stradim_dammarie_bv.jpg',
    alt: 'Pavillon de vente vert sombre avec vitrines, marches en bois et affiche d’un programme neuf',
    client: 'Stradim — Dammarie',
    work: 'Bureau de vente',
    to: '/bureau-de-vente',
    position: '50% 50%',
  },
]
</script>
<template>
  <div>
    <section aria-labelledby="hero-title">
      <div class="h-[58vh] min-h-[22rem] w-full overflow-hidden bg-paper-deep lg:h-[74vh] lg:max-h-[56rem]">
        <img
          src="/images/temoin/20230313_112719.jpg"
          alt="Salon lumineux d’un appartement témoin : grands rideaux, canapé gris, fauteuil rose poudré et buffet en bois clair"
          class="hero-photo size-full object-cover object-[58%_50%] lg:object-center"
          fetchpriority="high"
          decoding="async"
        />
      </div>
      <div class="shell grid gap-8 pt-10 pb-16 lg:grid-cols-12 lg:gap-10 lg:pt-14 lg:pb-24">
        <h1 id="hero-title" v-reveal class="lg:col-span-7">
          Bureaux de vente, logements témoins et signalétique pour les
          <em>promoteurs immobiliers</em>.
        </h1>
        <div v-reveal="120" class="lg:col-span-4 lg:col-start-9 lg:pt-2">
          <p class="text-ink-soft">
            Spécialisée dans la décoration d’appartements témoins, la conception, l’aménagement et
            l’entretien des espaces de vente ainsi que dans la signalétique, ADI est le partenaire
            idéal pour la communication de vos programmes immobiliers.
          </p>
          <div class="mt-7 flex flex-wrap items-center gap-x-8 gap-y-4">
            <RouterLink to="/contact" class="btn btn-primary">Demander un devis</RouterLink>
            <a :href="site.phoneHref" class="link font-display text-xl font-medium">
              {{ site.phoneDisplay }}
            </a>
          </div>
        </div>
      </div>
    </section>

    <section class="border-y border-line py-10 lg:py-12" aria-labelledby="clients-title">
      <div class="shell grid gap-5 lg:grid-cols-12 lg:items-baseline lg:gap-10">
        <h2 id="clients-title" v-reveal class="eyebrow !font-sans lg:col-span-3">
          Ils nous font confiance
        </h2>
        <ul v-reveal="100" class="flex flex-wrap gap-x-9 gap-y-2 lg:col-span-9">
          <li v-for="name in clients" :key="name" class="font-display text-xl text-ink-soft">
            {{ name }}
          </li>
        </ul>
      </div>
    </section>

    <section class="py-20 lg:py-28" aria-labelledby="projects-title">
      <div class="shell">
        <div class="flex flex-wrap items-end justify-between gap-4">
          <h2 id="projects-title" v-reveal>Réalisations</h2>
          <RouterLink v-reveal="80" to="/bureau-de-vente" class="link text-sm font-medium">
            Voir les espaces de vente
          </RouterLink>
        </div>

        <ul class="mt-10 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:mt-14">
          <li v-for="(project, i) in projects" :key="project.src" v-reveal="(i % 2) * 100">
            <RouterLink :to="project.to" class="group block">
              <div class="overflow-hidden bg-paper-deep">
                <img
                  :src="project.src"
                  :alt="project.alt"
                  :style="{ objectPosition: project.position }"
                  loading="lazy"
                  decoding="async"
                  class="aspect-[3/2] w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.03]"
                />
              </div>
              <p class="mt-4 flex flex-wrap items-baseline gap-x-3">
                <span class="font-display text-xl font-medium transition-colors group-hover:text-accent">
                  {{ project.client }}
                </span>
                <span class="text-sm text-slate">{{ project.work }}</span>
              </p>
            </RouterLink>
          </li>
        </ul>
      </div>
    </section>

    <section class="pb-20 lg:pb-28" aria-labelledby="services-title">
      <div class="shell">
        <div class="grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-10">
          <h2 id="services-title" v-reveal class="lg:col-span-7">
            De l’espace de vente à la palissade de chantier
          </h2>
          <p v-reveal="100" class="text-ink-soft lg:col-span-4 lg:col-start-9">
            Nous accompagnons chaque étape de la commercialisation de vos logements.
          </p>
        </div>

        <ul class="mt-12 border-b border-line lg:mt-16">
          <li v-for="service in services" :key="service.slug" v-reveal class="border-t border-line">
            <RouterLink
              :to="service.route"
              class="group grid items-center gap-5 py-7 lg:grid-cols-12 lg:gap-10 lg:py-9"
            >
              <div class="overflow-hidden bg-paper-deep lg:col-span-4">
                <img
                  :src="service.image"
                  :alt="service.imageAlt"
                  loading="lazy"
                  decoding="async"
                  class="aspect-[3/2] w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.03]"
                />
              </div>
              <div class="lg:col-span-5 lg:col-start-6">
                <h3>{{ service.title }}</h3>
                <p class="mt-2 max-w-[44ch] text-ink-soft">{{ service.tagline }}</p>
              </div>
              <p class="text-sm font-medium transition-colors group-hover:text-accent lg:col-span-2 lg:col-start-11 lg:text-right">
                Découvrir
                <span aria-hidden="true">→</span>
              </p>
            </RouterLink>
          </li>
        </ul>
      </div>
    </section>

    <section class="bg-paper-deep" aria-labelledby="news-title">
      <div class="shell grid items-center gap-10 py-16 lg:grid-cols-12 lg:gap-16 lg:py-24">
        <div class="lg:col-span-5">
          <p class="eyebrow" v-reveal>Nouveau</p>
          <h2 id="news-title" v-reveal="80" class="mt-3">
            Louez votre bureau de vente mobile
          </h2>
          <div v-reveal="160" class="mt-7">
            <RouterLink to="/bureau-de-vente" class="btn btn-ink">Découvrir le bureau de vente</RouterLink>
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

    <section class="py-20 lg:py-28" aria-labelledby="about-title">
      <div class="shell">
        <h2 id="about-title" v-reveal class="max-w-[28ch]">
          Répondre à l’ensemble des besoins des promoteurs
        </h2>

        <div class="mt-10 grid gap-10 lg:mt-14 lg:grid-cols-12 lg:items-end lg:gap-14">
          <div v-reveal class="lg:col-span-8">
            <div class="relative aspect-video overflow-hidden bg-ink">
              <iframe
                v-if="videoPlaying"
                ref="videoFrame"
                class="absolute inset-0 size-full"
                :src="`https://www.youtube-nocookie.com/embed/${site.youtubeId}?autoplay=1&rel=0`"
                title="Présentation d’ADI en vidéo"
                allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
                allowfullscreen
                referrerpolicy="strict-origin-when-cross-origin"
              ></iframe>
              <button
                v-else
                type="button"
                class="group absolute inset-0 block size-full"
                aria-label="Lire la vidéo de présentation d’ADI"
                @click="playVideo"
              >
                <img
                  src="/images/temoin/20230313_113640.jpg"
                  alt=""
                  loading="lazy"
                  decoding="async"
                  class="size-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.03]"
                />
                <span class="absolute inset-0 bg-ink/20" aria-hidden="true"></span>
                <span class="absolute inset-0 flex items-center justify-center" aria-hidden="true">
                  <span
                    class="flex size-16 items-center justify-center rounded-full bg-accent text-paper transition-transform duration-300 group-hover:scale-110 sm:size-20"
                  >
                    <svg viewBox="0 0 24 24" class="ml-1 size-7" fill="currentColor">
                      <path d="M8 5.5v13a1 1 0 0 0 1.5.86l10.5-6.5a1 1 0 0 0 0-1.72L9.5 4.64A1 1 0 0 0 8 5.5Z" />
                    </svg>
                  </span>
                </span>
                <span
                  class="absolute bottom-4 left-4 rounded-sm bg-paper px-3 py-1.5 text-sm font-medium text-ink"
                  aria-hidden="true"
                >
                  Voir la vidéo
                </span>
              </button>
            </div>
          </div>

          <div v-reveal="150" class="lg:col-span-4">
            <p class="text-ink-soft">
              Dotés d’une équipe réactive et rigoureuse, la demande de nos clients est toujours
              respectée.
            </p>
            <p class="mt-4 text-ink-soft">
              N’hésitez pas à nous contacter, notre équipe se tient à votre disposition pour vous
              proposer des solutions adaptées, sur-mesure et novatrices pour tous vos projets
              immobiliers.
            </p>
            <div class="mt-7">
              <RouterLink to="/contact" class="btn btn-ghost">Nous contacter</RouterLink>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="border-t border-line py-20 lg:py-28" aria-labelledby="values-title">
      <div class="shell">
        <SectionHeading id="values-title" title="Ce qui guide notre travail au quotidien" />
        <div class="mt-12 lg:mt-16">
          <FeatureList :items="values" :columns="4" />
        </div>
      </div>
    </section>

    <CtaBand />
  </div>
</template>

<style scoped>
.hero-photo {
  animation: hero-settle 2s var(--ease-out-expo) both;
}
@keyframes hero-settle {
  from {
    transform: scale(1.04);
  }
  to {
    transform: scale(1);
  }
}
@media (prefers-reduced-motion: reduce) {
  .hero-photo {
    animation: none;
  }
}
</style>
