<script setup lang="ts">
defineI18nRoute({
  paths: {
    fr: '/histoire',
    en: '/about',
    it: '/storia',
  },
})

const { t } = useI18n()
const localePath = useLocalePath()

useSeoMeta({
  title: () => t('seo.history.title'),
  description: () => t('seo.history.description'),
  ogTitle: () => `${t('seo.history.title')} — Le Meynadier`,
  ogDescription: () => t('seo.history.description'),
  ogType: 'article',
  twitterCard: 'summary_large_image',
})

defineOgImage('Meynadier', {
  kicker: () => t('nav.history'),
  title: () => t('seo.history.title'),
  description: () => t('seo.history.description'),
})
</script>

<template>
  <article class="bg-walnut-50 text-walnut-800">
    <!-- Hero immersif -->
    <section class="relative isolate flex min-h-[80dvh] flex-col items-center justify-center overflow-hidden bg-walnut-900 text-cream-50">
      <NuxtImg
        src="/images/ambiance/ambiance-1.jpg"
        alt=""
        aria-hidden="true"
        preload
        sizes="xs:100vw sm:100vw md:100vw lg:100vw xl:100vw 2xl:1920px"
        format="webp"
        quality="80"
        class="absolute inset-0 -z-30 size-full object-cover object-center opacity-50 motion-safe:scale-105 motion-safe:[animation:meyn-zoom-slow_28s_ease-in-out_infinite_alternate]"
      />
      <div
        aria-hidden="true"
        class="absolute inset-0 -z-20 bg-gradient-to-b from-walnut-950/85 via-walnut-900/65 to-walnut-950/95"
      />
      <div
        aria-hidden="true"
        class="absolute inset-0 -z-20 meyn-glow-hero-soft"
      />

      <div class="relative mx-auto flex max-w-3xl flex-col items-center px-6 pt-32 pb-16 text-center">
        <Monogram :size="56" class="text-brass-400" />
        <p class="mt-5 font-script text-2xl text-brass-300 sm:text-3xl">
          {{ t('history.hero.kicker') }}
        </p>
        <h1 class="mt-1 font-display text-5xl leading-[0.95] tracking-tight text-cream-50 sm:text-7xl md:text-8xl">
          {{ t('history.hero.title') }}
        </h1>
        <GoldDivider size="md" ornament="diamond" class="mt-8 text-brass-400" />
        <p class="mt-6 max-w-xl text-base leading-relaxed text-cream-100/85 sm:text-lg">
          {{ t('history.hero.tagline') }}
        </p>
      </div>
    </section>

    <!-- Section éditoriale 01 : photo overlap + intro -->
    <section class="relative bg-walnut-50 pb-24 pt-20">
      <div class="mx-auto max-w-5xl px-6">
        <figure class="-mt-32 overflow-hidden rounded-(--radius-card) shadow-(--shadow-deep) ring-1 ring-walnut-200/70">
          <NuxtImg
            src="/images/ambiance/ambiance-2.jpg"
            :alt="t('history.section1.title')"
            loading="lazy"
            decoding="async"
            width="1280"
            height="720"
            sizes="sm:100vw md:1024px"
            format="webp"
            class="aspect-[16/9] w-full object-cover"
          />
        </figure>

        <div class="mx-auto mt-16 max-w-2xl">
          <SectionLabel
            number="01"
            :kicker="t('history.section1.kicker')"
            :title="t('history.section1.title')"
            align="left"
            :tagline="t('history.section1.tagline')"
          />
        </div>
      </div>
    </section>

    <!-- Section éditoriale 02 : magazine 2 colonnes -->
    <section class="relative overflow-hidden bg-walnut-100 py-24">
      <WoodGrain :opacity="0.08" :color="'#3f2d1a'" />
      <div class="relative mx-auto max-w-6xl px-6">
        <div class="grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-16">
          <div class="lg:col-span-7">
            <SectionLabel
              number="02"
              :kicker="t('history.section2.kicker')"
              :title="t('history.section2.title')"
              align="left"
              :tagline="t('history.section2.tagline')"
            />
            <div class="mt-8 max-w-xl space-y-5 text-base leading-relaxed text-walnut-700">
              <p>{{ t('history.section2.p1') }}</p>
              <p>{{ t('history.section2.p2') }}</p>
            </div>
          </div>
          <figure class="overflow-hidden rounded-(--radius-card) shadow-(--shadow-paper) ring-1 ring-walnut-200/70 lg:col-span-5">
            <NuxtImg
              src="/images/ambiance/ambiance-3.jpg"
              :alt="t('history.section2.title')"
              loading="lazy"
              decoding="async"
              width="640"
              height="800"
              sizes="sm:100vw md:50vw lg:480px"
              format="webp"
              class="aspect-[4/5] w-full object-cover"
            />
          </figure>
        </div>
      </div>
    </section>

    <!-- Pull-quote éditorial -->
    <section class="relative overflow-hidden bg-walnut-700 py-24 text-cream-50">
      <WoodGrain :opacity="0.18" :color="'#0d0905'" />
      <div
        aria-hidden="true"
        class="absolute inset-0 meyn-glow-section-warm"
      />
      <div class="relative mx-auto max-w-3xl px-6 text-center">
        <Monogram :size="40" class="mx-auto text-brass-400" />
        <blockquote class="mt-8 font-display text-3xl leading-snug italic text-cream-50 sm:text-4xl md:text-5xl">
          « {{ t('history.quote.text') }} »
        </blockquote>
        <footer class="mt-6 text-xs uppercase tracking-[0.32em] text-brass-300">
          — {{ t('history.quote.author') }}
        </footer>
      </div>
    </section>

    <!-- Section éditoriale 03 : magazine inversé -->
    <section class="relative bg-walnut-50 py-24">
      <div class="mx-auto max-w-6xl px-6">
        <div class="grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-16">
          <figure class="overflow-hidden rounded-(--radius-card) shadow-(--shadow-paper) ring-1 ring-walnut-200/70 lg:order-1 lg:col-span-5">
            <NuxtImg
              src="/images/ambiance/ambiance-4.jpg"
              :alt="t('history.section3.title')"
              loading="lazy"
              decoding="async"
              width="640"
              height="800"
              sizes="sm:100vw md:50vw lg:480px"
              format="webp"
              class="aspect-[4/5] w-full object-cover"
            />
          </figure>
          <div class="lg:order-2 lg:col-span-7">
            <SectionLabel
              number="03"
              :kicker="t('history.section3.kicker')"
              :title="t('history.section3.title')"
              align="left"
              :tagline="t('history.section3.tagline')"
            />
            <div class="mt-8 max-w-xl space-y-5 text-base leading-relaxed text-walnut-700">
              <p>{{ t('history.section3.p1') }}</p>
              <p>{{ t('history.section3.p2') }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Trio mini-stats -->
    <section class="bg-walnut-100 py-20">
      <div class="mx-auto max-w-5xl px-6">
        <SectionLabel
          number="04"
          :kicker="t('history.stats.kicker')"
          :title="t('history.stats.title')"
        />
        <dl
          v-reveal:children="{ y: 24, stagger: 0.1, duration: 0.8 }"
          class="mt-12 grid gap-8 text-center sm:grid-cols-3"
        >
          <div class="rounded-(--radius-card) border border-walnut-200/70 bg-cream-50 p-8 shadow-(--shadow-paper)">
            <dt class="text-[11px] uppercase tracking-[0.3em] text-brass-700">{{ t('history.stats.menu') }}</dt>
            <dd class="mt-3 font-display text-5xl text-walnut-900">9</dd>
            <p class="mt-2 text-sm text-walnut-700">{{ t('history.stats.menuValue') }}</p>
          </div>
          <div class="rounded-(--radius-card) border border-walnut-200/70 bg-cream-50 p-8 shadow-(--shadow-paper)">
            <dt class="text-[11px] uppercase tracking-[0.3em] text-brass-700">{{ t('history.stats.bar') }}</dt>
            <dd class="mt-3 font-display text-5xl text-walnut-900">3</dd>
            <p class="mt-2 text-sm text-walnut-700">{{ t('history.stats.barValue') }}</p>
          </div>
          <div class="rounded-(--radius-card) border border-walnut-200/70 bg-cream-50 p-8 shadow-(--shadow-paper)">
            <dt class="text-[11px] uppercase tracking-[0.3em] text-brass-700">{{ t('history.stats.open') }}</dt>
            <dd class="mt-3 font-display text-5xl text-walnut-900">7<span class="text-brass-600">/</span>7</dd>
            <p class="mt-2 text-sm text-walnut-700">{{ t('history.stats.openValue') }}</p>
          </div>
        </dl>
      </div>
    </section>

    <!-- CTA final -->
    <section class="relative overflow-hidden bg-walnut-900 py-20 text-center text-cream-50">
      <WoodGrain :opacity="0.10" :color="'#0d0905'" />
      <div
        aria-hidden="true"
        class="absolute inset-0 meyn-glow-section"
      />
      <div class="relative mx-auto max-w-2xl px-6">
        <Monogram :size="48" class="mx-auto text-brass-400" />
        <h2 class="mt-5 font-display text-3xl text-cream-50 sm:text-4xl">
          {{ t('history.cta.title') }}
        </h2>
        <p class="mt-4 text-cream-100/80">
          {{ t('history.cta.subtitle') }}
        </p>
        <div class="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <UiButton variant="gold" :to="localePath('/carte')">{{ t('history.cta.menu') }}</UiButton>
          <UiButton variant="hero-outline" :to="localePath('/contact')">{{ t('history.cta.find') }}</UiButton>
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
