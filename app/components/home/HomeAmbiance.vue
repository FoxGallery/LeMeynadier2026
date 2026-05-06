<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()
</script>

<template>
  <section
    aria-labelledby="ambiance-title"
    class="relative overflow-hidden bg-walnut-700 py-16 sm:py-24 lg:py-32 text-cream-50"
  >
    <WoodGrain :opacity="0.18" :color="'#0d0905'" />
    <div
      aria-hidden="true"
      class="absolute inset-0 meyn-glow-ambiance"
    />

    <div class="relative mx-auto max-w-6xl px-6">
      <div class="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <!-- Texte éditorial -->
        <div class="lg:col-span-5 lg:pt-12">
          <SectionLabel
            number="04"
            :kicker="t('home.ambiance.kicker')"
            :title="t('home.ambiance.title')"
            align="left"
            tone="light"
          />

          <div class="mt-8 space-y-5 text-base leading-relaxed text-cream-100/85">
            <p>{{ t('home.ambiance.p1') }}</p>

            <blockquote class="border-l-2 border-brass-400 pl-5 font-display text-2xl italic leading-snug text-cream-50">
              « {{ t('home.ambiance.quote') }} »
            </blockquote>

            <p>{{ t('home.ambiance.p2') }}</p>
          </div>

          <UiButton variant="hero-outline" :to="localePath('/histoire')" class="mt-10">
            {{ t('common.ourHistory') }}
          </UiButton>
        </div>

        <!-- Mosaïque éditoriale.
             Mobile : 2 colonnes empilées (chaque tuile en aspect ratio fixe
             pour rester lisible, image principale full-width).
             Desktop (sm+) : grille magazine 6×8 avec col/row-spans variables. -->
        <div class="lg:col-span-7">
          <div class="grid grid-cols-2 gap-3 sm:grid-cols-6 sm:grid-rows-8 sm:gap-4">
            <div class="col-span-2 aspect-[4/3] overflow-hidden rounded-(--radius-card) shadow-(--shadow-deep) ring-1 ring-cream-100/10 sm:col-span-4 sm:row-span-5 sm:aspect-auto">
              <NuxtImg
                src="/images/ambiance/ambiance-1.jpg"
                alt=""
                loading="lazy"
                decoding="async"
                width="1200"
                height="900"
                sizes="sm:100vw md:600px lg:800px"
                format="webp"
                class="size-full object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>
            <div class="aspect-square overflow-hidden rounded-(--radius-card) shadow-(--shadow-deep) ring-1 ring-cream-100/10 sm:col-span-2 sm:row-span-3 sm:aspect-auto">
              <NuxtImg
                src="/images/ambiance/ambiance-2.jpg"
                alt=""
                loading="lazy"
                decoding="async"
                width="800"
                height="600"
                sizes="sm:50vw md:400px"
                format="webp"
                class="size-full object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>
            <div class="aspect-square overflow-hidden rounded-(--radius-card) shadow-(--shadow-deep) ring-1 ring-cream-100/10 sm:col-span-2 sm:row-span-2 sm:aspect-auto">
              <NuxtImg
                src="/images/ambiance/ambiance-3.jpg"
                alt=""
                loading="lazy"
                decoding="async"
                width="800"
                height="600"
                sizes="sm:50vw md:400px"
                format="webp"
                class="size-full object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>
            <div class="aspect-square overflow-hidden rounded-(--radius-card) shadow-(--shadow-deep) ring-1 ring-cream-100/10 sm:col-span-3 sm:row-span-3 sm:aspect-auto">
              <NuxtImg
                src="/images/ambiance/ambiance-4.jpg"
                alt=""
                loading="lazy"
                decoding="async"
                width="800"
                height="600"
                sizes="sm:50vw md:500px"
                format="webp"
                class="size-full object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>
            <div class="flex aspect-square items-center justify-center overflow-hidden rounded-(--radius-card) bg-walnut-800 ring-1 ring-cream-100/10 shadow-(--shadow-deep) sm:col-span-3 sm:row-span-3 sm:aspect-auto">
              <div class="text-center">
                <Monogram :size="56" class="mx-auto text-brass-400" />
                <p class="mt-3 font-script text-2xl text-brass-300">Le Meynadier</p>
                <p class="text-xs uppercase tracking-[0.3em] text-cream-100/60">Cannes · 2026</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
