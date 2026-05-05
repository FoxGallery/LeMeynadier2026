<script setup lang="ts">
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
    tagline: h?.tagline ?? '',
  }
})

const quote = computed(() => {
  const q = page.value?.quote as { text?: string; author?: string } | undefined
  return q?.text ? q : null
})
</script>

<template>
  <article class="bg-walnut-50 text-walnut-800">
    <!-- Hero éditorial sobre -->
    <section class="relative overflow-hidden bg-walnut-700 pb-20 pt-36 text-cream-50">
      <div
        aria-hidden="true"
        class="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_30%,rgba(221,193,138,0.20),transparent_70%)]"
      />
      <WoodGrain :opacity="0.16" :color="'#1a1209'" />
      <div class="relative mx-auto max-w-3xl px-6 text-center">
        <p class="font-script text-3xl text-brass-300">{{ hero.kicker }}</p>
        <h1 class="mt-2 font-display text-6xl tracking-tight text-cream-50 sm:text-7xl">
          {{ hero.title }}
        </h1>
        <GoldDivider class="mt-8 text-brass-400" />
        <p
          v-if="hero.tagline"
          class="mt-6 text-lg text-cream-100/85"
        >
          {{ hero.tagline }}
        </p>
      </div>
    </section>

    <!-- Photo grand format placeholder -->
    <figure class="relative mx-auto -mt-12 max-w-5xl px-6">
      <div
        class="aspect-[16/7] overflow-hidden rounded-(--radius-card) bg-gradient-to-br from-walnut-300 via-walnut-500 to-walnut-700 shadow-(--shadow-deep) ring-1 ring-walnut-300/50"
      >
        <div class="flex size-full items-center justify-center text-sm uppercase tracking-widest text-cream-50/85">
          Photo grand format · à intégrer
        </div>
      </div>
    </figure>

    <!-- Corps éditorial -->
    <div class="mx-auto max-w-2xl px-6 py-20">
      <div
        v-if="page"
        class="prose-meynadier"
      >
        <ContentRenderer :value="page" />
      </div>
      <p v-else class="text-walnut-700">Contenu en cours de chargement…</p>

      <!-- Bloc citation -->
      <blockquote
        v-if="quote"
        class="my-12 border-l-2 border-brass-500 pl-6 italic text-walnut-800"
      >
        <p class="font-display text-2xl leading-snug text-walnut-900">
          « {{ quote.text }} »
        </p>
        <footer class="mt-4 text-sm not-italic uppercase tracking-widest text-brass-700">
          — {{ quote.author }}
        </footer>
      </blockquote>

      <div class="mt-12 flex justify-center">
        <UiButton variant="primary" to="/carte">Découvrir la carte</UiButton>
      </div>
    </div>
  </article>
</template>

<style scoped>
/* Style éditorial pour le contenu Markdown rendu via ContentRenderer */
.prose-meynadier :deep(h2) {
  font-family: var(--font-display);
  font-size: var(--text-3xl);
  color: var(--color-walnut-900);
  letter-spacing: -0.01em;
  margin-top: 3rem;
  margin-bottom: 1.25rem;
}

.prose-meynadier :deep(h3) {
  font-family: var(--font-display);
  font-size: var(--text-2xl);
  color: var(--color-walnut-900);
  margin-top: 2rem;
  margin-bottom: 0.75rem;
}

.prose-meynadier :deep(p) {
  font-size: 1.0625rem;
  line-height: 1.75;
  color: var(--color-walnut-800);
  max-width: 65ch;
  margin-bottom: 1.25rem;
}

.prose-meynadier :deep(p strong),
.prose-meynadier :deep(strong) {
  color: var(--color-walnut-900);
  font-weight: 600;
}

.prose-meynadier :deep(a) {
  color: var(--color-brass-700);
  text-decoration: underline;
  text-underline-offset: 0.2em;
}

.prose-meynadier :deep(a:hover) {
  color: var(--color-brass-800);
}

.prose-meynadier :deep(ul) {
  list-style: disc;
  padding-left: 1.5rem;
  margin-bottom: 1.25rem;
  color: var(--color-walnut-800);
}

.prose-meynadier :deep(ul li) {
  margin-bottom: 0.5rem;
}

.prose-meynadier :deep(.callout) {
  background: var(--color-walnut-100);
  border-left: 2px solid var(--color-brass-500);
  border-radius: 0.5rem;
  padding: 1rem 1.25rem;
  margin: 2rem 0;
  font-size: 0.9375rem;
  color: var(--color-walnut-700);
}
</style>
