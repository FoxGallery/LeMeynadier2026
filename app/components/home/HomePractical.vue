<script setup lang="ts">
import { Clock, MapPin, Phone } from 'lucide-vue-next'
</script>

<template>
  <section
    aria-labelledby="practical-title"
    class="relative bg-walnut-50 py-28 text-walnut-800"
  >
    <div class="mx-auto max-w-6xl px-6">
      <header class="text-center">
        <p class="font-script text-2xl text-brass-700">Infos</p>
        <h2 id="practical-title" class="mt-1 font-display text-4xl text-walnut-900 sm:text-5xl">
          Pratiques
        </h2>
        <GoldDivider class="mt-6 text-brass-700" />
      </header>

      <dl class="mt-16 grid gap-8 md:grid-cols-3">
        <div class="flex flex-col items-center text-center">
          <span
            class="inline-flex size-14 items-center justify-center rounded-full border border-brass-400/50 bg-cream-50 text-brass-700 shadow-(--shadow-paper)"
            aria-hidden="true"
          >
            <MapPin class="size-6" />
          </span>
          <dt class="mt-5 font-display text-xl text-walnut-900">Adresse</dt>
          <dd class="mt-2 text-walnut-700">
            Rue Meynadier<br>
            06400 Cannes, France
          </dd>
        </div>

        <div class="flex flex-col items-center text-center">
          <span
            class="inline-flex size-14 items-center justify-center rounded-full border border-brass-400/50 bg-cream-50 text-brass-700 shadow-(--shadow-paper)"
            aria-hidden="true"
          >
            <Clock class="size-6" />
          </span>
          <dt class="mt-5 font-display text-xl text-walnut-900">Horaires</dt>
          <dd class="mt-2 text-walnut-700">
            Tous les jours<br>
            de 8h à 23h
            <span class="block text-xs text-walnut-500">(à confirmer)</span>
          </dd>
        </div>

        <div class="flex flex-col items-center text-center">
          <span
            class="inline-flex size-14 items-center justify-center rounded-full border border-brass-400/50 bg-cream-50 text-brass-700 shadow-(--shadow-paper)"
            aria-hidden="true"
          >
            <Phone class="size-6" />
          </span>
          <dt class="mt-5 font-display text-xl text-walnut-900">Téléphone</dt>
          <dd class="mt-2">
            <a
              href="tel:+33000000000"
              class="text-walnut-900 underline-offset-4 hover:text-brass-700 hover:underline"
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
