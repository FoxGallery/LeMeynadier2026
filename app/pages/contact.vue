<script setup lang="ts">
import { Clock, ExternalLink, MapPin, Phone } from 'lucide-vue-next'

const venue = useVenue()
const jsonLd = venueJsonLd(venue)

useHead({
  title: 'Nous trouver',
  meta: [
    {
      name: 'description',
      content: `Le Meynadier · ${venue.address.street}, ${venue.address.postalCode} ${venue.address.locality}. ${venue.hoursLabel}.`,
    },
  ],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify(jsonLd),
    },
  ],
})

// Lazy-mount de la carte au scroll pour ne pas charger MapLibre + tuiles
// si l'utilisateur ne descend pas jusqu'à elle (cf. cahier des charges §6.1).
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

const directionsHref = computed(
  () =>
    `geo:${venue.geo.lat},${venue.geo.lng}?q=${encodeURIComponent(`${venue.name} ${venue.address.street}, ${venue.address.postalCode} ${venue.address.locality}`)}`,
)

// OpenStreetMap fallback link (universel, pas de Google).
const osmHref = computed(
  () =>
    `https://www.openstreetmap.org/?mlat=${venue.geo.lat}&mlon=${venue.geo.lng}#map=18/${venue.geo.lat}/${venue.geo.lng}`,
)

const dayLabels: Record<string, string> = {
  Mo: 'Lundi',
  Tu: 'Mardi',
  We: 'Mercredi',
  Th: 'Jeudi',
  Fr: 'Vendredi',
  Sa: 'Samedi',
  Su: 'Dimanche',
}

function formatDayRange(days: string[]) {
  if (days.length === 7) return 'Tous les jours'
  return days.map((d) => dayLabels[d] ?? d).join(' · ')
}
</script>

