<script setup lang="ts">
import { cn } from '~/utils/cn'

const props = defineProps<{
  opacity?: number
  color?: string
  class?: string
}>()

const grainSvg = computed(() => {
  const c = encodeURIComponent(props.color ?? '#1a0e07')
  // Pattern de lignes courbes irrégulières évoquant le grain de bois
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='400' height='200' viewBox='0 0 400 200'>
    <g stroke='${c}' fill='none' stroke-width='0.6'>
      <path d='M0,12 C80,8 160,18 240,14 S360,8 400,14' />
      <path d='M0,32 C80,30 160,38 240,34 S360,28 400,34' />
      <path d='M0,55 C80,50 160,60 240,56 S360,50 400,56' />
      <path d='M0,80 C80,76 160,84 240,80 S360,76 400,82' />
      <path d='M0,108 C80,104 160,112 240,108 S360,102 400,108' />
      <path d='M0,134 C80,130 160,138 240,134 S360,128 400,134' />
      <path d='M0,158 C80,154 160,162 240,158 S360,152 400,158' />
      <path d='M0,182 C80,178 160,186 240,182 S360,176 400,182' />
    </g>
    <g stroke='${c}' fill='none' stroke-width='0.4' opacity='0.6'>
      <ellipse cx='90' cy='50' rx='8' ry='42' />
      <ellipse cx='270' cy='130' rx='6' ry='32' />
    </g>
  </svg>`
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`
})

const opacityValue = computed(() => Math.max(0, Math.min(1, props.opacity ?? 0.06)))
</script>

<template>
  <div
    :class="cn('pointer-events-none absolute inset-0 -z-10 select-none bg-repeat', props.class)"
    :style="{
      backgroundImage: `url('${grainSvg}')`,
      backgroundSize: '400px 200px',
      opacity: opacityValue,
    }"
    aria-hidden="true"
    role="presentation"
  />
</template>
