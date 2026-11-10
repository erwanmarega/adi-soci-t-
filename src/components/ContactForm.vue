<script setup lang="ts">
import { nextTick, ref, watch } from "vue";
import {
  contactLimits,
  useContactForm,
  type ContactField,
} from "@/composables/useContactForm";
import { site } from "@/data/site";

interface ServiceOption {
  value: string;
  label: string;
}

const props = defineProps<{
  services: ServiceOption[];
  initialService?: string;
}>();

const { values, errors, status, isSending, isConfigured, clearError, submit } =
  useContactForm({
    serviceLabel: (value) =>
      props.services.find((s) => s.value === value)?.label ?? "",
  });

const formRef = ref<HTMLFormElement | null>(null);
const announce = ref<HTMLElement | null>(null);

watch(
  () => props.initialService,
  (value) => {
    if (value && !values.service) values.service = value;
  },
  { immediate: true }
);

const errorSummary = ref("");

async function onSubmit() {
  errorSummary.value = "";
  const firstInvalid: ContactField | null = await submit();
  if (firstInvalid) {
    const count = Object.keys(errors).length;
    errorSummary.value =
      count > 1
        ? `Le formulaire contient ${count} erreurs. Merci de les corriger.`
        : "Le formulaire contient une erreur. Merci de la corriger.";
    await nextTick();
    formRef.value
      ?.querySelector<HTMLElement>(`#contact-${firstInvalid}`)
      ?.focus();
    return;
  }
  if (
    status.value === "success" ||
    status.value === "unavailable" ||
    status.value === "error"
  ) {
    await nextTick();
    announce.value?.focus();
  }
}

const field =
  "block w-full border-0 border-b border-ink/30 bg-transparent px-0 py-3 text-base text-ink placeholder:text-ink/35 transition-colors duration-300 focus:border-accent focus:outline-none focus-visible:outline-none aria-[invalid=true]:border-accent-deep";
const label = "mb-1 block text-sm font-medium text-ink";
const errorText = "mt-2 text-sm font-medium text-accent-deep";
</script>

