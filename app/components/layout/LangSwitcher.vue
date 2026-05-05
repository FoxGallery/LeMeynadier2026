<script setup lang="ts">
import { Check, Globe } from 'lucide-vue-next'
import { PopoverContent, PopoverPortal, PopoverRoot, PopoverTrigger } from 'reka-ui'
import { cn } from '~/utils/cn'

interface Locale {
  code: 'fr' | 'en' | 'it'
  label: string
  short: string
}

const props = defineProps<{
  /** Style compact (footer) ou complet (header). */
  compact?: boolean
  class?: string
}>()

// Placeholder en attendant @nuxtjs/i18n (M4) — pour l'instant FR uniquement.
const current = ref<Locale['code']>('fr')

const locales: readonly Locale[] = [
  { code: 'fr', label: 'Français', short: 'FR' },
  { code: 'en', label: 'English', short: 'EN' },
  { code: 'it', label: 'Italiano', short: 'IT' },
]

const open = ref(false)

function pick(code: Locale['code']) {
  current.value = code
  open.value = false
}
</script>

<template>
  <PopoverRoot v-model:open="open">
    <PopoverTrigger
      as="button"
      type="button"
      :aria-label="`Changer de langue · langue actuelle : ${locales.find((l) => l.code === current)?.label}`"
      :class="cn(
        'inline-flex items-center gap-1.5 rounded-(--radius-pill) text-cream/90 transition-colors',
        'focus-visible:outline-2 focus-visible:outline-brass-500 focus-visible:outline-offset-2',
        'hover:text-brass-300',
        props.compact ? 'p-1 text-xs' : 'px-3 py-1.5 text-sm border border-walnut-700/70',
        props.class,
      )"
    >
      <Globe class="size-4" aria-hidden="true" />
      <span>{{ locales.find((l) => l.code === current)?.short }}</span>
    </PopoverTrigger>

    <PopoverPortal>
      <PopoverContent
        :side-offset="8"
        align="end"
        class="z-50 min-w-40 rounded-(--radius-card) border border-walnut-700 bg-walnut-900 p-1 text-cream shadow-(--shadow-deep) data-[state=open]:animate-in data-[state=open]:fade-in data-[state=closed]:animate-out data-[state=closed]:fade-out"
      >
        <ul role="menu" class="flex flex-col">
          <li v-for="locale in locales" :key="locale.code" role="none">
            <button
              type="button"
              role="menuitemradio"
              :aria-checked="locale.code === current"
              :class="cn(
                'flex w-full items-center justify-between gap-3 rounded-md px-3 py-2 text-sm transition-colors',
                'hover:bg-walnut-800 focus-visible:outline-2 focus-visible:outline-brass-500',
                locale.code === current && 'text-brass-300',
              )"
              :disabled="locale.code !== 'fr'"
              :title="locale.code !== 'fr' ? 'Disponible prochainement' : undefined"
              @click="pick(locale.code)"
            >
              <span class="flex items-center gap-2">
                <span class="font-medium">{{ locale.short }}</span>
                <span class="text-walnut-100/80">{{ locale.label }}</span>
              </span>
              <Check
                v-if="locale.code === current"
                class="size-4 text-brass-300"
                aria-hidden="true"
              />
              <span
                v-else-if="locale.code !== 'fr'"
                class="text-[10px] uppercase tracking-widest text-walnut-300"
              >Bientôt</span>
            </button>
          </li>
        </ul>
      </PopoverContent>
    </PopoverPortal>
  </PopoverRoot>
</template>
