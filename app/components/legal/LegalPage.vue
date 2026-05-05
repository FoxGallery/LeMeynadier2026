<script setup lang="ts">
const props = defineProps<{
  /** Path complet de la page dans la collection (ex: '/pages/mentions-legales'). */
  path: string
  /** Titre fallback si la frontmatter est vide. */
  fallbackTitle: string
  /** Description fallback. */
  fallbackDescription: string
}>()

const { data: page } = await useAsyncData(`page-${props.path}`, () =>
  queryCollection('pages').path(props.path).first(),
)

useHead({
  title: page.value?.title ?? props.fallbackTitle,
  meta: [
    {
      name: 'description',
      content: page.value?.description ?? props.fallbackDescription,
    },
  ],
})

const hero = computed(() => {
  const h = page.value?.hero as { kicker?: string; title?: string; tagline?: string } | undefined
  return {
    kicker: h?.kicker ?? '',
    title: h?.title ?? props.fallbackTitle,
    tagline: h?.tagline ?? '',
  }
})
</script>

<template>
  <article class="bg-walnut-50 text-walnut-800">
    <!-- Hero éditorial sobre -->
    <section class="bg-cream-100 pb-12 pt-32">
      <div class="mx-auto max-w-3xl px-6 text-center">
        <p v-if="hero.kicker" class="font-script text-3xl text-brass-700">
          {{ hero.kicker }}
        </p>
        <h1 class="mt-2 font-display text-5xl text-walnut-900 sm:text-6xl">
          {{ hero.title }}
        </h1>
        <GoldDivider class="mt-6 text-brass-600" />
        <p
          v-if="hero.tagline"
          class="mt-6 text-walnut-700"
        >
          {{ hero.tagline }}
        </p>
      </div>
    </section>

    <!-- Corps Markdown -->
    <div class="mx-auto max-w-2xl px-6 py-16">
      <div v-if="page" class="prose-meynadier">
        <ContentRenderer :value="page" />
      </div>
      <p v-else class="text-walnut-700">Contenu en cours de chargement…</p>
    </div>
  </article>
</template>

<style scoped>
.prose-meynadier :deep(h2) {
  font-family: var(--font-display);
  font-size: var(--text-2xl);
  color: var(--color-walnut-900);
  letter-spacing: -0.01em;
  margin-top: 2.5rem;
  margin-bottom: 1rem;
}

.prose-meynadier :deep(h3) {
  font-family: var(--font-display);
  font-size: var(--text-xl);
  color: var(--color-walnut-900);
  margin-top: 1.75rem;
  margin-bottom: 0.5rem;
}

.prose-meynadier :deep(p) {
  font-size: 1rem;
  line-height: 1.75;
  color: var(--color-walnut-800);
  margin-bottom: 1rem;
}

.prose-meynadier :deep(p strong),
.prose-meynadier :deep(strong) {
  color: var(--color-walnut-900);
  font-weight: 600;
}

.prose-meynadier :deep(em) {
  color: var(--color-walnut-600);
  font-style: italic;
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
