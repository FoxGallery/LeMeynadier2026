<script setup lang="ts">
interface Featured {
  name: string
  description: string
  price: number | null
  tags: string[]
}

const featured: Featured[] = [
  {
    name: 'Margarita',
    description: 'Sauce tomate, mozzarella, basilic — la classique inégalable.',
    price: null,
    tags: ['classique', 'végé'],
  },
  {
    name: 'Triple Karmeliet',
    description: 'Bière belge triple, 8,4 % — généreuse, fruitée, ronde.',
    price: null,
    tags: ['bière', 'belge', 'signature'],
  },
  {
    name: 'Spritz',
    description: 'Apérol, prosecco, eau gazeuse, orange — soleil au verre.',
    price: null,
    tags: ['cocktail', 'signature'],
  },
]
</script>

<template>
  <section
    aria-labelledby="menu-preview-title"
    class="relative bg-walnut-900 py-24"
  >
    <div class="mx-auto max-w-6xl px-6">
      <header class="text-center">
        <p class="font-script text-2xl text-brass-500">Aperçu de la</p>
        <h2 id="menu-preview-title" class="mt-1 font-display text-4xl text-cream sm:text-5xl">
          Carte
        </h2>
        <GoldDivider class="mt-6" />
        <p class="mx-auto mt-6 max-w-xl text-walnut-100/80">
          Une sélection de favoris — la carte complète vous attend en page suivante.
        </p>
      </header>

      <div class="mt-12 grid gap-6 md:grid-cols-3">
        <MenuCard
          v-for="item in featured"
          :key="item.name"
          :name="item.name"
          :description="item.description"
          :price="item.price"
          :tags="item.tags"
        />
      </div>

      <div class="mt-12 text-center">
        <UiButton variant="primary" size="lg" to="/carte">
          Voir toute la carte
        </UiButton>
      </div>
    </div>
  </section>
</template>
