<script setup lang="ts">
import { ArrowUpRight, Clock, MapPin, Phone } from 'lucide-vue-next'

const { t } = useI18n()
const localePath = useLocalePath()
const venue = useVenue()

const directionsHref = `geo:${venue.geo.lat},${venue.geo.lng}?q=${encodeURIComponent(`${venue.name} ${venue.address.street}, ${venue.address.postalCode} ${venue.address.locality}`)}`
</script>

<template>
  <section
    aria-labelledby="practical-title"
    class="relative overflow-hidden bg-walnut-100 py-32"
  >
    <WoodGrain :opacity="0.10" :color="'#3f2d1a'" />

    <div class="relative mx-auto max-w-6xl px-6">
      <SectionLabel
        number="06"
        :kicker="t('home.practical.kicker')"
        :title="t('home.practical.title')"
        :tagline="t('home.practical.tagline')"
      />

      <div v-reveal:children="{ y: 32, stagger: 0.15, duration: 1 }" class="mt-20 grid gap-12 lg:grid-cols-2 lg:gap-20">
        <!-- Aperçu carte (cliquable vers Contact) -->
        <NuxtLink
          :to="localePath('/contact')"
          class="group relative block aspect-[16/11] overflow-hidden rounded-(--radius-card) ring-1 ring-walnut-300 shadow-(--shadow-deep) focus-visible:outline-2 focus-visible:outline-brass-500 focus-visible:outline-offset-4"
          :aria-label="t('home.practical.viewMap')"
        >
          <!-- Mini-map illustrée (placeholder décoratif élégant) -->
          <svg
            class="size-full"
            viewBox="0 0 800 550"
            preserveAspectRatio="xMidYMid slice"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="map-bg" x1="0" x2="1" y1="0" y2="1">
                <stop offset="0%" stop-color="#f1e3c0" />
                <stop offset="100%" stop-color="#ddc59a" />
              </linearGradient>
            </defs>
            <rect width="800" height="550" fill="url(#map-bg)" />
            <!-- Quadrillage subtil rues -->
            <g stroke="#a07f4d" stroke-width="0.6" opacity="0.35">
              <path d="M0 100 L800 70" />
              <path d="M0 200 L800 220" />
              <path d="M0 320 L800 290" />
              <path d="M0 430 L800 460" />
              <path d="M120 0 L100 550" />
              <path d="M280 0 L300 550" />
              <path d="M440 0 L460 550" />
              <path d="M620 0 L600 550" />
            </g>
            <!-- Une rue principale plus marquée (la rue Meynadier) -->
            <path
              d="M0 280 Q200 270 400 275 T800 290"
              fill="none"
              stroke="#7a5a33"
              stroke-width="6"
              stroke-linecap="round"
            />
            <text x="20" y="265" fill="#3f2d1a" font-family="Cormorant Garamond, serif" font-size="18" font-style="italic">rue Meynadier</text>
            <!-- Quelques bâtiments -->
            <g fill="#c5a370" opacity="0.5">
              <rect x="100" y="180" width="80" height="60" rx="2" />
              <rect x="220" y="200" width="60" height="50" rx="2" />
              <rect x="340" y="170" width="100" height="75" rx="2" />
              <rect x="500" y="190" width="70" height="65" rx="2" />
              <rect x="620" y="180" width="90" height="60" rx="2" />
              <rect x="100" y="320" width="120" height="60" rx="2" />
              <rect x="280" y="330" width="80" height="55" rx="2" />
              <rect x="420" y="320" width="100" height="65" rx="2" />
              <rect x="580" y="330" width="120" height="55" rx="2" />
            </g>
            <!-- Pin Le Meynadier -->
            <g transform="translate(400 270)">
              <circle r="44" fill="rgba(184,138,61,0.18)" />
              <circle r="28" fill="rgba(184,138,61,0.32)" />
              <g transform="translate(-17 -42)">
                <path d="M17 1 C8.7 1 2 7.5 2 15.5 C2 25 17 45 17 45 C17 45 32 25 32 15.5 C32 7.5 25.3 1 17 1 Z" fill="#b88a3d" stroke="#3f2d1a" stroke-width="1.4" />
                <circle cx="17" cy="16" r="6" fill="#fcf5e6" stroke="#3f2d1a" stroke-width="1" />
              </g>
            </g>
          </svg>

          <!-- Badge "Voir le plan" qui apparaît au hover -->
          <div class="absolute inset-x-4 bottom-4 flex items-center justify-between rounded-(--radius-pill) bg-walnut-900/85 px-5 py-3 text-cream-50 backdrop-blur-sm">
            <div>
              <p class="text-xs uppercase tracking-[0.3em] text-brass-300">{{ t('home.practical.viewMap') }}</p>
              <p class="font-display text-sm">{{ venue.address.street }} · Cannes</p>
            </div>
            <ArrowUpRight class="size-5 text-brass-300 transition-transform group-hover:rotate-12" aria-hidden="true" />
          </div>
        </NuxtLink>

        <!-- Bloc infos en colonne -->
        <div class="space-y-8">
          <div class="border-l-2 border-brass-500 pl-6">
            <p class="text-xs uppercase tracking-[0.3em] text-brass-700">
              <MapPin class="mr-1 inline-block size-3.5 -mt-0.5" aria-hidden="true" />
              {{ t('home.practical.address') }}
            </p>
            <p class="mt-2 font-display text-3xl text-walnut-900">
              {{ venue.address.street }}
            </p>
            <p class="text-walnut-700">
              {{ venue.address.postalCode }} {{ venue.address.locality }}, {{ venue.address.country }}
            </p>
            <a
              :href="directionsHref"
              class="mt-3 inline-flex items-center gap-1 text-sm font-medium text-brass-700 hover:text-brass-800 focus-visible:outline-2 focus-visible:outline-brass-500"
            >
              {{ t('common.directions') }}
              <ArrowUpRight class="size-3.5" aria-hidden="true" />
            </a>
          </div>

          <div class="border-l-2 border-brass-500 pl-6">
            <p class="text-xs uppercase tracking-[0.3em] text-brass-700">
              <Clock class="mr-1 inline-block size-3.5 -mt-0.5" aria-hidden="true" />
              {{ t('home.practical.hours') }}
            </p>
            <p class="mt-2 font-display text-3xl text-walnut-900">
              {{ t('common.everyDay') }}
            </p>
            <p class="text-walnut-700">8h00 — 23h00</p>
            <p class="mt-1 text-xs text-walnut-500">({{ t('common.toBeConfirmed') }})</p>
          </div>

          <div class="border-l-2 border-brass-500 pl-6">
            <p class="text-xs uppercase tracking-[0.3em] text-brass-700">
              <Phone class="mr-1 inline-block size-3.5 -mt-0.5" aria-hidden="true" />
              {{ t('home.practical.phone') }}
            </p>
            <p class="mt-2 font-display text-3xl text-walnut-900">
              <span v-if="venue.telephoneHref">
                <a :href="venue.telephoneHref" class="hover:text-brass-700">{{ venue.telephone }}</a>
              </span>
              <span v-else>{{ venue.telephone }}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
