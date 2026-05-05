<script setup lang="ts">
import { cn } from '~/utils/cn'

const props = defineProps<{
  count?: number
  class?: string
}>()

const lights = computed(() => {
  const total = props.count ?? 9
  return Array.from({ length: total }, (_, i) => ({
    id: i,
    x: ((i + 0.5) / total) * 100,
    delay: (i * 0.37) % 4,
    duration: 2.4 + ((i * 0.7) % 2),
  }))
})
</script>

<template>
  <div
    :class="cn('pointer-events-none absolute inset-x-0 top-0 h-12 w-full select-none', props.class)"
    aria-hidden="true"
    role="presentation"
  >
    <svg
      class="block h-full w-full"
      preserveAspectRatio="none"
      viewBox="0 0 100 12"
    >
      <!-- Câble en arc -->
      <path
        d="M0 1 Q50 8 100 1"
        fill="none"
        stroke="rgba(60, 36, 20, 0.7)"
        stroke-width="0.3"
        vector-effect="non-scaling-stroke"
      />

      <g v-for="light in lights" :key="light.id">
        <!-- Fil de l'ampoule -->
        <line
          :x1="light.x"
          :x2="light.x"
          y1="1"
          y2="3"
          stroke="rgba(60, 36, 20, 0.7)"
          stroke-width="0.2"
          vector-effect="non-scaling-stroke"
        />
        <!-- Halo -->
        <circle
          :cx="light.x"
          cy="4"
          r="2"
          fill="rgba(255, 200, 130, 0.18)"
          class="meyn-halo"
          :style="{
            animationDelay: `${light.delay}s`,
            animationDuration: `${light.duration}s`,
          }"
        />
        <!-- Ampoule -->
        <circle
          :cx="light.x"
          cy="4"
          r="0.7"
          fill="#f6e7c2"
          class="meyn-bulb"
          :style="{
            animationDelay: `${light.delay}s`,
            animationDuration: `${light.duration}s`,
          }"
        />
      </g>
    </svg>
  </div>
</template>

<style scoped>
@keyframes bulb-flicker {
  0%, 100% { opacity: 0.95; }
  47% { opacity: 0.95; }
  50% { opacity: 0.7; }
  53% { opacity: 0.95; }
  78% { opacity: 0.95; }
  80% { opacity: 0.85; }
  82% { opacity: 0.95; }
}

@keyframes halo-pulse {
  0%, 100% { transform: scale(1); opacity: 0.18; }
  50% { transform: scale(1.12); opacity: 0.28; }
}

.meyn-bulb {
  animation: bulb-flicker 2.8s ease-in-out infinite;
  transform-origin: center;
}

.meyn-halo {
  animation: halo-pulse 3.2s ease-in-out infinite;
  transform-origin: center;
  transform-box: fill-box;
}

@media (prefers-reduced-motion: reduce) {
  .meyn-bulb,
  .meyn-halo {
    animation: none;
  }
}
</style>
