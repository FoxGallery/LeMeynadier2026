<script setup lang="ts">
import type { MenuCategory } from '~~/content.config'

defineI18nRoute({
  paths: {
    fr: '/carte',
    en: '/menu',
    it: '/menu',
  },
})

const { t, locale } = useI18n()
const localePath = useLocalePath()

useHead({
  title: 'La carte',
  meta: [
    {
      name: 'description',
      content:
        'Découvrez la carte du Meynadier : pizzas signatures, paninis, bières pression, vins, cocktails maison, smoothies, frappés, milkshakes, boissons chaudes et softs.',
    },
  ],
})

const route = useRoute()
const router = useRouter()

const { data: categoriesRaw } = await useAsyncData('menu-all', () =>
  queryCollection('menu').order('order', 'ASC').all(),
)

const categories = computed<MenuCategory[]>(
  () =>
    (categoriesRaw.value ?? []).map((c) => {
      const item = c as unknown as MenuCategory & { items?: MenuCategory['items'] }
      return {
        category: item.category,
        label: item.label,
        description: item.description,
        order: item.order,
        items: (item.items ?? []).slice().sort((a, b) => (a.order ?? 999) - (b.order ?? 999)),
      }
    }) ?? [],
)

const activeTab = ref('')

function syncFromHash() {
  const fromHash = (route.hash || '').replace(/^#/, '')
  if (fromHash && categories.value.some((c) => c.category === fromHash)) {
    activeTab.value = fromHash
  } else if (categories.value[0]) {
    activeTab.value = categories.value[0].category
  }
}

watchEffect(() => {
  if (categories.value.length > 0 && !activeTab.value) {
    syncFromHash()
  }
})

watch(
  () => route.hash,
  () => syncFromHash(),
)

watch(activeTab, (value) => {
  if (value && route.hash !== `#${value}`) {
    router.replace({ hash: `#${value}` })
  }
})

function localized(field: { fr: string; en?: string; it?: string } | undefined) {
  if (!field) return ''
  // Locale courante puis fallback FR (la seule garantie d'être présente).
  const code = locale.value as 'fr' | 'en' | 'it'
  return field[code] ?? field.fr ?? ''
}

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

const { resolve: resolveImage } = useMenuImage()

// Cacher la navbar quand la barre d'onglets devient sticky au top.
const { hidden: headerHidden } = useHeaderVisibility()
const tabsSentinel = ref<HTMLElement | null>(null)

if (import.meta.client) {
  let io: IntersectionObserver | null = null
  onMounted(() => {
    if (!tabsSentinel.value) return
    io = new IntersectionObserver(
      ([entry]) => {
        // Sentinel disparu = barre tabs stickée → cache la navbar.
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

const activeIndex = computed(() =>
  categories.value.findIndex((c) => c.category === activeTab.value),
)

const activeCategory = computed(() => categories.value[activeIndex.value])
</script>

<template>
  <article class="bg-walnut-50 text-walnut-800">
    <!-- Hero immersif (cohérent HomeHero) -->
    <section class="relative isolate flex min-h-[70dvh] flex-col items-center justify-center overflow-hidden bg-walnut-900 text-cream-50">
      <img
        src="/images/menu/margarita.jpg"
        alt=""
        aria-hidden="true"
        class="absolute inset-0 -z-30 size-full object-cover object-center opacity-40 motion-safe:scale-105 motion-safe:[animation:meyn-zoom-slow_28s_ease-in-out_infinite_alternate]"
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
        <p class="mt-5 font-script text-2xl text-brass-300 sm:text-3xl">{{ t('menu.hero.kicker') }}</p>
        <h1 class="mt-1 font-display text-5xl leading-[0.95] tracking-tight text-cream-50 sm:text-7xl md:text-8xl">
          {{ t('menu.hero.title') }}
        </h1>
        <GoldDivider size="md" ornament="diamond" class="mt-8 text-brass-400" />
        <p class="mt-6 max-w-xl text-base leading-relaxed text-cream-100/85 sm:text-lg">
          {{ t('menu.hero.tagline') }}
        </p>
      </div>
    </section>

    <!-- Sentinel invisible pour détecter quand la barre s'apprête à se stick.
         Quand il sort du viewport (scroll past), on cache la navbar. -->
    <div ref="tabsSentinel" aria-hidden="true" class="h-px" />

    <!-- Barre d'onglets pleine largeur, carrée, qui se fond avec le hero
         et remplace la navbar au scroll -->
    <nav
      v-if="activeTab && categories.length"
      aria-label="Catégories de la carte"
      class="meyn-tabs sticky top-0 z-40 border-b border-walnut-200/70 bg-walnut-50/95 backdrop-blur-md"
    >
      <div class="mx-auto flex max-w-7xl items-stretch overflow-x-auto px-4 sm:px-6">
        <button
          v-for="(cat, idx) in categories"
          :key="cat.category"
          type="button"
          :aria-current="activeTab === cat.category ? 'true' : undefined"
          :class="[
            'meyn-tab group relative shrink-0 px-5 py-4 text-[11px] font-medium uppercase tracking-[0.18em] transition-colors duration-300',
            activeTab === cat.category
              ? 'text-walnut-900'
              : 'text-walnut-600 hover:text-walnut-900',
          ]"
          @click="activeTab = cat.category"
        >
          <span class="flex items-center gap-2">
            <span
              class="font-display tabular-nums transition-colors"
              :class="activeTab === cat.category ? 'text-brass-700' : 'text-brass-700/50'"
            >
              {{ String(idx + 1).padStart(2, '0') }}
            </span>
            <span>{{ localized(cat.label) }}</span>
          </span>
          <!-- Underline laiton sur l'actif -->
          <span
            v-if="activeTab === cat.category"
            aria-hidden="true"
            class="meyn-tab-underline"
          />
        </button>
      </div>
    </nav>

    <!-- Catégorie active -->
    <section
      v-if="activeCategory"
      :key="activeCategory.category"
      :class="[
        'relative py-20',
        activeIndex % 2 === 0 ? 'bg-walnut-50' : 'bg-walnut-100',
      ]"
    >
      <WoodGrain v-if="activeIndex % 2 === 1" :opacity="0.06" :color="'#3f2d1a'" />

      <div class="relative mx-auto max-w-6xl px-6">
        <SectionLabel
          :number="String(activeIndex + 1).padStart(2, '0')"
          :kicker="t('menu.category')"
          :title="localized(activeCategory.label)"
          :tagline="localized(activeCategory.description) || undefined"
        />

        <!-- Grille de cards luxe avec photo -->
        <div
          v-reveal:children="{ y: 24, stagger: 0.06, duration: 0.7 }"
          class="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          <article
            v-for="item in activeCategory.items.filter((i) => i.available !== false)"
            :key="item.slug"
            class="group relative flex flex-col overflow-hidden rounded-(--radius-card) border border-walnut-200/70 bg-cream-50 shadow-(--shadow-paper) transition-all duration-300 hover:-translate-y-1 hover:border-brass-500/50 hover:shadow-(--shadow-warm)"
          >
            <!-- Image -->
            <div class="relative aspect-[5/4] overflow-hidden bg-walnut-100">
              <img
                :src="resolveImage({ category: activeCategory.category, slug: item.slug, tags: item.tags, override: item.image })"
                :alt="localized(item.imageAlt) || localized(item.name)"
                loading="lazy"
                decoding="async"
                class="size-full object-cover transition-transform duration-700 group-hover:scale-105"
              >
              <!-- Médaillon prix flottant -->
              <span
                :class="[
                  'absolute right-3 top-3 inline-flex h-10 min-w-[2.5rem] items-center justify-center rounded-full px-3 font-display text-sm font-medium tabular-nums backdrop-blur-sm',
                  item.price === null
                    ? 'bg-walnut-900/80 text-cream-100 italic ring-1 ring-cream-100/30'
                    : 'bg-walnut-900/90 text-brass-300 ring-1 ring-brass-500/50',
                ]"
              >
                {{ formatPrice(item.price) }}
              </span>
              <!-- Voile au hover pour lier visuellement -->
              <div
                aria-hidden="true"
                class="absolute inset-0 bg-gradient-to-t from-walnut-950/30 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-60"
              />
            </div>

            <!-- Texte -->
            <div class="flex flex-1 flex-col p-5">
              <h3 class="font-display text-xl leading-tight text-walnut-900 sm:text-2xl">
                {{ localized(item.name) }}
              </h3>
              <p
                v-if="item.description?.fr"
                class="mt-2 flex-1 text-sm leading-relaxed text-walnut-700"
              >
                {{ localized(item.description) }}
              </p>
              <ul
                v-if="item.tags?.length"
                class="mt-3 flex flex-wrap gap-1.5"
              >
                <li
                  v-for="tag in item.tags"
                  :key="tag"
                  class="inline-flex items-center rounded-full border border-walnut-300 px-2 py-0.5 text-[10px] font-medium uppercase tracking-widest text-walnut-600"
                >
                  {{ tag }}
                </li>
              </ul>
            </div>
          </article>
        </div>
      </div>
    </section>

    <div v-else-if="!categories.length" class="py-32 text-center text-walnut-600">
      Carte en cours de chargement…
    </div>

    <!-- CTA final cohérent avec la home -->
    <section class="relative overflow-hidden bg-walnut-900 py-20 text-center text-cream-50">
      <WoodGrain :opacity="0.10" :color="'#0d0905'" />
      <div
        aria-hidden="true"
        class="absolute inset-0 bg-[radial-gradient(ellipse_50%_45%_at_50%_50%,rgba(221,193,138,0.14),transparent_70%)]"
      />
      <div class="relative mx-auto max-w-2xl px-6">
        <Monogram :size="48" class="mx-auto text-brass-400" />
        <h2 class="mt-5 font-display text-3xl text-cream-50 sm:text-4xl">
          {{ t('menu.cta.title') }}
        </h2>
        <p class="mt-4 text-cream-100/80">
          {{ t('menu.cta.subtitle') }}
        </p>
        <div class="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <UiButton variant="gold" :to="localePath('/contact')">{{ t('menu.cta.findUs') }}</UiButton>
          <UiButton variant="hero-outline" :to="localePath('/histoire')">{{ t('menu.cta.history') }}</UiButton>
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

/* ── Onglets carte : barre pleine largeur, underline laiton sur l'actif ── */
.meyn-tab {
  position: relative;
  isolation: isolate;
}

.meyn-tab:focus-visible {
  outline: none;
}

/* Sous-ligne brass au focus clavier (a11y sans cadre disgracieux) */
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

/* Scrollbar cachée sur la barre d'onglets (mobile) */
.meyn-tabs > div::-webkit-scrollbar { display: none; }
.meyn-tabs > div { scrollbar-width: none; }
</style>
