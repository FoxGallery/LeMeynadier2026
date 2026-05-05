<script setup lang="ts">
import { Menu, X } from 'lucide-vue-next'
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogOverlay,
  DialogPortal,
  DialogRoot,
  DialogTitle,
} from 'reka-ui'
import { cn } from '~/utils/cn'

const past = useScrollPast(40)
const route = useRoute()

const menuOpen = ref(false)

function isActive(to: string) {
  if (to === '/') return route.path === '/'
  return route.path === to || route.path.startsWith(`${to}/`)
}

const links = [
  { to: '/', label: 'Accueil' },
  { to: '/carte', label: 'La carte' },
  { to: '/histoire', label: 'Histoire' },
  { to: '/galerie', label: 'Galerie' },
  { to: '/contact', label: 'Nous trouver' },
] as const

// Ferme le menu sur changement de route (sécurité au cas où NuxtLink ne le fait pas)
watch(
  () => route.path,
  () => {
    menuOpen.value = false
  },
)
</script>

<template>
  <header
    class="pointer-events-none fixed inset-x-0 top-0 z-40 flex justify-center px-4 pt-4 sm:pt-6"
  >
    <!-- Pill navbar centrée flottante -->
    <div
      :class="cn(
        'pointer-events-auto flex w-full max-w-5xl items-center justify-between gap-6 rounded-full border bg-walnut-50/90 px-3 py-2 backdrop-blur-md transition-all duration-300 sm:px-4',
        past
          ? 'border-walnut-200/80 shadow-[0_18px_50px_-22px_rgba(63,45,26,0.30)]'
          : 'border-walnut-200/50 shadow-[0_10px_30px_-18px_rgba(63,45,26,0.20)]',
      )"
    >
      <!-- Logo -->
      <NuxtLink
        to="/"
        aria-label="Le Meynadier — accueil"
        class="group flex items-baseline gap-1.5 whitespace-nowrap pl-3 leading-none focus-visible:outline-2 focus-visible:outline-brass-500 focus-visible:outline-offset-4"
      >
        <span class="font-script text-xl text-brass-600 transition-colors group-hover:text-brass-700 sm:text-2xl">
          Le
        </span>
        <span class="font-display text-xl tracking-[0.01em] text-walnut-900 sm:text-[1.4rem]">
          Meynadier
        </span>
      </NuxtLink>

      <!-- Nav desktop -->
      <nav
        aria-label="Navigation principale"
        class="hidden items-center lg:flex"
      >
        <NuxtLink
          v-for="link in links"
          :key="link.to"
          :to="link.to"
          :aria-current="isActive(link.to) ? 'page' : undefined"
          class="meyn-navlink px-4 py-2"
          :data-active="isActive(link.to) || undefined"
        >
          {{ link.label }}
        </NuxtLink>
      </nav>

      <!-- Lang switcher (desktop) + toggle mobile -->
      <div class="flex items-center gap-2 pr-1">
        <span class="hidden h-4 w-px bg-walnut-300 lg:block" aria-hidden="true" />
        <div class="hidden lg:block">
          <LangSwitcher />
        </div>
        <button
          type="button"
          aria-label="Ouvrir le menu"
          aria-haspopup="dialog"
          :aria-expanded="menuOpen"
          class="inline-flex size-10 items-center justify-center rounded-full text-walnut-800 transition-colors hover:bg-walnut-100 focus-visible:outline-2 focus-visible:outline-brass-500 lg:hidden"
          @click="menuOpen = true"
        >
          <Menu class="size-5" aria-hidden="true" />
        </button>
      </div>
    </div>

    <!-- Menu plein écran mobile (cinématique, cohérent avec l'esprit luxe) -->
    <DialogRoot :open="menuOpen" :modal="true" @update:open="menuOpen = $event">
      <DialogPortal>
        <DialogOverlay
          class="fixed inset-0 z-50 bg-walnut-950/70 backdrop-blur-md data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=closed]:animate-out data-[state=closed]:fade-out-0"
        />
        <DialogContent
          class="fixed inset-x-4 top-4 z-50 mx-auto flex max-h-[calc(100dvh-2rem)] w-auto max-w-2xl flex-col overflow-hidden rounded-(--radius-card) border border-walnut-200/70 bg-walnut-50 shadow-[0_30px_80px_-30px_rgba(13,9,5,0.6)] focus:outline-none data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:slide-in-from-top-4 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:slide-out-to-top-4 sm:top-6 sm:inset-x-6"
        >
          <!-- En-tête : logo + close -->
          <div class="flex items-center justify-between border-b border-walnut-200/70 px-6 py-5">
            <DialogTitle class="flex items-baseline gap-1.5 leading-none">
              <span class="font-script text-2xl text-brass-700">Le</span>
              <span class="font-display text-2xl tracking-tight text-walnut-900">Meynadier</span>
            </DialogTitle>
            <DialogDescription class="sr-only">
              Menu de navigation principal
            </DialogDescription>
            <DialogClose
              aria-label="Fermer le menu"
              class="inline-flex size-10 items-center justify-center rounded-full text-walnut-800 transition-colors hover:bg-walnut-100 focus-visible:outline-2 focus-visible:outline-brass-500"
            >
              <X class="size-5" aria-hidden="true" />
            </DialogClose>
          </div>

          <!-- Liens éditoriaux numérotés -->
          <nav
            aria-label="Navigation principale"
            class="flex flex-col divide-y divide-walnut-200/60 overflow-y-auto"
          >
            <NuxtLink
              v-for="(link, idx) in links"
              :key="link.to"
              :to="link.to"
              :aria-current="isActive(link.to) ? 'page' : undefined"
              class="group relative flex items-center justify-between gap-6 px-6 py-5 transition-colors hover:bg-walnut-100/80 focus-visible:bg-walnut-100/80 focus-visible:outline-2 focus-visible:outline-brass-500 focus-visible:-outline-offset-2"
              @click="menuOpen = false"
            >
              <div class="flex items-baseline gap-4">
                <span class="font-display text-xs tabular-nums tracking-widest text-brass-700/70">
                  {{ String(idx + 1).padStart(2, '0') }}
                </span>
                <span
                  :class="cn(
                    'font-display text-3xl tracking-tight transition-colors sm:text-4xl',
                    isActive(link.to)
                      ? 'text-brass-700'
                      : 'text-walnut-900 group-hover:text-brass-700',
                  )"
                >
                  {{ link.label }}
                </span>
              </div>
              <span
                aria-hidden="true"
                class="flex size-10 items-center justify-center rounded-full border border-walnut-300 text-walnut-700 transition-all group-hover:border-brass-500 group-hover:bg-brass-500 group-hover:text-walnut-950"
              >
                <svg viewBox="0 0 16 16" class="size-3" fill="none" stroke="currentColor" stroke-width="1.4">
                  <path d="M3 8 L13 8 M9 4 L13 8 L9 12" />
                </svg>
              </span>
            </NuxtLink>
          </nav>

          <!-- Pied : LangSwitcher + monogramme -->
          <div class="flex items-center justify-between border-t border-walnut-200/70 px-6 py-5">
            <LangSwitcher />
            <Monogram :size="32" class="text-brass-500/70" />
          </div>
        </DialogContent>
      </DialogPortal>
    </DialogRoot>
  </header>
</template>

<style scoped>
.meyn-navlink {
  position: relative;
  font-family: var(--font-body);
  font-size: 0.78rem;
  font-weight: 500;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--color-walnut-800);
  transition: color 0.2s ease;
  border-radius: 9999px;
}

.meyn-navlink::after {
  content: '';
  position: absolute;
  left: 50%;
  bottom: 0.5rem;
  height: 1px;
  width: 0;
  background-color: var(--color-brass-600);
  transition:
    width 0.35s cubic-bezier(0.2, 0.6, 0.1, 1),
    left 0.35s cubic-bezier(0.2, 0.6, 0.1, 1);
}

.meyn-navlink:hover {
  color: var(--color-walnut-950);
}

.meyn-navlink:hover::after,
.meyn-navlink[data-active]::after {
  width: calc(100% - 2rem);
  left: 1rem;
}

.meyn-navlink[data-active] {
  color: var(--color-brass-700);
}

.meyn-navlink:focus-visible {
  outline: none;
}

.meyn-navlink:focus-visible::after {
  width: calc(100% - 2rem);
  left: 1rem;
  height: 2px;
  background-color: var(--color-brass-500);
}
</style>
