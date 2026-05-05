<script setup lang="ts">
const { t, locale } = useI18n()
const localePath = useLocalePath()

interface Featured {
  image: string
  imageAltKey: string
  categoryKey: string
  nameKey: string
  descKey: string
  price: number | null
  tags: string[]
}

const featured: Featured[] = [
  {
    image: '/images/menu/margarita.jpg',
    imageAltKey: 'home.menuPreview.items.margarita.alt',
    categoryKey: 'home.menuPreview.items.margarita.category',
    nameKey: 'home.menuPreview.items.margarita.name',
    descKey: 'home.menuPreview.items.margarita.description',
    price: 9,
    tags: ['classique', 'végé'],
  },
  {
    image: '/images/menu/karmeliet.jpg',
    imageAltKey: 'home.menuPreview.items.karmeliet.alt',
    categoryKey: 'home.menuPreview.items.karmeliet.category',
    nameKey: 'home.menuPreview.items.karmeliet.name',
    descKey: 'home.menuPreview.items.karmeliet.description',
    price: null,
    tags: ['bière', 'belge', 'signature'],
  },
  {
    image: '/images/menu/spritz.jpg',
    imageAltKey: 'home.menuPreview.items.spritz.alt',
    categoryKey: 'home.menuPreview.items.spritz.category',
    nameKey: 'home.menuPreview.items.spritz.name',
    descKey: 'home.menuPreview.items.spritz.description',
    price: 8.5,
    tags: ['cocktail', 'signature'],
  },
]

const localeMap: Record<string, string> = {
  fr: 'fr-FR',
  en: 'en-GB',
  it: 'it-IT',
}

function formatPrice(p: number | null) {
  if (p == null) return '—'
  return new Intl.NumberFormat(localeMap[locale.value] ?? 'fr-FR', {
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
        :kicker="t('home.menuPreview.kicker')"
        :title="t('home.menuPreview.title')"
        :tagline="t('home.menuPreview.tagline')"
      />

      <div v-reveal:children="{ y: 32, stagger: 0.12, duration: 1 }" class="mt-20 grid gap-8 md:grid-cols-3">
        <article
          v-for="item in featured"
          :key="item.nameKey"
          class="group relative overflow-hidden rounded-(--radius-card) bg-cream-50 ring-1 ring-walnut-200 shadow-(--shadow-paper) transition-all duration-300 hover:-translate-y-1 hover:shadow-(--shadow-warm)"
        >
          <div class="relative aspect-[5/4] overflow-hidden">
            <NuxtImg
              :src="item.image"
              :alt="t(item.imageAltKey)"
              loading="lazy"
              decoding="async"
              width="700"
              height="560"
              sizes="sm:100vw md:50vw lg:33vw"
              format="avif,webp"
              class="size-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <span
              class="absolute right-4 top-4 inline-flex h-12 min-w-[3rem] items-center justify-center rounded-full bg-walnut-900 px-3 font-display text-base font-medium text-brass-300 ring-1 ring-brass-500/40 backdrop-blur-sm"
            >
              {{ formatPrice(item.price) }}
            </span>
          </div>

          <div class="p-6">
            <p class="text-xs uppercase tracking-[0.3em] text-brass-700">
              {{ t(item.categoryKey) }}
            </p>
            <h3 class="mt-2 font-display text-3xl text-walnut-900">
              {{ t(item.nameKey) }}
            </h3>
            <p class="mt-3 text-sm leading-relaxed text-walnut-700">
              {{ t(item.descKey) }}
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
        <UiButton variant="primary" size="lg" :to="localePath('/carte')">
          {{ t('home.menuPreview.cta') }}
        </UiButton>
      </div>
    </div>
  </section>
</template>
