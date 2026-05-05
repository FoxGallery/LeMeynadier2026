<script setup lang="ts">
import { Clock, Facebook, Instagram, MapPin, Phone } from 'lucide-vue-next'

const links = useNavLinks()
const year = new Date().getFullYear()
</script>

<template>
  <footer class="relative mt-24 border-t border-walnut-800 bg-walnut-950 text-cream/80">
    <WoodGrain :opacity="0.05" />

    <div class="mx-auto grid max-w-6xl gap-12 px-6 py-16 sm:grid-cols-2 lg:grid-cols-4">
      <!-- Brand -->
      <div class="space-y-3">
        <p class="font-script text-2xl text-brass-500">Le</p>
        <p class="-mt-1 font-display text-3xl text-cream">Meynadier</p>
        <GoldDivider size="sm" ornament="dot" class="!ml-0" />
        <p class="text-sm leading-relaxed text-walnut-100/70">
          Brasserie · Pizzeria · Pub.<br>Au cœur de Cannes.
        </p>
      </div>

      <!-- Coordonnées -->
      <div class="space-y-4">
        <h2 class="font-display text-lg uppercase tracking-widest text-brass-300">
          Nous trouver
        </h2>
        <ul class="space-y-3 text-sm">
          <li class="flex gap-2">
            <MapPin class="mt-0.5 size-4 shrink-0 text-brass-500" aria-hidden="true" />
            <span>
              Rue Meynadier<br>06400 Cannes, France
            </span>
          </li>
          <li class="flex items-center gap-2">
            <Phone class="size-4 shrink-0 text-brass-500" aria-hidden="true" />
            <a
              href="tel:+33000000000"
              class="text-cream transition-colors hover:text-brass-300"
            >
              À venir
            </a>
          </li>
          <li class="flex items-start gap-2">
            <Clock class="mt-0.5 size-4 shrink-0 text-brass-500" aria-hidden="true" />
            <span>
              Tous les jours<br>de 8h à 23h
              <span class="block text-xs text-walnut-300">(horaires à confirmer)</span>
            </span>
          </li>
        </ul>
      </div>

      <!-- Navigation -->
      <nav aria-label="Navigation pied de page" class="space-y-4">
        <h2 class="font-display text-lg uppercase tracking-widest text-brass-300">
          Découvrir
        </h2>
        <ul class="space-y-2 text-sm">
          <li v-for="link in links" :key="link.to">
            <NuxtLink
              :to="link.to"
              class="text-cream/85 transition-colors hover:text-brass-300 focus-visible:outline-2 focus-visible:outline-brass-500"
            >
              {{ link.label }}
            </NuxtLink>
          </li>
        </ul>
      </nav>

      <!-- Réseaux + légal -->
      <div class="space-y-4">
        <h2 class="font-display text-lg uppercase tracking-widest text-brass-300">
          Suivez-nous
        </h2>
        <div class="flex items-center gap-3">
          <a
            href="#"
            aria-label="Instagram (à venir)"
            class="inline-flex size-10 items-center justify-center rounded-full border border-walnut-700 text-cream/80 transition-colors hover:border-brass-500 hover:text-brass-300 focus-visible:outline-2 focus-visible:outline-brass-500"
            rel="me"
          >
            <Instagram class="size-4" aria-hidden="true" />
          </a>
          <a
            href="#"
            aria-label="Facebook (à venir)"
            class="inline-flex size-10 items-center justify-center rounded-full border border-walnut-700 text-cream/80 transition-colors hover:border-brass-500 hover:text-brass-300 focus-visible:outline-2 focus-visible:outline-brass-500"
            rel="me"
          >
            <Facebook class="size-4" aria-hidden="true" />
          </a>
        </div>

        <div class="pt-4">
          <ul class="space-y-1 text-xs text-walnut-100/60">
            <li>
              <NuxtLink
                to="/mentions-legales"
                class="inline-block py-1.5 hover:text-brass-300 hover:underline focus-visible:outline-2 focus-visible:outline-brass-500"
              >
                Mentions légales
              </NuxtLink>
            </li>
            <li>
              <NuxtLink
                to="/confidentialite"
                class="inline-block py-1.5 hover:text-brass-300 hover:underline focus-visible:outline-2 focus-visible:outline-brass-500"
              >
                Confidentialité
              </NuxtLink>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div class="border-t border-walnut-800">
      <div
        class="mx-auto flex max-w-6xl flex-col items-center gap-2 px-6 py-6 text-center text-xs text-walnut-100/60 sm:flex-row sm:justify-between"
      >
        <p>© {{ year }} Le Meynadier — Cannes. Tous droits réservés.</p>
        <p>Site sans cookie publicitaire.</p>
      </div>
    </div>
  </footer>
</template>
