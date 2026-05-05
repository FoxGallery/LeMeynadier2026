<script setup lang="ts">
import type { MenuCategory } from '~~/content.config'

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

// Récupère toutes les catégories de la collection `menu`, triées par `order`.
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

// Onglet actif piloté par le hash de l'URL (#pizzas, #bieres, …) — partage facile.
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
  return field?.fr ?? ''
}
</script>

<template>
  <section class="relative overflow-hidden bg-cream-100 pb-24 pt-32 text-walnut-800">
    <WoodGrain :opacity="0.04" :color="'#4f331b'" />

    <div class="relative mx-auto max-w-6xl px-6">
      <header class="text-center">
        <p class="font-script text-3xl text-brass-600">Notre</p>
        <h1 class="mt-1 font-display text-5xl text-walnut-900 sm:text-6xl">
          La carte
        </h1>
        <GoldDivider class="mt-6" />
        <p class="mx-auto mt-6 max-w-2xl text-walnut-700">
          Pizzas signatures, paninis, bières pression et bouteilles, vins, cocktails maison,
          smoothies, frappés, milkshakes et boissons chaudes. Tarifs en cours de vérification
          — les indications sans prix seront confirmées prochainement.
        </p>
      </header>

      <UiTabs
        v-if="activeTab && categories.length"
        v-model="activeTab"
        class="mt-12"
      >
        <div class="sticky top-20 z-30 flex justify-center">
          <UiTabsList class="max-w-full overflow-x-auto">
            <UiTabsTrigger
              v-for="cat in categories"
              :key="cat.category"
              :value="cat.category"
            >
              {{ localized(cat.label) }}
            </UiTabsTrigger>
          </UiTabsList>
        </div>

        <UiTabsContent
          v-for="cat in categories"
          :key="cat.category"
          :value="cat.category"
        >
          <div class="mt-6 text-center">
            <h2 class="font-display text-3xl text-walnut-900 sm:text-4xl">
              {{ localized(cat.label) }}
            </h2>
            <p
              v-if="cat.description?.fr"
              class="mx-auto mt-2 max-w-xl text-walnut-700"
            >
              {{ localized(cat.description) }}
            </p>
          </div>

          <div class="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <MenuCard
              v-for="item in cat.items.filter((i) => i.available !== false)"
              :key="item.slug"
              :name="localized(item.name)"
              :description="localized(item.description)"
              :price="item.price"
              :tags="item.tags"
            />
          </div>
        </UiTabsContent>
      </UiTabs>

      <div v-else class="mt-12 text-center text-walnut-600">
        Carte en cours de chargement…
      </div>
    </div>
  </section>
</template>
