<script setup lang="ts">
defineI18nRoute({
  paths: {
    fr: '/histoire',
    en: '/about',
    it: '/storia',
  },
})

const { data: page } = await useAsyncData('page-histoire', () =>
  queryCollection('pages').path('/pages/histoire').first(),
)

useHead({
  title: page.value?.title ?? 'Notre histoire',
  meta: [
    {
      name: 'description',
      content:
        page.value?.description ??
        'Le Meynadier — brasserie au cœur du vieux Cannes, sur la rue Meynadier.',
    },
  ],
})

const hero = computed(() => {
  const h = page.value?.hero as { kicker?: string; title?: string; tagline?: string } | undefined
  return {
    kicker: h?.kicker ?? 'Notre',
    title: h?.title ?? 'Histoire',
    tagline: h?.tagline ?? 'Le pub du vieux Cannes.',
  }
})

const quote = computed(() => {
  const q = page.value?.quote as { text?: string; author?: string } | undefined
  return q?.text ? q : null
})
</script>

<template>
  <article class="bg-walnut-50 text-walnut-800">
    <!-- Hero immersif — cohérent avec / et /carte -->
    <section class="relative isolate flex min-h-[80dvh] flex-col items-center justify-center overflow-hidden bg-walnut-900 text-cream-50">
      <img
        src="/images/ambiance/ambiance-1.jpg"
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
        <p class="mt-5 font-script text-2xl text-brass-300 sm:text-3xl">
          {{ hero.kicker }}
        </p>
        <h1 class="mt-1 font-display text-5xl leading-[0.95] tracking-tight text-cream-50 sm:text-7xl md:text-8xl">
          {{ hero.title }}
        </h1>
        <GoldDivider size="md" ornament="diamond" class="mt-8 text-brass-400" />
        <p
          v-if="hero.tagline"
          class="mt-6 max-w-xl text-base leading-relaxed text-cream-100/85 sm:text-lg"
        >
          {{ hero.tagline }}
        </p>
      </div>
    </section>

    <!-- Section éditoriale 01 : photo overlap + intro -->
    <section class="relative bg-walnut-50 pb-24 pt-20">
      <div class="mx-auto max-w-5xl px-6">
        <!-- Photo grand format en overlap léger sur le hero -->
        <figure class="-mt-32 overflow-hidden rounded-(--radius-card) shadow-(--shadow-deep) ring-1 ring-walnut-200/70">
          <img
            src="/images/ambiance/ambiance-2.jpg"
            alt="Comptoir bois noyer du Meynadier, accents laiton et plantes vertes"
            loading="lazy"
            decoding="async"
            class="aspect-[16/9] w-full object-cover"
          >
        </figure>

        <!-- Intro éditoriale -->
        <div class="mx-auto mt-16 max-w-2xl">
          <SectionLabel
            number="01"
            kicker="L'esprit du"
            title="Lieu"
            align="left"
            tagline="Sur la rue piétonne la plus vivante de Cannes, le Meynadier accueille les Cannois et les visiteurs sans interruption — du café du matin au cocktail du soir."
          />
        </div>
      </div>
    </section>

    <!-- Section éditoriale 02 : magazine 2 colonnes (texte + photo) -->
    <section class="relative overflow-hidden bg-walnut-100 py-24">
      <WoodGrain :opacity="0.08" :color="'#3f2d1a'" />
      <div class="relative mx-auto max-w-6xl px-6">
        <div class="grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-16">
          <div class="lg:col-span-7">
            <SectionLabel
              number="02"
              kicker="Une cuisine"
              title="Généreuse"
              align="left"
              tagline="Pizzas signatures à la pâte fine, paninis grillés, salades de saison — pensé pour que ce soit bon, copieux, sans chichi."
            />
            <div class="mt-8 max-w-xl space-y-5 text-base leading-relaxed text-walnut-700">
              <p>
                Côté bar : trois bières pression — <strong class="text-walnut-900">Pelforth Blonde</strong>,
                <strong class="text-walnut-900">Affligem Blonde</strong>, <strong class="text-walnut-900">Monaco</strong> —
                complétées d'une sélection internationale en bouteilles dont la
                <strong class="text-walnut-900">Triple Karmeliet</strong>, référence belge généreuse.
              </p>
              <p>
                Vins du <strong class="text-walnut-900">Domaine Source Marine</strong> et
                <strong class="text-walnut-900">Côtes du Rhône</strong> au verre, à la demi-bouteille
                ou à la bouteille. Cocktails maison, smoothies frais, frappés et milkshakes
                pour les après-midi cannois.
              </p>
            </div>
          </div>
          <figure class="overflow-hidden rounded-(--radius-card) shadow-(--shadow-paper) ring-1 ring-walnut-200/70 lg:col-span-5">
            <img
              src="/images/ambiance/ambiance-3.jpg"
              alt="Plantes vertes et détails du comptoir"
              loading="lazy"
              decoding="async"
              class="aspect-[4/5] w-full object-cover"
            >
          </figure>
        </div>
      </div>
    </section>

    <!-- Pull-quote éditorial -->
    <section v-if="quote" class="relative overflow-hidden bg-walnut-700 py-24 text-cream-50">
      <WoodGrain :opacity="0.18" :color="'#0d0905'" />
      <div
        aria-hidden="true"
        class="absolute inset-0 bg-[radial-gradient(ellipse_50%_45%_at_50%_50%,rgba(221,193,138,0.15),transparent_70%)]"
      />
      <div class="relative mx-auto max-w-3xl px-6 text-center">
        <Monogram :size="40" class="mx-auto text-brass-400" />
        <blockquote class="mt-8 font-display text-3xl leading-snug italic text-cream-50 sm:text-4xl md:text-5xl">
          « {{ quote.text }} »
        </blockquote>
        <footer v-if="quote.author" class="mt-6 text-xs uppercase tracking-[0.32em] text-brass-300">
          — {{ quote.author }}
        </footer>
      </div>
    </section>

    <!-- Section éditoriale 03 : magazine inversé -->
    <section class="relative bg-walnut-50 py-24">
      <div class="mx-auto max-w-6xl px-6">
        <div class="grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-16">
          <figure class="overflow-hidden rounded-(--radius-card) shadow-(--shadow-paper) ring-1 ring-walnut-200/70 lg:order-1 lg:col-span-5">
            <img
              src="/images/ambiance/ambiance-4.jpg"
              alt="Terrasse animée à Cannes"
              loading="lazy"
              decoding="async"
              class="aspect-[4/5] w-full object-cover"
            >
          </figure>
          <div class="lg:order-2 lg:col-span-7">
            <SectionLabel
              number="03"
              kicker="Sept jours"
              title="Sur sept"
              align="left"
              tagline="Toute l'année, sans interruption — du café du matin au dernier verre."
            />
            <div class="mt-8 max-w-xl space-y-5 text-base leading-relaxed text-walnut-700">
              <p>
                À deux pas du <strong class="text-walnut-900">marché Forville</strong> et de la
                <strong class="text-walnut-900">Croisette</strong>, Le Meynadier est l'adresse
                pour un déjeuner sur le pouce, un apéro entre amis, un dîner complice.
              </p>
              <p>
                Bois noyer massif, accents laiton, guirlandes lumineuses, terrasse animée —
                un décor chaleureux qui rappelle les arrière-pays méditerranéens.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Trio mini-stats / signatures -->
    <section class="bg-walnut-100 py-20">
      <div class="mx-auto max-w-5xl px-6">
        <SectionLabel
          number="04"
          kicker="En quelques"
          title="Chiffres"
        />
        <dl
          v-reveal:children="{ y: 24, stagger: 0.1, duration: 0.8 }"
          class="mt-12 grid gap-8 text-center sm:grid-cols-3"
        >
          <div class="rounded-(--radius-card) border border-walnut-200/70 bg-cream-50 p-8 shadow-(--shadow-paper)">
            <dt class="text-[11px] uppercase tracking-[0.3em] text-brass-700">Sur la carte</dt>
            <dd class="mt-3 font-display text-5xl text-walnut-900">9</dd>
            <p class="mt-2 text-sm text-walnut-700">pizzas signatures</p>
          </div>
          <div class="rounded-(--radius-card) border border-walnut-200/70 bg-cream-50 p-8 shadow-(--shadow-paper)">
            <dt class="text-[11px] uppercase tracking-[0.3em] text-brass-700">Au comptoir</dt>
            <dd class="mt-3 font-display text-5xl text-walnut-900">3</dd>
            <p class="mt-2 text-sm text-walnut-700">bières pression</p>
          </div>
          <div class="rounded-(--radius-card) border border-walnut-200/70 bg-cream-50 p-8 shadow-(--shadow-paper)">
            <dt class="text-[11px] uppercase tracking-[0.3em] text-brass-700">Ouverture</dt>
            <dd class="mt-3 font-display text-5xl text-walnut-900">7<span class="text-brass-600">/</span>7</dd>
            <p class="mt-2 text-sm text-walnut-700">8h — 23h</p>
          </div>
        </dl>
      </div>
    </section>

    <!-- CTA final cohérent / et /carte -->
    <section class="relative overflow-hidden bg-walnut-900 py-20 text-center text-cream-50">
      <WoodGrain :opacity="0.10" :color="'#0d0905'" />
      <div
        aria-hidden="true"
        class="absolute inset-0 bg-[radial-gradient(ellipse_50%_45%_at_50%_50%,rgba(221,193,138,0.14),transparent_70%)]"
      />
      <div class="relative mx-auto max-w-2xl px-6">
        <Monogram :size="48" class="mx-auto text-brass-400" />
        <h2 class="mt-5 font-display text-3xl text-cream-50 sm:text-4xl">
          Une table chez nous ?
        </h2>
        <p class="mt-4 text-cream-100/80">
          Sur la rue Meynadier, à deux pas du marché Forville. Tous les jours, de 8h à 23h.
        </p>
        <div class="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <UiButton variant="gold" to="/carte">Découvrir la carte</UiButton>
          <UiButton variant="hero-outline" to="/contact">Nous trouver</UiButton>
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
