<script setup lang="ts">
import { ChevronLeft, ChevronRight, X } from 'lucide-vue-next'
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogOverlay,
  DialogPortal,
  DialogRoot,
  DialogTitle,
} from 'reka-ui'

defineI18nRoute({
  paths: {
    fr: '/galerie',
    en: '/gallery',
    it: '/galleria',
  },
})

const { t } = useI18n()
const localePath = useLocalePath()

useSeoMeta({
  title: () => t('seo.gallery.title'),
  description: () => t('seo.gallery.description'),
  ogTitle: () => `${t('seo.gallery.title')} — Le Meynadier`,
  ogDescription: () => t('seo.gallery.description'),
  ogType: 'website',
  twitterCard: 'summary_large_image',
})

defineOgImage('Meynadier', {
  kicker: () => t('nav.gallery'),
  title: () => t('seo.gallery.title'),
  description: () => t('seo.gallery.description'),
})

interface Photo {
  src: string
  alt: string
  span?: 1 | 2
  category: 'lieu' | 'plats' | 'ambiance'
}

const photos: Photo[] = [
  {
    src: '/images/gallery/g1.jpg',
    alt: 'Salle du Meynadier, ambiance lumineuse',
    span: 2,
    category: 'lieu',
  },
  {
    src: '/images/gallery/g2.jpg',
    alt: 'Comptoir bois noyer, accents laiton et guirlandes',
    category: 'lieu',
  },
  { src: '/images/gallery/g3.jpg', alt: 'Plantes vertes sur le comptoir', category: 'ambiance' },
  { src: '/images/gallery/g4.jpg', alt: 'Pizza signature à pâte fine', category: 'plats' },
  { src: '/images/gallery/g5.jpg', alt: 'Bar luxe et tabourets bois', span: 2, category: 'lieu' },
  { src: '/images/gallery/g6.jpg', alt: 'Cocktail signature', category: 'plats' },
  { src: '/images/gallery/g7.jpg', alt: 'Pub feutré, lumière chaude', category: 'ambiance' },
  {
    src: '/images/gallery/g8.jpg',
    alt: "Détail d'ambiance — jeu de lumière",
    category: 'ambiance',
  },
]

const filterKeys: Record<'tout' | Photo['category'], string> = {
  tout: 'gallery.filters.all',
  lieu: 'gallery.filters.venue',
  plats: 'gallery.filters.food',
  ambiance: 'gallery.filters.ambience',
}

const activeFilter = ref<'tout' | Photo['category']>('tout')

const filteredPhotos = computed(() =>
  activeFilter.value === 'tout' ? photos : photos.filter((p) => p.category === activeFilter.value),
)

const open = ref(false)
const activeIndex = ref(0)

function openAt(index: number) {
  activeIndex.value = index
  open.value = true
}

function close() {
  open.value = false
}

function goPrev() {
  activeIndex.value =
    (activeIndex.value - 1 + filteredPhotos.value.length) % filteredPhotos.value.length
}

function goNext() {
  activeIndex.value = (activeIndex.value + 1) % filteredPhotos.value.length
}

function onKey(event: KeyboardEvent) {
  if (!open.value) return
  if (event.key === 'ArrowLeft') {
    event.preventDefault()
    goPrev()
  }
  if (event.key === 'ArrowRight') {
    event.preventDefault()
    goNext()
  }
}

if (import.meta.client) {
  onMounted(() => window.addEventListener('keydown', onKey))
  onBeforeUnmount(() => window.removeEventListener('keydown', onKey))
}

const active = computed(() => filteredPhotos.value[activeIndex.value])

// Cacher la navbar quand la barre de filtres devient sticky au top.
const { hidden: headerHidden } = useHeaderVisibility()
const tabsSentinel = ref<HTMLElement | null>(null)

if (import.meta.client) {
  let io: IntersectionObserver | null = null
  onMounted(() => {
    if (!tabsSentinel.value) return
    io = new IntersectionObserver(
      ([entry]) => {
        headerHidden.value = entry ? !entry.isIntersecting : false
      },
      { threshold: 0, rootMargin: '0px' },
    )
    io.observe(tabsSentinel.value)
  })
  onBeforeUnmount(() => {
    io?.disconnect()
    headerHidden.value = false
  })
}
</script>

