<script setup lang="ts">
import { Beer, Coffee, MapPin, Pizza } from 'lucide-vue-next'

useHead({
  title: 'Composants',
  meta: [{ name: 'robots', content: 'noindex, nofollow' }],
})

definePageMeta({ layout: 'minimal' })

const sheetOpen = ref(false)

const sampleItems = [
  {
    name: 'Margarita',
    description: 'Sauce tomate, mozzarella, basilic frais',
    price: 9,
    tags: ['classique', 'végé'],
  },
  {
    name: 'Diavola',
    description: 'Sauce tomate, mozzarella, chorizo, piment',
    price: 12,
    tags: ['épicé', 'signature'],
  },
  {
    name: 'Triple Karmeliet',
    description: 'Bière belge triple, 8.4%',
    price: 6.5,
    tags: ['bière', '33cl'],
  },
  {
    name: 'Café noisette',
    description: 'Espresso, mousse de lait noisette',
    price: null,
  },
]
</script>

<template>
  <div class="relative">
    <StringLights class="!h-16" :count="11" />
    <WoodGrain :opacity="0.05" />

    <div class="mx-auto max-w-6xl space-y-16 px-6 py-14 sm:py-20 lg:py-24">
      <header>
        <p class="font-script text-3xl text-brass-500">Design system</p>
        <h1 class="mt-1 font-display text-5xl text-cream">Composants</h1>
        <p class="mt-3 text-walnut-100/80">
          Catalogue interne (noindex). Voir aussi
          <NuxtLink to="/dev-tokens" class="text-brass-300 hover:underline">/dev-tokens</NuxtLink>
          pour les tokens.
        </p>
      </header>

      <GoldDivider size="lg" ornament="diamond" />

      <!-- Buttons -->
      <section>
        <h2 class="font-display text-3xl text-cream">UiButton</h2>
        <div class="mt-6 flex flex-wrap items-center gap-4">
          <UiButton variant="primary">
            <template #leading><Beer class="size-4" aria-hidden="true" /></template>
            Voir la carte
          </UiButton>
          <UiButton variant="outline">Outline</UiButton>
          <UiButton variant="ghost">Ghost</UiButton>
          <UiButton variant="link">Lien inline</UiButton>
        </div>
        <div class="mt-4 flex flex-wrap items-center gap-4">
          <UiButton size="sm">Small</UiButton>
          <UiButton size="md">Medium</UiButton>
          <UiButton size="lg">Large</UiButton>
          <UiButton disabled>Disabled</UiButton>
          <UiButton loading>Loading</UiButton>
        </div>
      </section>

      <GoldDivider ornament="leaf" />

      <!-- Tabs -->
      <section>
        <h2 class="font-display text-3xl text-cream">UiTabs</h2>
        <UiTabs default-value="pizzas" class="mt-6">
          <UiTabsList>
            <UiTabsTrigger value="pizzas">
              <Pizza class="size-4" aria-hidden="true" /> Pizzas
            </UiTabsTrigger>
            <UiTabsTrigger value="bieres">
              <Beer class="size-4" aria-hidden="true" /> Bières
            </UiTabsTrigger>
            <UiTabsTrigger value="cafes">
              <Coffee class="size-4" aria-hidden="true" /> Cafés
            </UiTabsTrigger>
          </UiTabsList>
          <UiTabsContent value="pizzas">
            <p class="text-walnut-100/80">Liste des pizzas signatures…</p>
          </UiTabsContent>
          <UiTabsContent value="bieres">
            <p class="text-walnut-100/80">Pression et bouteilles.</p>
          </UiTabsContent>
          <UiTabsContent value="cafes">
            <p class="text-walnut-100/80">Boissons chaudes.</p>
          </UiTabsContent>
        </UiTabs>
      </section>

      <GoldDivider />

      <!-- Cards -->
      <section>
        <h2 class="font-display text-3xl text-cream">UiCard</h2>
        <div class="mt-6 grid gap-6 sm:grid-cols-2">
          <UiCard variant="default">
            <h3 class="font-display text-xl">Card · default</h3>
            <p class="mt-2 text-sm text-walnut-100/80">
              Verre fumé walnut, bordure subtile, ombre profonde.
            </p>
          </UiCard>
          <UiCard variant="paper">
            <h3 class="font-display text-xl">Card · paper</h3>
            <p class="mt-2 text-sm text-walnut-700">
              Papier crème pour la carte, ombre chaude.
            </p>
          </UiCard>
        </div>
      </section>

      <GoldDivider />

      <!-- MenuCard -->
      <section>
        <h2 class="font-display text-3xl text-cream">MenuCard</h2>
        <div class="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <MenuCard
            v-for="item in sampleItems"
            :key="item.name"
            :name="item.name"
            :description="item.description"
            :price="item.price"
            :tags="item.tags"
          />
        </div>
      </section>

      <GoldDivider />

      <!-- Badges + Tooltip + Separator -->
      <section>
        <h2 class="font-display text-3xl text-cream">Badge / Tooltip / Separator</h2>
        <div class="mt-6 flex flex-wrap items-center gap-3">
          <UiBadge>Default</UiBadge>
          <UiBadge variant="outline">Outline</UiBadge>
          <UiBadge variant="muted">Muted</UiBadge>
          <UiBadge variant="burgundy">Signature</UiBadge>
          <UiTooltip label="Cannes — rue Meynadier">
            <button
              type="button"
              class="inline-flex items-center gap-1 text-brass-300 hover:text-cream"
            >
              <MapPin class="size-4" aria-hidden="true" /> Hover me
            </button>
          </UiTooltip>
        </div>
        <UiSeparator class="my-6" />
        <p class="text-sm text-walnut-100/70">Texte sous le séparateur.</p>
      </section>

      <GoldDivider />

      <!-- Dialog + Sheet -->
      <section>
        <h2 class="font-display text-3xl text-cream">Dialog & Sheet</h2>
        <div class="mt-6 flex flex-wrap gap-4">
          <UiDialog title="Le Meynadier" description="Brasserie · Pizzeria · Pub à Cannes">
            <template #trigger>
              <UiButton variant="outline">Ouvrir un Dialog</UiButton>
            </template>
            <p class="text-walnut-100/80">
              Contenu du dialog. Focus trap actif, fermeture par Échap, par clic sur l'overlay,
              ou via le bouton X.
            </p>
          </UiDialog>

          <UiButton variant="outline" @click="sheetOpen = true">Ouvrir un Sheet</UiButton>
          <UiSheet
            v-model:open="sheetOpen"
            title="Menu"
            description="Side sheet pour mobile / nav latérale"
          >
            <ul class="space-y-3 text-walnut-100/80">
              <li>Accueil</li>
              <li>Carte</li>
              <li>Histoire</li>
              <li>Galerie</li>
              <li>Contact</li>
            </ul>
          </UiSheet>
        </div>
      </section>

      <GoldDivider size="lg" ornament="diamond" />

      <!-- Effects -->
      <section>
        <h2 class="font-display text-3xl text-cream">Effets signature</h2>
        <div class="mt-6 grid gap-6 sm:grid-cols-2">
          <div class="relative h-32 overflow-hidden rounded-(--radius-card) bg-walnut-800">
            <StringLights :count="7" />
            <p class="pt-12 text-center text-sm text-walnut-100/70">StringLights</p>
          </div>
          <div class="relative h-32 overflow-hidden rounded-(--radius-card) bg-walnut-800">
            <WoodGrain :opacity="0.15" />
            <p class="pt-12 text-center text-sm text-walnut-100/70">WoodGrain</p>
          </div>
        </div>
        <div class="mt-6 flex flex-col items-center gap-4">
          <GoldDivider size="sm" ornament="dot" />
          <GoldDivider size="md" ornament="leaf" />
          <GoldDivider size="lg" ornament="diamond" />
        </div>
      </section>
    </div>
  </div>
</template>