<template>
  <article class="bg-walnut-50 text-walnut-800">
    <!-- Hero éditorial sobre -->
    <section class="bg-cream-100 pb-16 pt-32">
      <div class="mx-auto max-w-3xl px-6 text-center">
        <p class="font-script text-3xl text-brass-700">Nous</p>
        <h1 class="mt-2 font-display text-5xl text-walnut-900 sm:text-6xl">
          Trouver
        </h1>
        <GoldDivider class="mt-6 text-brass-600" />
        <p class="mx-auto mt-6 max-w-xl text-walnut-700">
          {{ venue.address.street }}, {{ venue.address.postalCode }}
          {{ venue.address.locality }} — au cœur du vieux Cannes, à deux pas du marché Forville.
        </p>
      </div>
    </section>

    <!-- Coordonnées -->
    <section class="py-16">
      <div class="mx-auto max-w-5xl px-6">
        <dl class="grid gap-8 md:grid-cols-3">
          <div class="flex flex-col items-start">
            <span
              class="inline-flex size-12 items-center justify-center rounded-full border border-brass-400/50 bg-cream-50 text-brass-700 shadow-(--shadow-paper)"
              aria-hidden="true"
            >
              <MapPin class="size-5" />
            </span>
            <dt class="mt-4 font-display text-xl text-walnut-900">Adresse</dt>
            <dd class="mt-2 text-walnut-700">
              {{ venue.address.street }}<br>
              {{ venue.address.postalCode }} {{ venue.address.locality }}
            </dd>
            <a
              :href="directionsHref"
              class="mt-3 inline-flex items-center gap-1 text-sm font-medium text-brass-700 hover:text-brass-800 focus-visible:outline-2 focus-visible:outline-brass-500"
            >
              Itinéraire
              <ExternalLink class="size-3.5" aria-hidden="true" />
            </a>
          </div>

          <div class="flex flex-col items-start">
            <span
              class="inline-flex size-12 items-center justify-center rounded-full border border-brass-400/50 bg-cream-50 text-brass-700 shadow-(--shadow-paper)"
              aria-hidden="true"
            >
              <Clock class="size-5" />
            </span>
            <dt class="mt-4 font-display text-xl text-walnut-900">Horaires</dt>
            <dd class="mt-2 w-full">
              <table class="w-full text-sm text-walnut-700">
                <caption class="sr-only">Horaires d'ouverture</caption>
                <tbody>
                  <tr v-for="(slot, i) in venue.hours" :key="i" class="border-b border-walnut-200/60 last:border-0">
                    <th
                      scope="row"
                      class="py-1.5 text-left font-normal"
                    >
                      {{ formatDayRange(slot.days) }}
                    </th>
                    <td class="py-1.5 text-right tabular-nums">
                      {{ slot.open.replace(':', 'h') }} – {{ slot.close.replace(':', 'h') }}
                    </td>
                  </tr>
                </tbody>
              </table>
              <p class="mt-2 text-xs text-walnut-500">(à confirmer auprès du client)</p>
            </dd>
          </div>

          <div class="flex flex-col items-start">
            <span
              class="inline-flex size-12 items-center justify-center rounded-full border border-brass-400/50 bg-cream-50 text-brass-700 shadow-(--shadow-paper)"
              aria-hidden="true"
            >
              <Phone class="size-5" />
            </span>
            <dt class="mt-4 font-display text-xl text-walnut-900">Téléphone</dt>
            <dd class="mt-2">
              <a
                v-if="venue.telephoneHref"
                :href="venue.telephoneHref"
                class="text-walnut-900 underline-offset-4 hover:text-brass-700 hover:underline"
              >
                {{ venue.telephone }}
              </a>
              <span v-else class="text-walnut-700">{{ venue.telephone }}</span>
            </dd>
          </div>
        </dl>
      </div>
    </section>

    <!-- Carte interactive -->
    <section class="bg-walnut-100 py-16">
      <div class="mx-auto max-w-5xl px-6">
        <header class="mb-8 text-center">
          <p class="font-script text-2xl text-brass-700">Sur le</p>
          <h2 class="mt-1 font-display text-3xl text-walnut-900 sm:text-4xl">
            Plan
          </h2>
          <GoldDivider class="mt-6 text-brass-600" />
        </header>

        <div ref="mapTrigger">
          <ClientOnly>
            <VenueMap
              v-if="mapMounted"
              :lat="venue.geo.lat"
              :lng="venue.geo.lng"
              :marker-label="`${venue.name} — ${venue.address.street}`"
            />
            <div
              v-else
              class="aspect-[16/10] w-full overflow-hidden rounded-(--radius-card) bg-walnut-200 ring-1 ring-walnut-200 shadow-(--shadow-paper)"
              aria-label="Chargement de la carte"
            >
              <div class="flex size-full items-center justify-center text-sm uppercase tracking-widest text-walnut-600">
                Chargement de la carte…
              </div>
            </div>
            <template #fallback>
              <div
                class="aspect-[16/10] w-full overflow-hidden rounded-(--radius-card) bg-walnut-200 ring-1 ring-walnut-200 shadow-(--shadow-paper)"
                aria-hidden="true"
              />
            </template>
          </ClientOnly>
        </div>

        <p class="mt-4 text-center text-xs text-walnut-700">
          Carte issue d'<a
            :href="osmHref"
            target="_blank"
            rel="noopener"
            class="text-brass-700 underline-offset-2 hover:text-brass-800 hover:underline"
          >OpenStreetMap</a> — sans tracking publicitaire.
        </p>
      </div>
    </section>

    <!-- CTA final -->
    <section class="py-20 text-center">
      <div class="mx-auto max-w-2xl px-6">
        <p class="text-walnut-700">
          Pour les groupes, événements privés ou questions presse, contactez-nous via
          <span v-if="venue.email"><a :href="`mailto:${venue.email}`" class="text-brass-700 hover:underline">{{ venue.email }}</a></span>
          <span v-else>(coordonnées à venir).</span>
        </p>
        <div class="mt-6">
          <UiButton variant="primary" to="/carte">Voir la carte</UiButton>
        </div>
      </div>
    </section>
  </article>
</template>
