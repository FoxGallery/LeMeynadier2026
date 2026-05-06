<script setup lang="ts">
import { ArrowUpRight, Clock, MapPin, Phone } from 'lucide-vue-next'

const { t } = useI18n()
const localePath = useLocalePath()
const venue = useVenue()

const directionsHref = `geo:${venue.geo.lat},${venue.geo.lng}?q=${encodeURIComponent(`${venue.name} ${venue.address.street}, ${venue.address.postalCode} ${venue.address.locality}`)}`

// Lazy-mount de la mini-map MapLibre uniquement quand elle entre dans le
// viewport (économie bundle + tuiles).
const mapMounted = ref(false)
const mapTrigger = ref<HTMLElement | null>(null)

if (import.meta.client) {
  onMounted(() => {
    if (!mapTrigger.value || typeof IntersectionObserver === 'undefined') {
      mapMounted.value = true
      return
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          mapMounted.value = true
          io.disconnect()
        }
      },
      { rootMargin: '200px' },
    )
    io.observe(mapTrigger.value)
    onBeforeUnmount(() => io.disconnect())
  })
}
</script>

<template>
  <section
    aria-labelledby="practical-title"
    class="relative overflow-hidden bg-walnut-100 py-16 sm:py-24 lg:py-32"
  >
    <WoodGrain :opacity="0.10" :color="'#3f2d1a'" />

    <div class="relative mx-auto max-w-6xl px-6">
      <SectionLabel
        number="06"
        :kicker="t('home.practical.kicker')"
        :title="t('home.practical.title')"
        :tagline="t('home.practical.tagline')"
      />

      <div v-reveal:children="{ y: 32, stagger: 0.15, duration: 1 }" class="mt-12 grid gap-10 sm:mt-16 sm:gap-12 lg:mt-20 lg:grid-cols-2 lg:gap-20">
        <!-- Vraie mini-map MapLibre cliquable vers /contact -->
        <NuxtLink
          :to="localePath('/contact')"
          class="group relative block aspect-[16/11] overflow-hidden rounded-(--radius-card) ring-1 ring-walnut-300 shadow-(--shadow-deep) focus-visible:outline-2 focus-visible:outline-brass-500 focus-visible:outline-offset-4"
          :aria-label="t('home.practical.viewMap')"
        >
          <div ref="mapTrigger" class="size-full">
            <ClientOnly>
              <VenueMap
                v-if="mapMounted"
                :lat="venue.geo.lat"
                :lng="venue.geo.lng"
                :marker-label="`${venue.name} — ${venue.address.street}`"
                :zoom="16"
                class="!aspect-auto !size-full !rounded-none !ring-0 !shadow-none pointer-events-none"
              />
              <div
                v-else
                class="flex size-full items-center justify-center bg-walnut-200 text-xs uppercase tracking-widest text-walnut-600"
                aria-hidden="true"
              >
                {{ t('common.loading') }}
              </div>
              <template #fallback>
                <div class="size-full bg-walnut-200" aria-hidden="true" />
              </template>
            </ClientOnly>
          </div>

          <!-- Badge bottom : voir le plan -->
          <div
            aria-hidden="true"
            class="pointer-events-none absolute inset-x-4 bottom-4 z-10 flex items-center justify-between rounded-(--radius-pill) bg-walnut-900/90 px-5 py-3 text-cream-50 backdrop-blur-sm"
          >
            <div>
              <p class="text-xs uppercase tracking-[0.3em] text-brass-300">{{ t('home.practical.viewMap') }}</p>
              <p class="font-display text-sm">{{ venue.address.locality }} · {{ venue.address.postalCode }}</p>
            </div>
            <ArrowUpRight class="size-5 text-brass-300 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
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
            <p
              v-if="venue.locatedIn"
              class="mt-1 text-xs italic text-walnut-600"
            >
              {{ t('common.locatedIn') }} <span class="not-italic font-medium text-walnut-800">{{ venue.locatedIn }}</span>
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
            <p class="text-walnut-700">{{ t('common.hoursLabel') }}</p>
            <p
              v-if="venue.amenities.includes('terrace')"
              class="mt-3 inline-flex items-center gap-1.5 rounded-full border border-leaf/50 bg-cream-50 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.2em] text-walnut-900"
            >
              <span aria-hidden="true">·</span>
              {{ t('common.amenityTerrace') }}
            </p>
          </div>

          <div class="border-l-2 border-brass-500 pl-6">
            <p class="text-xs uppercase tracking-[0.3em] text-brass-700">
              <Phone class="mr-1 inline-block size-3.5 -mt-0.5" aria-hidden="true" />
              {{ t('home.practical.phone') }}
            </p>
            <p class="mt-2 font-display text-3xl text-walnut-900">
              <a
                v-if="venue.telephoneHref"
                :href="venue.telephoneHref"
                class="hover:text-brass-700"
              >
                {{ venue.telephone }}
              </a>
              <span v-else>{{ venue.telephone }}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
