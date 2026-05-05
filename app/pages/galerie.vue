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

useHead({
  title: 'Galerie',
  meta: [
    {
      name: 'description',
      content:
        'Galerie photos du Meynadier — comptoir bois noyer, terrasse, plats, ambiance pub à Cannes.',
    },
  ],
})

interface Photo {
  src: string
  alt: string
  span?: 1 | 2
}

const photos: Photo[] = [
  { src: '/images/gallery/g1.jpg', alt: 'Salle du Meynadier, ambiance lumineuse', span: 2 },
  {
    src: '/images/gallery/g2.jpg',
    alt: 'Comptoir bois noyer du Meynadier, accents laiton et guirlandes lumineuses',
  },
  { src: '/images/gallery/g3.jpg', alt: 'Plantes vertes sur le comptoir bois noyer' },
  { src: '/images/gallery/g4.jpg', alt: 'Pizza signature à pâte fine' },
  { src: '/images/gallery/g5.jpg', alt: 'Bar luxe et tabourets bois', span: 2 },
  { src: '/images/gallery/g6.jpg', alt: 'Cocktail signature' },
  { src: '/images/gallery/g7.jpg', alt: 'Pub feutré, lumière chaude' },
  { src: '/images/gallery/g8.jpg', alt: "Détail d'ambiance — jeu de lumière" },
]

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
  activeIndex.value = (activeIndex.value - 1 + photos.length) % photos.length
}

function goNext() {
  activeIndex.value = (activeIndex.value + 1) % photos.length
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

const active = computed(() => photos[activeIndex.value])
</script>

<template>
  <article class="bg-walnut-50 text-walnut-800">
    <!-- Hero éditorial -->
    <section class="bg-walnut-100 pb-16 pt-32">
      <div class="mx-auto max-w-3xl px-6">
        <SectionLabel
          :level="1"
          kicker="En"
          title="Images"
          tagline="Bois noyer, lumière chaude, plantes vertes — l'ambiance du Meynadier en quelques plans. Cliquez sur une image pour l'ouvrir."
        />
      </div>
    </section>

    <!-- Grille masonry -->
    <section class="py-20">
      <div class="mx-auto max-w-6xl px-6">
        <ul
          class="grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-3 lg:grid-cols-4"
          aria-label="Galerie photos"
        >
          <li
            v-for="(photo, idx) in photos"
            :key="idx"
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
              <img
                :src="photo.src"
                :alt="photo.alt"
                loading="lazy"
                decoding="async"
                class="size-full object-cover transition-transform duration-700 group-hover:scale-105"
              >
              <div
                aria-hidden="true"
                class="absolute inset-0 bg-walnut-950/0 transition-colors duration-300 group-hover:bg-walnut-950/15"
              />
            </button>
          </li>
        </ul>
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
            Photo {{ activeIndex + 1 }} sur {{ photos.length }}
          </DialogTitle>
          <DialogDescription class="sr-only">
            {{ active?.alt }}
          </DialogDescription>

          <div
            class="relative max-h-[90vh] max-w-[92vw] overflow-hidden rounded-(--radius-card) shadow-(--shadow-deep) data-[state=open]:animate-in data-[state=open]:fade-in data-[state=open]:zoom-in-95"
          >
            <img
              v-if="active"
              :src="active.src"
              :alt="active.alt"
              class="block max-h-[90vh] max-w-[92vw] object-contain"
            >
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
            {{ activeIndex + 1 }} · {{ photos.length }}
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
