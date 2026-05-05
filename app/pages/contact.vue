<script setup lang="ts">
import { ArrowUpRight, Clock, Mail, MapPin, Phone } from 'lucide-vue-next'

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
// si l'utilisateur ne descend pas jusqu'à elle.
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
    <!-- Hero immersif — cohérent /, /carte, /histoire, /galerie -->
    <section class="relative isolate flex min-h-[70dvh] flex-col items-center justify-center overflow-hidden bg-walnut-900 text-cream-50">
      <img
        src="/images/hero/hero-3.jpg"
        alt=""
        aria-hidden="true"
        class="absolute inset-0 -z-30 size-full object-cover object-center opacity-50 motion-safe:scale-105 motion-safe:[animation:meyn-zoom-slow_28s_ease-in-out_infinite_alternate]"
      >
      <div
        aria-hidden="true"
        class="absolute inset-0 -z-20 bg-gradient-to-b from-walnut-950/85 via-walnut-900/65 to-walnut-950/95"
      />
      <div
        aria-hidden="true"
        class="absolute inset-0 -z-20 bg-[radial-gradient(ellipse_55%_45%_at_50%_35%,rgba(221,193,138,0.20),transparent_70%)]"
      />

      <div class="relative mx-auto flex max-w-3xl flex-col items-center px-6 pt-32 pb-16 text-center">
        <Monogram :size="56" class="text-brass-400" />
        <p class="mt-5 font-script text-2xl text-brass-300 sm:text-3xl">Nous</p>
        <h1 class="mt-1 font-display text-5xl leading-[0.95] tracking-tight text-cream-50 sm:text-7xl md:text-8xl">
          Trouver
        </h1>
        <GoldDivider size="md" ornament="diamond" class="mt-8 text-brass-400" />
        <p class="mt-6 max-w-xl text-base leading-relaxed text-cream-100/85 sm:text-lg">
          {{ venue.address.street }}, {{ venue.address.postalCode }} {{ venue.address.locality }} —
          au cœur du vieux Cannes, à deux pas du marché Forville.
        </p>
      </div>
    </section>

    <!-- Coordonnées en cards luxe -->
    <section class="relative bg-walnut-50 py-24">
      <div class="mx-auto max-w-6xl px-6">
        <SectionLabel
          number="01"
          kicker="Coordonnées"
          title="Le Meynadier"
          tagline="Sept jours sur sept, sans interruption — du café du matin au cocktail du soir."
        />

        <div
          v-reveal:children="{ y: 32, stagger: 0.12, duration: 1 }"
          class="mt-16 grid gap-6 md:grid-cols-3"
        >
          <!-- Adresse -->
          <article class="group relative flex flex-col rounded-(--radius-card) border border-walnut-200/70 bg-cream-50 p-8 shadow-(--shadow-paper) transition-all duration-300 hover:-translate-y-1 hover:border-brass-500/50 hover:shadow-(--shadow-warm)">
            <span
              class="inline-flex size-14 items-center justify-center rounded-full border border-brass-400/40 bg-walnut-50 text-brass-700 transition-colors group-hover:border-brass-500 group-hover:bg-brass-500 group-hover:text-walnut-950"
              aria-hidden="true"
            >
              <MapPin class="size-6" />
            </span>
            <p class="mt-6 text-[10px] uppercase tracking-[0.32em] text-brass-700">Adresse</p>
            <h3 class="mt-2 font-display text-2xl text-walnut-900">
              {{ venue.address.street }}
            </h3>
            <p class="text-walnut-700">
              {{ venue.address.postalCode }} {{ venue.address.locality }}
            </p>
            <a
              :href="directionsHref"
              class="mt-5 inline-flex items-center gap-1 text-xs font-medium uppercase tracking-[0.22em] text-brass-700 transition-colors hover:text-brass-800 focus-visible:outline-2 focus-visible:outline-brass-500 focus-visible:outline-offset-4"
            >
              Itinéraire
              <ArrowUpRight class="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
            </a>
          </article>

          <!-- Horaires -->
          <article class="group relative flex flex-col rounded-(--radius-card) border border-walnut-200/70 bg-cream-50 p-8 shadow-(--shadow-paper) transition-all duration-300 hover:-translate-y-1 hover:border-brass-500/50 hover:shadow-(--shadow-warm)">
            <span
              class="inline-flex size-14 items-center justify-center rounded-full border border-brass-400/40 bg-walnut-50 text-brass-700 transition-colors group-hover:border-brass-500 group-hover:bg-brass-500 group-hover:text-walnut-950"
              aria-hidden="true"
            >
              <Clock class="size-6" />
            </span>
            <p class="mt-6 text-[10px] uppercase tracking-[0.32em] text-brass-700">Horaires</p>
            <h3 class="mt-2 font-display text-2xl text-walnut-900">
              7 jours sur 7
            </h3>
            <table class="mt-3 w-full text-sm text-walnut-700">
              <caption class="sr-only">Horaires d'ouverture</caption>
              <tbody>
                <tr v-for="(slot, i) in venue.hours" :key="i">
                  <th scope="row" class="py-1 text-left font-normal">
                    {{ formatDayRange(slot.days) }}
                  </th>
                  <td class="py-1 text-right tabular-nums">
                    {{ slot.open.replace(':', 'h') }} – {{ slot.close.replace(':', 'h') }}
                  </td>
                </tr>
              </tbody>
            </table>
            <p class="mt-2 text-[11px] text-walnut-500 italic">(à confirmer)</p>
          </article>

          <!-- Téléphone -->
          <article class="group relative flex flex-col rounded-(--radius-card) border border-walnut-200/70 bg-cream-50 p-8 shadow-(--shadow-paper) transition-all duration-300 hover:-translate-y-1 hover:border-brass-500/50 hover:shadow-(--shadow-warm)">
            <span
              class="inline-flex size-14 items-center justify-center rounded-full border border-brass-400/40 bg-walnut-50 text-brass-700 transition-colors group-hover:border-brass-500 group-hover:bg-brass-500 group-hover:text-walnut-950"
              aria-hidden="true"
            >
              <Phone class="size-6" />
            </span>
            <p class="mt-6 text-[10px] uppercase tracking-[0.32em] text-brass-700">Téléphone</p>
            <h3 class="mt-2 font-display text-2xl text-walnut-900">
              <a
                v-if="venue.telephoneHref"
                :href="venue.telephoneHref"
                class="hover:text-brass-700"
              >
                {{ venue.telephone }}
              </a>
              <span v-else>{{ venue.telephone }}</span>
            </h3>
            <p class="mt-2 text-walnut-700">
              Pour les groupes, événements privés, presse — appelez ou écrivez-nous directement.
            </p>
            <a
              v-if="venue.email"
              :href="`mailto:${venue.email}`"
              class="mt-5 inline-flex items-center gap-1 text-xs font-medium uppercase tracking-[0.22em] text-brass-700 transition-colors hover:text-brass-800 focus-visible:outline-2 focus-visible:outline-brass-500 focus-visible:outline-offset-4"
            >
              <Mail class="size-3.5" aria-hidden="true" />
              Écrire un mail
            </a>
            <p v-else class="mt-5 text-[11px] text-walnut-500 italic">(coordonnées mail à venir)</p>
          </article>
        </div>
      </div>
    </section>

    <!-- Carte interactive plein largeur (cohérent magazine) -->
    <section class="relative bg-walnut-100 py-24">
      <WoodGrain :opacity="0.06" :color="'#3f2d1a'" />
      <div class="relative mx-auto max-w-7xl px-6">
        <SectionLabel
          number="02"
          kicker="Sur le"
          title="Plan"
          tagline="Carte issue d'OpenStreetMap — sans tracking publicitaire ni cookie tiers."
        />

        <div ref="mapTrigger" class="mt-16">
          <ClientOnly>
            <VenueMap
              v-if="mapMounted"
              :lat="venue.geo.lat"
              :lng="venue.geo.lng"
              :marker-label="`${venue.name} — ${venue.address.street}`"
              class="!aspect-[16/9] sm:!aspect-[21/9]"
            />
            <div
              v-else
              class="aspect-[16/9] w-full overflow-hidden rounded-(--radius-card) bg-walnut-200 ring-1 ring-walnut-200 shadow-(--shadow-paper) sm:aspect-[21/9]"
              aria-label="Chargement de la carte"
            >
              <div class="flex size-full items-center justify-center text-sm uppercase tracking-widest text-walnut-600">
                Chargement de la carte…
              </div>
            </div>
            <template #fallback>
              <div
                class="aspect-[16/9] w-full overflow-hidden rounded-(--radius-card) bg-walnut-200 ring-1 ring-walnut-200 shadow-(--shadow-paper) sm:aspect-[21/9]"
                aria-hidden="true"
              />
            </template>
          </ClientOnly>
        </div>

        <div class="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-between">
          <p class="text-xs text-walnut-700">
            Données <a
              :href="osmHref"
              target="_blank"
              rel="noopener"
              class="text-brass-700 underline-offset-4 hover:text-brass-800 hover:underline"
            >&copy; OpenStreetMap</a>
          </p>
          <UiButton variant="outline" size="sm" :href="directionsHref">
            Itinéraire
          </UiButton>
        </div>
      </div>
    </section>

    <!-- À deux pas — repères locaux -->
    <section class="bg-walnut-50 py-24">
      <div class="mx-auto max-w-5xl px-6">
        <SectionLabel
          number="03"
          kicker="À deux pas du"
          title="vieux Cannes"
        />
        <ul
          v-reveal:children="{ y: 24, stagger: 0.1, duration: 0.8 }"
          class="mt-12 grid gap-6 sm:grid-cols-3"
        >
          <li class="rounded-(--radius-card) border border-walnut-200/70 bg-cream-50 p-6 text-center shadow-(--shadow-paper)">
            <p class="text-[10px] uppercase tracking-[0.3em] text-brass-700">Marché</p>
            <p class="mt-2 font-display text-2xl text-walnut-900">Forville</p>
            <p class="mt-1 text-xs text-walnut-700">à 2 minutes à pied</p>
          </li>
          <li class="rounded-(--radius-card) border border-walnut-200/70 bg-cream-50 p-6 text-center shadow-(--shadow-paper)">
            <p class="text-[10px] uppercase tracking-[0.3em] text-brass-700">Front de mer</p>
            <p class="mt-2 font-display text-2xl text-walnut-900">La Croisette</p>
            <p class="mt-1 text-xs text-walnut-700">à 5 minutes à pied</p>
          </li>
          <li class="rounded-(--radius-card) border border-walnut-200/70 bg-cream-50 p-6 text-center shadow-(--shadow-paper)">
            <p class="text-[10px] uppercase tracking-[0.3em] text-brass-700">Vieille ville</p>
            <p class="mt-2 font-display text-2xl text-walnut-900">Le Suquet</p>
            <p class="mt-1 text-xs text-walnut-700">à 7 minutes à pied</p>
          </li>
        </ul>
      </div>
    </section>

    <!-- CTA final cohérent / /carte /histoire /galerie -->
    <section class="relative overflow-hidden bg-walnut-900 py-20 text-center text-cream-50">
      <WoodGrain :opacity="0.10" :color="'#0d0905'" />
      <div
        aria-hidden="true"
        class="absolute inset-0 bg-[radial-gradient(ellipse_50%_45%_at_50%_50%,rgba(221,193,138,0.14),transparent_70%)]"
      />
      <div class="relative mx-auto max-w-2xl px-6">
        <Monogram :size="48" class="mx-auto text-brass-400" />
        <h2 class="mt-5 font-display text-3xl text-cream-50 sm:text-4xl">
          On vous attend.
        </h2>
        <p class="mt-4 text-cream-100/80">
          Pour un café, un panini sur le pouce, un apéro entre amis ou un dîner complice —
          au cœur de la rue Meynadier.
        </p>
        <div class="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <UiButton variant="gold" to="/carte">Voir la carte</UiButton>
          <UiButton variant="hero-outline" to="/galerie">Découvrir le lieu</UiButton>
        </div>
      </div>
    </section>
  </article>
</template>

<style scoped>
@keyframes meyn-zoom-slow {
  from { transform: scale(1.05); }
  to   { transform: scale(1.10); }
}
</style>
