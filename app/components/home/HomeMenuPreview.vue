<script setup lang="ts">
interface Featured {
  image: string
  imageAlt: string
  category: string
  name: string
  description: string
  price: number | null
  tags: string[]
}

const featured: Featured[] = [
  {
    image: '/images/menu/margarita.jpg',
    imageAlt: 'Pizza Margarita au four à pizza',
    category: 'Pizza signature',
    name: 'Margarita',
    description: "Sauce tomate à l'origan, mozzarella et basilic — la classique inégalable.",
    price: 9,
    tags: ['classique', 'végé'],
  },
  {
    image: '/images/menu/karmeliet.jpg',
    imageAlt: 'Bière Triple Karmeliet servie au verre tulipe',
    category: 'Bière belge',
    name: 'Triple Karmeliet',
    description: 'Triple belge, 8,4 % — généreuse, fruitée, ronde, à la robe dorée.',
    price: null,
    tags: ['bière', 'belge', 'signature'],
  },
  {
    image: '/images/menu/spritz.jpg',
    imageAlt: 'Cocktail Spirit Spritz orange et bulles',
    category: 'Cocktail signature',
    name: 'Spirit Spritz',
    description: 'Apérol, prosecco, eau gazeuse, orange — soleil au verre.',
    price: 8.5,
    tags: ['cocktail', 'signature'],
  },
]

function formatPrice(p: number | null) {
  if (p == null) return '—'
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: p % 1 === 0 ? 0 : 2,
  }).format(p)
}
</script>

<template>
  <section
    aria-labelledby="menu-preview-title"
    class="relative bg-walnut-50 py-32"
  >
    <div class="mx-auto max-w-6xl px-6">
      <SectionLabel
        number="05"
        kicker="Aperçu de la"
        title="Carte"
        tagline="Une sélection de favoris — la carte complète vous attend en page suivante."
      />

      <div v-reveal:children="{ y: 32, stagger: 0.12, duration: 1 }" class="mt-20 grid gap-8 md:grid-cols-3">
        <article
          v-for="item in featured"
          :key="item.name"
          class="group relative overflow-hidden rounded-(--radius-card) bg-cream-50 ring-1 ring-walnut-200 shadow-(--shadow-paper) transition-all duration-300 hover:-translate-y-1 hover:shadow-(--shadow-warm)"
        >
          <!-- Image -->
          <div class="relative aspect-[5/4] overflow-hidden">
            <img
              :src="item.image"
              :alt="item.imageAlt"
              loading="lazy"
              decoding="async"
              class="size-full object-cover transition-transform duration-700 group-hover:scale-105"
            >
            <!-- Médaillon prix -->
            <span
              class="absolute right-4 top-4 inline-flex h-12 min-w-[3rem] items-center justify-center rounded-full bg-walnut-900 px-3 font-display text-base font-medium text-brass-300 ring-1 ring-brass-500/40 backdrop-blur-sm"
            >
              {{ formatPrice(item.price) }}
            </span>
          </div>

          <!-- Texte -->
          <div class="p-6">
            <p class="text-xs uppercase tracking-[0.3em] text-brass-700">
              {{ item.category }}
            </p>
            <h3 class="mt-2 font-display text-3xl text-walnut-900">
              {{ item.name }}
            </h3>
            <p class="mt-3 text-sm leading-relaxed text-walnut-700">
              {{ item.description }}
            </p>
            <ul class="mt-4 flex flex-wrap gap-1.5">
              <li
                v-for="tag in item.tags"
                :key="tag"
                class="inline-flex items-center rounded-(--radius-pill) border border-walnut-300 px-2 py-0.5 text-[10px] font-medium uppercase tracking-widest text-walnut-600"
              >
                {{ tag }}
              </li>
            </ul>
          </div>
        </article>
      </div>

      <div class="mt-16 text-center">
        <UiButton variant="primary" size="lg" to="/carte">
          Voir toute la carte
        </UiButton>
      </div>
    </div>
  </section>
</template>
