<script setup lang="ts">
import { Clock, MapPin, Phone } from 'lucide-vue-next'
</script>

<template>
  <section
    aria-labelledby="practical-title"
    class="relative bg-walnut-950 py-24"
  >
    <WoodGrain :opacity="0.05" />

    <div class="mx-auto max-w-6xl px-6">
      <header class="text-center">
        <p class="font-script text-2xl text-brass-500">Infos</p>
        <h2 id="practical-title" class="mt-1 font-display text-4xl text-cream sm:text-5xl">
          Pratiques
        </h2>
        <GoldDivider class="mt-6" />
      </header>

      <dl class="mt-16 grid gap-8 md:grid-cols-3">
        <div class="flex flex-col items-center text-center">
          <span
            class="inline-flex size-14 items-center justify-center rounded-full border border-brass-500/40 bg-walnut-900 text-brass-500"
            aria-hidden="true"
          >
            <MapPin class="size-6" />
          </span>
          <dt class="mt-5 font-display text-xl text-cream">Adresse</dt>
          <dd class="mt-2 text-walnut-100/85">
            Rue Meynadier<br>
            06400 Cannes, France
          </dd>
        </div>

        <div class="flex flex-col items-center text-center">
          <span
            class="inline-flex size-14 items-center justify-center rounded-full border border-brass-500/40 bg-walnut-900 text-brass-500"
            aria-hidden="true"
          >
            <Clock class="size-6" />
          </span>
          <dt class="mt-5 font-display text-xl text-cream">Horaires</dt>
          <dd class="mt-2 text-walnut-100/85">
            Tous les jours<br>
            de 8h à 23h
            <span class="block text-xs text-walnut-300">(à confirmer)</span>
          </dd>
        </div>

        <div class="flex flex-col items-center text-center">
          <span
            class="inline-flex size-14 items-center justify-center rounded-full border border-brass-500/40 bg-walnut-900 text-brass-500"
            aria-hidden="true"
          >
            <Phone class="size-6" />
          </span>
          <dt class="mt-5 font-display text-xl text-cream">Téléphone</dt>
          <dd class="mt-2">
            <a
              href="tel:+33000000000"
              class="text-walnut-100 underline-offset-4 hover:text-brass-300 hover:underline"
            >
              À venir
            </a>
          </dd>
        </div>
      </dl>

      <div class="mt-16 text-center">
        <UiButton variant="outline" to="/contact">
          Voir la carte interactive
        </UiButton>
      </div>
    </div>
  </section>
</template>
