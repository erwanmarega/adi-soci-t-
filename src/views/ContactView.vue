<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";
import ContactForm from "@/components/ContactForm.vue";
import PageHero from "@/components/PageHero.vue";
import { services, site } from "@/data/site";

const route = useRoute();

const serviceOptions = [
  ...services.map((s) => ({ value: s.slug, label: s.title })),
  { value: "autre", label: "Autre" },
];

const initialService = computed(() => {
  const raw = route.query.service;
  const slug = Array.isArray(raw) ? raw[0] : raw;
  return serviceOptions.find((option) => option.value === slug)?.value;
});

const promises = [
  {
    title: "Réactivité",
    text: "Notre équipe relève les défis lancés au quotidien.",
  },
  {
    title: "Ponctualité",
    text: "Nous respectons les délais fixés par nos clients liés aux lancements de nouveaux programmes.",
  },
];
</script>

<template>
  <div>
    <PageHero
      eyebrow="Contact"
      title="Parlons de votre programme"
      lead="Un projet de bureau de vente, de logement témoin, de signalétique ou de mobilier ? Appelez-nous ou envoyez-nous votre demande de devis."
      image="/images/temoin/20230313_112719.jpg"
      image-alt="Salon d’un appartement témoin décoré, canapé, fauteuil et buffets en bois clair"
    />

    <section class="pt-2 pb-20 lg:pb-28" aria-labelledby="contact-title">
      <div
        class="shell grid gap-14 border-t border-line pt-12 lg:grid-cols-12 lg:gap-20 lg:pt-16"
      >
        <div class="lg:col-span-5">
          <div class="lg:sticky lg:top-32">
            <h2 id="contact-title" v-reveal>Contact direct</h2>

            <a
              v-reveal="80"
              :href="site.phoneHref"
              class="link mt-6 block font-display text-[clamp(2.2rem,4vw,3.2rem)] leading-none font-medium"
              :aria-label="`Appeler ADI au ${site.phoneDisplay}`"
            >
              {{ site.phoneDisplay }}
            </a>

            <p v-reveal="140" class="mt-8 max-w-[40ch] text-ink-soft">
              Notre équipe se tient à votre disposition pour vous proposer des
              solutions adaptées, sur-mesure et novatrices.
            </p>

            <p v-reveal="200" class="mt-6">
              <a
                :href="site.instagram"
                target="_blank"
                rel="noopener noreferrer"
                class="link inline-flex items-center gap-2 font-medium"
              >
                LinkedIn @adisociete
                <span class="sr-only">(s’ouvre dans un nouvel onglet)</span>
                <svg
                  viewBox="0 0 24 24"
                  class="size-4"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.8"
                  aria-hidden="true"
                >
                  <path
                    d="M7 17L17 7M9 7h8v8"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </a>
            </p>

            <ul class="mt-12 space-y-5 border-t border-line pt-6">
              <li
                v-for="(item, i) in promises"
                :key="item.title"
                v-reveal="i * 100"
              >
                <p class="font-display text-xl font-medium">{{ item.title }}</p>
                <p class="mt-1 max-w-[40ch] text-ink-soft">{{ item.text }}</p>
              </li>
            </ul>
          </div>
        </div>

        <!-- Quote form -->
        <div class="lg:col-span-7">
          <div v-reveal>
            <h2>Demander un devis</h2>
            <div class="mt-8">
              <ContactForm
                :services="serviceOptions"
                :initial-service="initialService"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
