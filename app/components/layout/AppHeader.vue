<script setup lang="ts">
import { Menu } from 'lucide-vue-next'
import { cn } from '~/utils/cn'

const links = useNavLinks()
const past = useScrollPast(40)
const route = useRoute()

const sheetOpen = ref(false)

function isActive(to: string) {
  if (to === '/') return route.path === '/'
  return route.path === to || route.path.startsWith(`${to}/`)
}

// Le header est toujours sur fond papier translucide — propre, lisible,
// accessible (contraste suffisant). L'ombre s'intensifie au scroll.
</script>

<template>
  <header
    :class="cn(
      'fixed inset-x-0 top-0 z-40 border-b bg-walnut-50/90 text-walnut-800 backdrop-blur-md transition-shadow duration-300',
      past ? 'border-walnut-200/70 shadow-(--shadow-paper)' : 'border-walnut-200/30',
    )"
  >
    <div class="mx-auto flex h-16 max-w-6xl items-center justify-between gap-6 px-6 sm:h-20">
      <!-- Logo / wordmark -->
      <NuxtLink
        to="/"
        aria-label="Le Meynadier — accueil"
        class="group inline-flex flex-col leading-none focus-visible:outline-2 focus-visible:outline-brass-500 focus-visible:outline-offset-2"
      >
        <span class="font-script text-xl text-brass-600 transition-colors group-hover:text-brass-700">
          Le
        </span>
        <span class="-mt-1 font-display text-2xl tracking-tight text-walnut-900 sm:text-3xl">
          Meynadier
        </span>
      </NuxtLink>

      <!-- Nav desktop -->
      <nav aria-label="Navigation principale" class="hidden items-center gap-1 lg:flex">
        <NuxtLink
          v-for="link in links"
          :key="link.to"
          :to="link.to"
          :aria-current="isActive(link.to) ? 'page' : undefined"
          :class="cn(
            'relative rounded-(--radius-pill) px-3 py-2 text-sm font-medium tracking-wide transition-colors',
            'focus-visible:outline-2 focus-visible:outline-brass-500 focus-visible:outline-offset-2',
            isActive(link.to)
              ? 'text-brass-700'
              : 'text-walnut-800 hover:text-walnut-900',
          )"
        >
          {{ link.label }}
          <span
            v-if="isActive(link.to)"
            class="absolute inset-x-3 bottom-1 h-px bg-brass-600/80"
            aria-hidden="true"
          />
        </NuxtLink>
      </nav>

      <!-- Actions (desktop) -->
      <div class="hidden items-center gap-3 lg:flex">
        <LangSwitcher />
      </div>

      <!-- Toggle mobile -->
      <button
        type="button"
        aria-label="Ouvrir le menu"
        class="inline-flex size-10 items-center justify-center rounded-md text-walnut-800 transition-colors hover:bg-walnut-100 focus-visible:outline-2 focus-visible:outline-brass-500 lg:hidden"
        @click="sheetOpen = true"
      >
        <Menu class="size-6" aria-hidden="true" />
      </button>
    </div>

    <!-- Sheet mobile -->
    <UiSheet
      v-model:open="sheetOpen"
      title="Le Meynadier"
      description="Navigation"
      hide-title
      side="right"
    >
      <nav aria-label="Navigation principale" class="flex flex-col gap-1">
        <NuxtLink
          v-for="link in links"
          :key="link.to"
          :to="link.to"
          :aria-current="isActive(link.to) ? 'page' : undefined"
          :class="cn(
            'rounded-md px-4 py-3 text-base font-medium tracking-wide transition-colors',
            'focus-visible:outline-2 focus-visible:outline-brass-500',
            isActive(link.to)
              ? 'bg-walnut-100 text-brass-700'
              : 'text-walnut-800 hover:bg-walnut-100',
          )"
          @click="sheetOpen = false"
        >
          {{ link.label }}
        </NuxtLink>
        <div class="mt-4 border-t border-walnut-200 pt-4">
          <LangSwitcher />
        </div>
      </nav>
    </UiSheet>
  </header>
</template>
