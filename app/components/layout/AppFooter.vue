<script setup lang="ts">
import { Clock, Facebook, Instagram, MapPin, Phone } from 'lucide-vue-next'

const venue = useVenue()
const links = useNavLinks()
const { t } = useI18n()
const year = new Date().getFullYear()
</script>

<template>
  <footer class="relative overflow-hidden bg-walnut-900 text-cream-100/85">
    <div
      aria-hidden="true"
      class="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brass-500/50 to-transparent"
    />
    <WoodGrain :opacity="0.08" :color="'#0d0905'" />

    <div class="relative mx-auto max-w-6xl px-6 py-12">
      <div class="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
        <div class="flex items-center gap-4">
          <Monogram :size="36" class="text-brass-400" />
          <div class="flex items-baseline gap-1.5 leading-none">
            <span class="font-script text-xl text-brass-300">Le</span>
            <span class="font-display text-xl tracking-tight text-cream-50">Meynadier</span>
          </div>
          <span class="hidden h-4 w-px bg-cream-100/20 sm:block" aria-hidden="true" />
          <span class="hidden text-[11px] uppercase tracking-[0.22em] text-cream-100/60 sm:inline">
            {{ t('site.tagline') }}
          </span>
        </div>

        <nav :aria-label="t('common.footerNavLabel')" class="flex flex-wrap items-center gap-x-7 gap-y-2">
          <NuxtLinkLocale
            v-for="link in links"
            :key="link.to"
            :to="link.to"
            class="text-[11px] uppercase tracking-[0.22em] text-cream-100/85 transition-colors hover:text-brass-300 focus-visible:outline-2 focus-visible:outline-brass-400 focus-visible:outline-offset-4"
          >
            {{ t(link.i18nKey) }}
          </NuxtLinkLocale>
        </nav>
      </div>

      <div class="my-8 h-px bg-cream-100/10" aria-hidden="true" />

      <div class="flex flex-col gap-6 text-sm lg:flex-row lg:items-start lg:justify-between">
        <ul class="flex flex-col gap-x-10 gap-y-3 sm:flex-row sm:flex-wrap">
          <li class="flex items-start gap-2">
            <MapPin class="mt-0.5 size-4 shrink-0 text-brass-400" aria-hidden="true" />
            <span class="leading-relaxed">
              {{ venue.address.street }}, {{ venue.address.postalCode }} {{ venue.address.locality }}
            </span>
          </li>
          <li class="flex items-start gap-2">
            <Clock class="mt-0.5 size-4 shrink-0 text-brass-400" aria-hidden="true" />
            <span class="leading-relaxed">
              {{ t('common.hoursLabel') }}
            </span>
          </li>
          <li class="flex items-start gap-2">
            <Phone class="mt-0.5 size-4 shrink-0 text-brass-400" aria-hidden="true" />
            <a
              v-if="venue.telephoneHref"
              :href="venue.telephoneHref"
              class="leading-relaxed text-cream-50 hover:text-brass-300"
            >
              {{ venue.telephone }}
            </a>
            <span v-else class="leading-relaxed">{{ venue.telephone }}</span>
          </li>
        </ul>

        <div class="flex shrink-0 items-center gap-2">
          <a
            href="#"
            :aria-label="t('common.instagramAria')"
            class="inline-flex size-9 items-center justify-center rounded-full border border-cream-100/20 text-cream-100/80 transition-colors hover:border-brass-400 hover:bg-brass-500 hover:text-walnut-950 focus-visible:outline-2 focus-visible:outline-brass-400"
            rel="me"
          >
            <Instagram class="size-3.5" aria-hidden="true" />
          </a>
          <a
            href="#"
            :aria-label="t('common.facebookAria')"
            class="inline-flex size-9 items-center justify-center rounded-full border border-cream-100/20 text-cream-100/80 transition-colors hover:border-brass-400 hover:bg-brass-500 hover:text-walnut-950 focus-visible:outline-2 focus-visible:outline-brass-400"
            rel="me"
          >
            <Facebook class="size-3.5" aria-hidden="true" />
          </a>
        </div>
      </div>
    </div>

    <div class="relative border-t border-cream-100/10">
      <div
        class="mx-auto flex max-w-6xl flex-col items-center gap-2 px-6 py-4 text-center text-[11px] tracking-wide text-cream-100/65 sm:flex-row sm:justify-between"
      >
        <p>© {{ year }} Le Meynadier · Cannes · {{ t('common.allRightsReserved') }}.</p>
        <ul class="flex items-center gap-x-5">
          <li>
            <NuxtLinkLocale
              to="/mentions-legales"
              class="inline-block py-1.5 hover:text-brass-300 hover:underline focus-visible:outline-2 focus-visible:outline-brass-400"
            >
              {{ t('common.legal') }}
            </NuxtLinkLocale>
          </li>
          <li aria-hidden="true">·</li>
          <li>
            <NuxtLinkLocale
              to="/confidentialite"
              class="inline-block py-1.5 hover:text-brass-300 hover:underline focus-visible:outline-2 focus-visible:outline-brass-400"
            >
              {{ t('common.privacy') }}
            </NuxtLinkLocale>
          </li>
        </ul>
      </div>
    </div>
  </footer>
</template>
