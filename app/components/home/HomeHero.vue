<script setup lang="ts">
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ChevronDown } from 'lucide-vue-next'

const { t } = useI18n()
const localePath = useLocalePath()
const heroImage = ref<HTMLImageElement | null>(null)

if (import.meta.client) {
  let ctx: gsap.Context | null = null
  onMounted(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (!heroImage.value) return
    gsap.registerPlugin(ScrollTrigger)
    ctx = gsap.context(() => {
      // Parallax léger : l'image se déplace plus lentement que le scroll.
      gsap.to(heroImage.value, {
        yPercent: 12,
        ease: 'none',
        scrollTrigger: {
          trigger: heroImage.value,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })
    })
  })
  onBeforeUnmount(() => ctx?.revert())
}
</script>

<template>
  <section
    aria-labelledby="hero-title"
    class="relative isolate flex min-h-[100dvh] flex-col overflow-hidden bg-walnut-900 text-cream-50"
  >
    <!-- Photo plein écran (parallax via GSAP scrub) -->
    <img
      ref="heroImage"
      src="/images/hero/hero-1.jpg"
      alt=""
      aria-hidden="true"
      class="absolute inset-0 -z-30 size-full object-cover object-center opacity-70 motion-safe:scale-110"
    >
    <!-- Voile sombre + halo doré + vignette -->
    <div
      aria-hidden="true"
      class="absolute inset-0 -z-20 bg-gradient-to-b from-walnut-950/85 via-walnut-900/55 to-walnut-950/95"
    />
    <div
      aria-hidden="true"
      class="absolute inset-0 -z-20 bg-[radial-gradient(ellipse_55%_45%_at_50%_35%,rgba(221,193,138,0.22),transparent_70%)]"
    />
    <div
      aria-hidden="true"
      class="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,transparent_55%,rgba(13,9,5,0.6)_100%)]"
    />

    <!-- Contenu centré (flex-1 pour prendre l'espace, scroll indicator collé en bas) -->
    <div class="relative flex flex-1 items-center justify-center px-6 pb-16 pt-36 sm:pt-44">
      <div class="mx-auto flex max-w-4xl flex-col items-center text-center">
        <!-- Monogramme -->
        <Monogram
          :size="72"
          class="text-brass-400 motion-safe:meyn-fade-up sm:size-20"
        />

        <!-- Kicker script -->
        <p class="mt-6 font-script text-2xl text-brass-300 motion-safe:meyn-fade-up motion-safe:[animation-delay:120ms] sm:text-3xl">
          {{ t('home.hero.kicker') }}
        </p>

        <!-- Titre monumental -->
        <h1
          id="hero-title"
          class="mt-1 font-display text-5xl leading-[0.95] tracking-tight text-cream-50 motion-safe:meyn-fade-up motion-safe:[animation-delay:240ms] sm:text-7xl md:text-8xl lg:text-9xl"
        >
          {{ t('home.hero.title') }}
        </h1>

        <GoldDivider
          size="md"
          ornament="diamond"
          class="mt-8 text-brass-400 motion-safe:meyn-fade-up motion-safe:[animation-delay:360ms]"
        />

        <p class="mt-6 max-w-xl text-base leading-relaxed text-cream-100/90 motion-safe:meyn-fade-up motion-safe:[animation-delay:480ms] sm:text-lg">
          {{ t('home.hero.tagline1') }}<br>
          {{ t('home.hero.tagline2') }}
        </p>

        <p class="mt-3 text-[10px] uppercase tracking-[0.4em] text-brass-300 motion-safe:meyn-fade-up motion-safe:[animation-delay:560ms] sm:text-xs">
          {{ t('home.hero.categories') }}
        </p>

        <div class="mt-10 flex flex-col gap-4 motion-safe:meyn-fade-up motion-safe:[animation-delay:680ms] sm:flex-row">
          <UiButton variant="primary" size="lg" :to="localePath('/carte')">{{ t('common.viewMenu') }}</UiButton>
          <UiButton variant="hero-outline" size="lg" :to="localePath('/contact')">{{ t('common.findUs') }}</UiButton>
        </div>
      </div>
    </div>

    <!-- Scroll indicator en flux normal pour ne pas chevaucher les CTA -->
    <a
      href="#signature"
      :aria-label="t('common.discover')"
      class="relative mx-auto mb-6 inline-flex flex-col items-center gap-1 text-[10px] uppercase tracking-[0.3em] text-cream-100/65 transition-colors hover:text-brass-300 focus-visible:outline-2 focus-visible:outline-brass-400 focus-visible:outline-offset-4"
    >
      <span>{{ t('common.discover') }}</span>
      <ChevronDown class="size-4 motion-safe:animate-bounce" aria-hidden="true" />
    </a>

    <!-- Coordonnées subtiles en haut à droite (desktop seulement) -->
    <div
      class="pointer-events-none absolute right-8 top-32 hidden flex-col items-end gap-1 text-right text-[10px] uppercase tracking-[0.3em] text-cream-100/55 lg:flex"
      aria-hidden="true"
    >
      <span>Cannes · 06400</span>
      <span>Rue Meynadier</span>
    </div>
  </section>
</template>

<style scoped>
@keyframes meyn-zoom-slow {
  from { transform: scale(1.05); }
  to   { transform: scale(1.10); }
}

@keyframes meyn-fade-up-kf {
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
}

.meyn-fade-up {
  animation: meyn-fade-up-kf 0.9s cubic-bezier(0.2, 0.6, 0.1, 1) both;
}

@media (prefers-reduced-motion: reduce) {
  .meyn-fade-up { animation: none; }
}
</style>