<template>
  <form ref="formRef" novalidate class="space-y-9" @submit.prevent="onSubmit">
    <p
      v-if="!isConfigured"
      class="border border-ink/20 bg-paper-deep px-2 py-4 text-sm text-ink-soft"
    >
      L’envoi en ligne n’est pas encore activé sur ce site. Pour une demande de
      devis, appelez-nous au
      <a :href="site.phoneHref" class="link font-medium text-ink">
        {{ site.phoneDisplay }}
      </a>
      .
    </p>

    <p class="text-sm text-slate">
      Les champs marqués d’un astérisque (*) sont obligatoires.
    </p>

    <div class="grid gap-x-10 gap-y-9 sm:grid-cols-2">
      <div>
        <label for="contact-name" :class="label"
          >Nom <span aria-hidden="true">*</span></label
        >
        <input
          id="contact-name"
          v-model="values.name"
          type="text"
          name="name"
          autocomplete="name"
          required
          aria-required="true"
          :maxlength="contactLimits.name"
          :aria-invalid="errors.name ? 'true' : 'false'"
          :aria-describedby="errors.name ? 'contact-name-error' : undefined"
          :class="field"
          @input="clearError('name')"
        />
        <p v-if="errors.name" id="contact-name-error" :class="errorText">
          {{ errors.name }}
        </p>
      </div>

      <div>
        <label for="contact-company" :class="label">Société</label>
        <input
          id="contact-company"
          v-model="values.company"
          type="text"
          name="company"
          autocomplete="organization"
          :maxlength="contactLimits.company"
          :class="field"
        />
      </div>

      <div>
        <label for="contact-email" :class="label"
          >E-mail <span aria-hidden="true">*</span></label
        >
        <input
          id="contact-email"
          v-model="values.email"
          type="email"
          name="email"
          autocomplete="email"
          inputmode="email"
          required
          aria-required="true"
          :maxlength="contactLimits.email"
          :aria-invalid="errors.email ? 'true' : 'false'"
          :aria-describedby="errors.email ? 'contact-email-error' : undefined"
          :class="field"
          @input="clearError('email')"
        />
        <p v-if="errors.email" id="contact-email-error" :class="errorText">
          {{ errors.email }}
        </p>
      </div>

      <div>
        <label for="contact-phone" :class="label">Téléphone</label>
        <input
          id="contact-phone"
          v-model="values.phone"
          type="tel"
          name="phone"
          autocomplete="tel"
          inputmode="tel"
          :maxlength="contactLimits.phone"
          :aria-invalid="errors.phone ? 'true' : 'false'"
          :aria-describedby="errors.phone ? 'contact-phone-error' : undefined"
          :class="field"
          @input="clearError('phone')"
        />
        <p v-if="errors.phone" id="contact-phone-error" :class="errorText">
          {{ errors.phone }}
        </p>
      </div>
    </div>

    <div>
      <label for="contact-service" :class="label">Prestation</label>
      <div class="relative">
        <select
          id="contact-service"
          v-model="values.service"
          name="service"
          :class="[field, 'cursor-pointer appearance-none pr-8']"
        >
          <option value="">Sélectionnez une prestation</option>
          <option
            v-for="option in services"
            :key="option.value"
            :value="option.value"
          >
            {{ option.label }}
          </option>
        </select>
        <svg
          viewBox="0 0 24 24"
          class="pointer-events-none absolute top-1/2 right-0 size-5 -translate-y-1/2 text-ink"
          fill="none"
          stroke="currentColor"
          stroke-width="1.6"
          aria-hidden="true"
        >
          <path
            d="M6 9l6 6 6-6"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </div>
    </div>

    <div>
      <label for="contact-message" :class="label"
        >Message <span aria-hidden="true">*</span></label
      >
      <textarea
        id="contact-message"
        v-model="values.message"
        name="message"
        rows="5"
        required
        aria-required="true"
        :maxlength="contactLimits.message"
        :aria-invalid="errors.message ? 'true' : 'false'"
        :aria-describedby="errors.message ? 'contact-message-error' : undefined"
        :class="[field, 'resize-y']"
        @input="clearError('message')"
      ></textarea>
      <p v-if="errors.message" id="contact-message-error" :class="errorText">
        {{ errors.message }}
      </p>
    </div>

    <!-- Honeypot: hidden from users and assistive technology. -->
    <div
      class="absolute -left-[9999px] h-0 w-0 overflow-hidden"
      aria-hidden="true"
    >
      <label for="contact-website">Ne pas remplir ce champ</label>
      <input
        id="contact-website"
        v-model="values.website"
        type="text"
        name="website"
        tabindex="-1"
        autocomplete="off"
      />
    </div>

    <div>
      <div class="flex items-start gap-4">
        <input
          id="contact-consent"
          v-model="values.consent"
          type="checkbox"
          name="consent"
          required
          aria-required="true"
          :aria-invalid="errors.consent ? 'true' : 'false'"
          :aria-describedby="
            errors.consent ? 'contact-consent-error' : undefined
          "
          class="mt-1 size-5 shrink-0 cursor-pointer accent-accent"
          @change="clearError('consent')"
        />
        <label for="contact-consent" class="cursor-pointer text-ink-soft">
          J’accepte que mes données soient utilisées pour traiter ma demande.
          <span aria-hidden="true">*</span>
        </label>
      </div>
      <p v-if="errors.consent" id="contact-consent-error" :class="errorText">
        {{ errors.consent }}
      </p>
    </div>

    <div class="flex flex-wrap items-center gap-x-8 gap-y-4">
      <button
        type="submit"
        class="btn btn-primary disabled:cursor-wait disabled:opacity-70"
        :disabled="isSending"
      >
        {{ isSending ? "Envoi en cours…" : "Envoyer ma demande" }}
      </button>
    </div>

    <!-- Announcements (live regions stay in the DOM so updates are read out). -->
    <div
      aria-live="assertive"
      role="alert"
      class="text-sm font-medium text-accent-deep empty:hidden"
    >
      {{ errorSummary }}
    </div>
    <div
      ref="announce"
      tabindex="-1"
      aria-live="polite"
      role="status"
      class="focus:outline-none empty:hidden"
    >
      <p
        v-if="status === 'success'"
        class="border border-ink/20 bg-paper-deep px-5 py-4 text-ink"
      >
        Merci, votre demande a bien été envoyée. Nous revenons vers vous
        rapidement.
      </p>
      <p
        v-else-if="status === 'error'"
        class="border border-accent-deep/40 bg-paper-deep px-5 py-4 text-ink"
      >
        Votre demande n’a pas pu être envoyée. Vous pouvez réessayer ou nous
        appeler au
        <a :href="site.phoneHref" class="link font-medium">
          {{ site.phoneDisplay }}
        </a>
        .
      </p>
      <p
        v-else-if="status === 'unavailable'"
        class="border border-ink/20 bg-paper-deep px-5 py-4 text-ink"
      >
        Votre demande n’a pas été envoyée : l’envoi en ligne n’est pas encore
        configuré. Merci de nous appeler au
        <a :href="site.phoneHref" class="link font-medium">
          {{ site.phoneDisplay }}
        </a>
        .
      </p>
    </div>
  </form>
</template>
