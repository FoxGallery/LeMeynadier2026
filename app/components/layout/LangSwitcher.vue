<script setup lang="ts">
import { Check, Globe } from 'lucide-vue-next'
import { PopoverContent, PopoverPortal, PopoverRoot, PopoverTrigger } from 'reka-ui'
import { cn } from '~/utils/cn'

const props = defineProps<{
  /** Style compact (footer) ou complet (header). */
  compact?: boolean
  /** True si le switcher est sur fond foncé (hero). Sinon adapte au clair. */
  onDark?: boolean
  class?: string
}>()

const { locale, locales, t } = useI18n()
const switchLocalePath = useSwitchLocalePath()

interface LocaleOption {
  code: 'fr' | 'en' | 'it'
  short: string
  label: string
}

const items = computed<LocaleOption[]>(() => {
  return (locales.value as { code: string; name?: string }[]).map((l) => ({
    code: l.code as LocaleOption['code'],
    short: l.code.toUpperCase(),
    label: l.name ?? l.code,
  }))
})

const open = ref(false)
const current = computed(() => items.value.find((l) => l.code === locale.value))

function pick(code: LocaleOption['code']) {
  open.value = false
  // Navigation se fait via NuxtLink avec :to ; pas besoin de set locale manuellement
  // (i18n s'en occupe). Cookie persisté automatiquement.
  void code
}
</script>

<template>
  <PopoverRoot v-model:open="open">
    <PopoverTrigger
      as="button"
      type="button"
      :aria-label="`${t('lang.label')} · ${t('lang.current')} : ${current?.label}`"
      :class="cn(
        'inline-flex items-center gap-1.5 transition-colors',
        'focus-visible:outline-2 focus-visible:outline-brass-500 focus-visible:outline-offset-4',
        props.onDark
          ? 'text-cream-100/85 hover:text-brass-300'
          : 'text-walnut-800 hover:text-brass-700',
        props.compact ? 'p-1 text-xs' : 'text-xs uppercase tracking-[0.22em]',
        props.class,
      )"
    >
      <Globe class="size-4" aria-hidden="true" />
      <span>{{ current?.short }}</span>
    </PopoverTrigger>

    <PopoverPortal>
      <PopoverContent
        :side-offset="8"
        align="end"
        class="z-50 min-w-40 rounded-(--radius-card) border border-walnut-200 bg-cream-50 p-1 text-walnut-800 shadow-(--shadow-deep) data-[state=open]:animate-in data-[state=open]:fade-in data-[state=closed]:animate-out data-[state=closed]:fade-out"
      >
        <ul role="menu" class="flex flex-col">
          <li v-for="item in items" :key="item.code" role="none">
            <NuxtLink
              :to="switchLocalePath(item.code)"
              role="menuitemradio"
              :aria-checked="item.code === locale"
              :class="cn(
                'flex w-full items-center justify-between gap-3 rounded-md px-3 py-2 text-sm transition-colors',
                'hover:bg-walnut-100 focus-visible:outline-2 focus-visible:outline-brass-500',
                item.code === locale && 'text-brass-700',
              )"
              @click="pick(item.code)"
            >
              <span class="flex items-center gap-2">
                <span class="font-medium">{{ item.short }}</span>
                <span class="text-walnut-700">{{ item.label }}</span>
              </span>
              <Check
                v-if="item.code === locale"
                class="size-4 text-brass-600"
                aria-hidden="true"
              />
            </NuxtLink>
          </li>
        </ul>
      </PopoverContent>
    </PopoverPortal>
  </PopoverRoot>
</template>
