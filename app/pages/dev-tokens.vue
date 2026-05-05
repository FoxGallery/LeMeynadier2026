<script setup lang="ts">
useHead({
  title: 'Design tokens',
  meta: [{ name: 'robots', content: 'noindex, nofollow' }],
})

definePageMeta({
  layout: 'minimal',
})

const walnutShades = ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900', '950']
const brassShades = ['100', '300', '500', '700', '900']
const accents = [
  { name: 'cream', token: '--color-cream' },
  { name: 'burgundy', token: '--color-burgundy' },
  { name: 'leaf', token: '--color-leaf' },
  { name: 'ink', token: '--color-ink' },
]
const typeScale = [
  { name: 'xs', cls: 'text-xs' },
  { name: 'sm', cls: 'text-sm' },
  { name: 'base', cls: 'text-base' },
  { name: 'lg', cls: 'text-lg' },
  { name: 'xl', cls: 'text-xl' },
  { name: '2xl', cls: 'text-2xl' },
  { name: '3xl', cls: 'text-3xl' },
  { name: '4xl', cls: 'text-4xl' },
  { name: '5xl', cls: 'text-5xl' },
  { name: '6xl', cls: 'text-6xl' },
]
</script>

<template>
  <div class="mx-auto max-w-5xl space-y-16 px-6 py-16">
    <header>
      <p class="font-script text-3xl text-brass-500">Design system</p>
      <h1 class="mt-1 font-display text-5xl text-cream">Tokens</h1>
      <p class="mt-3 text-walnut-100/80">
        Catalogue interne — couleurs, typographie, espacements, ombres.
        Page <code class="text-brass-300">/_tokens</code> noindex.
      </p>
    </header>

    <section>
      <h2 class="font-display text-3xl text-cream">Palette · Walnut</h2>
      <div class="mt-4 grid grid-cols-3 gap-2 sm:grid-cols-6 lg:grid-cols-11">
        <div
          v-for="shade in walnutShades"
          :key="shade"
          class="overflow-hidden rounded-md border border-walnut-700"
        >
          <div class="h-16 w-full" :class="`bg-walnut-${shade}`" />
          <div class="bg-walnut-950 px-2 py-1 text-xs text-walnut-100/80">
            walnut-{{ shade }}
          </div>
        </div>
      </div>
    </section>

    <section>
      <h2 class="font-display text-3xl text-cream">Palette · Brass</h2>
      <div class="mt-4 grid grid-cols-3 gap-2 sm:grid-cols-5">
        <div
          v-for="shade in brassShades"
          :key="shade"
          class="overflow-hidden rounded-md border border-walnut-700"
        >
          <div class="h-16 w-full" :class="`bg-brass-${shade}`" />
          <div class="bg-walnut-950 px-2 py-1 text-xs text-walnut-100/80">
            brass-{{ shade }}
          </div>
        </div>
      </div>
    </section>

    <section>
      <h2 class="font-display text-3xl text-cream">Accents</h2>
      <div class="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
        <div
          v-for="a in accents"
          :key="a.name"
          class="overflow-hidden rounded-md border border-walnut-700"
        >
          <div
            class="h-16 w-full"
            :style="{ backgroundColor: `var(${a.token})` }"
          />
          <div class="bg-walnut-950 px-2 py-1 text-xs text-walnut-100/80">
            {{ a.name }}
          </div>
        </div>
      </div>
    </section>

    <section>
      <h2 class="font-display text-3xl text-cream">Typographie</h2>
      <div class="mt-4 space-y-4">
        <div>
          <p class="text-xs uppercase tracking-widest text-walnut-300">font-display · Cormorant Garamond</p>
          <p class="font-display text-5xl text-cream">Pizzas signatures, bières pression</p>
        </div>
        <div>
          <p class="text-xs uppercase tracking-widest text-walnut-300">font-body · Inter Tight</p>
          <p class="text-lg text-cream">
            Une brasserie au cœur de Cannes. Cuisine généreuse, sélection pointue de bières et de
            cocktails, ambiance pub feutrée.
          </p>
        </div>
        <div>
          <p class="text-xs uppercase tracking-widest text-walnut-300">font-script · Italianno</p>
          <p class="font-script text-5xl text-brass-500">Bienvenue chez nous</p>
        </div>
      </div>
    </section>

    <section>
      <h2 class="font-display text-3xl text-cream">Échelle typographique</h2>
      <div class="mt-4 space-y-2 rounded-lg border border-walnut-700 bg-walnut-950 p-6">
        <p
          v-for="t in typeScale"
          :key="t.name"
          :class="['font-display text-cream', t.cls]"
        >
          <span class="mr-3 inline-block w-16 font-body text-xs text-walnut-300">{{ t.name }}</span>
          Le Meynadier
        </p>
      </div>
    </section>

    <section>
      <h2 class="font-display text-3xl text-cream">Ombres</h2>
      <div class="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div class="rounded-lg bg-cream p-8 text-center text-walnut-900 shadow-(--shadow-warm)">
          shadow-warm
        </div>
        <div class="rounded-lg bg-walnut-700 p-8 text-center text-cream shadow-(--shadow-deep)">
          shadow-deep
        </div>
      </div>
    </section>

    <section>
      <h2 class="font-display text-3xl text-cream">Rayons</h2>
      <div class="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3">
        <div class="rounded-(--radius-card) bg-brass-500 p-6 text-center text-walnut-900">
          radius-card
        </div>
        <div class="rounded-(--radius-pill) bg-brass-500 px-6 py-2 text-center text-walnut-900">
          radius-pill
        </div>
      </div>
    </section>
  </div>
</template>