<template>
  <article class="bg-walnut-50 text-walnut-800">
    <!-- Hero immersif — cohérent /, /carte, /histoire -->
    <section class="relative isolate flex min-h-[70dvh] flex-col items-center justify-center overflow-hidden bg-walnut-900 text-cream-50">
      <NuxtImg
        src="/images/gallery/g7.jpg"
        alt=""
        aria-hidden="true"
        preload
        sizes="xs:100vw sm:100vw md:100vw lg:100vw xl:100vw 2xl:1920px"
        format="webp"
        quality="80"
        class="absolute inset-0 -z-30 size-full object-cover object-center opacity-45 motion-safe:scale-105 motion-safe:[animation:meyn-zoom-slow_28s_ease-in-out_infinite_alternate]"
      />
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
        <p class="mt-5 font-script text-2xl text-brass-300 sm:text-3xl">{{ t('gallery.hero.kicker') }}</p>
        <h1 class="mt-1 font-display text-5xl leading-[0.95] tracking-tight text-cream-50 sm:text-7xl md:text-8xl">
          {{ t('gallery.hero.title') }}
        </h1>
        <GoldDivider size="md" ornament="diamond" class="mt-8 text-brass-400" />
        <p class="mt-6 max-w-xl text-base leading-relaxed text-cream-100/85 sm:text-lg">
          {{ t('gallery.hero.tagline') }}
        </p>
      </div>
    </section>

    <!-- Sentinel pour piloter la visibilité de la navbar -->
    <div ref="tabsSentinel" aria-hidden="true" class="h-px" />

    <!-- Barre filtres pleine largeur carrée, cohérente avec /carte -->
    <nav
      aria-label="Filtres galerie"
      class="meyn-tabs sticky top-0 z-40 border-b border-walnut-200/70 bg-walnut-50/95 backdrop-blur-md"
    >
      <div class="mx-auto flex max-w-7xl items-stretch overflow-x-auto px-4 sm:px-6">
        <button
          v-for="(key, filterKey, idx) in filterKeys"
          :key="filterKey"
          type="button"
          :aria-current="activeFilter === filterKey ? 'true' : undefined"
          :class="[
            'meyn-tab group relative shrink-0 px-5 py-4 text-[11px] font-medium uppercase tracking-[0.18em] transition-colors duration-300',
            activeFilter === filterKey
              ? 'text-walnut-900'
              : 'text-walnut-600 hover:text-walnut-900',
          ]"
          @click="activeFilter = filterKey; activeIndex = 0"
        >
          <span class="flex items-center gap-2">
            <span
              class="font-display tabular-nums transition-colors"
              :class="activeFilter === filterKey ? 'text-brass-700' : 'text-brass-700/50'"
            >
              {{ String(idx + 1).padStart(2, '0') }}
            </span>
            <span>{{ t(key) }}</span>
          </span>
          <span
            v-if="activeFilter === filterKey"
            aria-hidden="true"
            class="meyn-tab-underline"
          />
        </button>
      </div>
    </nav>

    <!-- Grille masonry -->
    <section class="relative bg-walnut-50 py-20 pt-12">
      <div class="mx-auto max-w-6xl px-6">
        <SectionLabel
          number="01"
          :kicker="t('gallery.section.kicker')"
          :title="t('gallery.section.title')"
          :tagline="t('gallery.section.tagline')"
        />

        <ul
          v-reveal:children="{ y: 24, stagger: 0.05, duration: 0.7 }"
          class="mt-16 grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-3 lg:grid-cols-4"
          aria-label="Galerie photos"
        >
          <li
            v-for="(photo, idx) in filteredPhotos"
            :key="`${activeFilter}-${idx}`"
            :class="
              photo.span === 2
                ? 'row-span-2 aspect-[3/4]'
                : 'aspect-square'
            "
          >
            <button
              type="button"
              :aria-label="`Ouvrir la photo : ${photo.alt}`"
              class="group relative size-full overflow-hidden rounded-(--radius-card) ring-1 ring-walnut-200 shadow-(--shadow-paper) transition-all duration-300 hover:-translate-y-0.5 hover:shadow-(--shadow-warm) focus-visible:outline-2 focus-visible:outline-brass-500 focus-visible:outline-offset-2"
              @click="openAt(idx)"
            >
              <NuxtImg
                :src="photo.src"
                :alt="photo.alt"
                loading="lazy"
                decoding="async"
                width="800"
                height="800"
                sizes="sm:50vw md:33vw lg:25vw"
                format="webp"
                class="size-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div
                aria-hidden="true"
                class="absolute inset-0 bg-walnut-950/0 transition-colors duration-300 group-hover:bg-walnut-950/15"
              />
              <!-- Étiquette catégorie au hover -->
              <div
                aria-hidden="true"
                class="absolute inset-x-3 bottom-3 flex items-center gap-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              >
                <span class="inline-flex items-center rounded-full bg-walnut-900/80 px-2.5 py-1 text-[10px] uppercase tracking-[0.22em] text-cream-50 backdrop-blur-sm">
                  {{ t(filterKeys[photo.category]) }}
                </span>
              </div>
            </button>
          </li>
        </ul>
      </div>
    </section>

    <!-- CTA final cohérent / /carte /histoire -->
    <section class="relative overflow-hidden bg-walnut-900 py-20 text-center text-cream-50">
      <WoodGrain :opacity="0.10" :color="'#0d0905'" />
      <div
        aria-hidden="true"
        class="absolute inset-0 bg-[radial-gradient(ellipse_50%_45%_at_50%_50%,rgba(221,193,138,0.14),transparent_70%)]"
      />
      <div class="relative mx-auto max-w-2xl px-6">
        <Monogram :size="48" class="mx-auto text-brass-400" />
        <h2 class="mt-5 font-display text-3xl text-cream-50 sm:text-4xl">
          {{ t('gallery.cta.title') }}
        </h2>
        <p class="mt-4 text-cream-100/80">
          {{ t('gallery.cta.subtitle') }}
        </p>
        <div class="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <UiButton variant="gold" :to="localePath('/contact')">{{ t('gallery.cta.find') }}</UiButton>
          <UiButton variant="hero-outline" :to="localePath('/carte')">{{ t('gallery.cta.menu') }}</UiButton>
        </div>
      </div>
    </section>

    <!-- Lightbox -->
    <DialogRoot :open="open" :modal="true" @update:open="open = $event">
      <DialogPortal>
        <DialogOverlay
          class="fixed inset-0 z-50 bg-walnut-950/90 backdrop-blur-sm data-[state=open]:animate-in data-[state=open]:fade-in data-[state=closed]:animate-out data-[state=closed]:fade-out"
        />
        <DialogContent
          class="fixed inset-0 z-50 flex items-center justify-center p-4 focus:outline-none"
        >
          <DialogTitle class="sr-only">
            Photo {{ activeIndex + 1 }} sur {{ filteredPhotos.length }}
          </DialogTitle>
          <DialogDescription class="sr-only">
            {{ active?.alt }}
          </DialogDescription>

          <div
            class="relative max-h-[90vh] max-w-[92vw] overflow-hidden rounded-(--radius-card) shadow-(--shadow-deep) data-[state=open]:animate-in data-[state=open]:fade-in data-[state=open]:zoom-in-95"
          >
            <NuxtImg
              v-if="active"
              :src="active.src"
              :alt="active.alt"
              width="2400"
              height="1800"
              sizes="92vw"
              format="webp"
              quality="85"
              class="block max-h-[90vh] max-w-[92vw] object-contain"
            />
          </div>

          <button
            type="button"
            aria-label="Photo précédente"
            class="absolute left-4 top-1/2 -translate-y-1/2 inline-flex size-12 items-center justify-center rounded-full border border-cream-100/30 bg-walnut-900/40 text-cream-50 backdrop-blur-sm transition-colors hover:bg-walnut-900/70 focus-visible:outline-2 focus-visible:outline-brass-400 sm:left-8"
            @click="goPrev"
          >
            <ChevronLeft class="size-6" aria-hidden="true" />
          </button>
          <button
            type="button"
            aria-label="Photo suivante"
            class="absolute right-4 top-1/2 -translate-y-1/2 inline-flex size-12 items-center justify-center rounded-full border border-cream-100/30 bg-walnut-900/40 text-cream-50 backdrop-blur-sm transition-colors hover:bg-walnut-900/70 focus-visible:outline-2 focus-visible:outline-brass-400 sm:right-8"
            @click="goNext"
          >
            <ChevronRight class="size-6" aria-hidden="true" />
          </button>

          <div class="absolute bottom-6 left-1/2 -translate-x-1/2 rounded-full bg-walnut-900/60 px-4 py-1.5 text-xs uppercase tracking-widest text-cream-50 backdrop-blur-sm">
            {{ activeIndex + 1 }} · {{ filteredPhotos.length }}
          </div>

          <DialogClose
            aria-label="Fermer la galerie"
            class="absolute right-4 top-4 inline-flex size-12 items-center justify-center rounded-full border border-cream-100/30 bg-walnut-900/40 text-cream-50 backdrop-blur-sm transition-colors hover:bg-walnut-900/70 focus-visible:outline-2 focus-visible:outline-brass-400 sm:right-8 sm:top-8"
            @click="close"
          >
            <X class="size-6" aria-hidden="true" />
          </DialogClose>
        </DialogContent>
      </DialogPortal>
    </DialogRoot>
  </article>
</template>

<style scoped>
@keyframes meyn-zoom-slow {
  from { transform: scale(1.05); }
  to   { transform: scale(1.10); }
}

.meyn-tab {
  position: relative;
  isolation: isolate;
}

.meyn-tab:focus-visible {
  outline: none;
}

.meyn-tab:focus-visible::before {
  content: '';
  position: absolute;
  left: 1rem;
  right: 1rem;
  bottom: 0;
  height: 2px;
  background: var(--color-brass-400);
  z-index: 5;
}

.meyn-tab-underline {
  position: absolute;
  left: 1rem;
  right: 1rem;
  bottom: 0;
  height: 2px;
  background: var(--color-brass-600);
  animation: meyn-tab-in 0.35s cubic-bezier(0.2, 0.6, 0.1, 1) both;
}

@keyframes meyn-tab-in {
  from { opacity: 0; transform: scaleX(0.6); }
  to   { opacity: 1; transform: scaleX(1); }
}

@media (prefers-reduced-motion: reduce) {
  .meyn-tab-underline { animation: none; }
}

.meyn-tabs > div::-webkit-scrollbar { display: none; }
.meyn-tabs > div { scrollbar-width: none; }
</style>
