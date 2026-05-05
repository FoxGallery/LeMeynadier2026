<script setup lang="ts">
import { cn } from '~/utils/cn'

const props = defineProps<{
  /** Nombre d'ampoules le long du fil. */
  count?: number
  /** Couleur du fil — par défaut adaptée au fond clair. */
  cableColor?: string
  /** Couleur de l'ampoule allumée (verre + filament). */
  bulbColor?: string
  /** Intensité du halo (0–1). */
  glow?: number
  class?: string
}>()

const lights = computed(() => {
  const total = props.count ?? 11
  // Espacement légèrement irrégulier pour donner un aspect organique.
  return Array.from({ length: total }, (_, i) => {
    const x = ((i + 0.5) / total) * 100
    // Le fil suit une courbe — chaque ampoule est attachée à la courbe.
    // y_cable(x) = 6 - 4 * sin(π * x / 100)  ⇒ valeurs entre ~2 et ~6.
    const cableY = 6 - 4 * Math.sin((Math.PI * x) / 100)
    return {
      id: i,
      x,
      cableY,
      delay: ((i * 0.41) % 4).toFixed(2),
      duration: (3.2 + ((i * 0.73) % 2)).toFixed(2),
    }
  })
})

const cableColor = computed(() => props.cableColor ?? 'rgba(33, 21, 10, 0.55)')
const bulbColor = computed(() => props.bulbColor ?? '#ffd98a')
const haloColor = computed(() => `rgba(255, 200, 110, ${props.glow ?? 0.55})`)
</script>

<template>
  <div
    :class="cn('pointer-events-none absolute inset-x-0 top-0 h-24 w-full select-none', props.class)"
    aria-hidden="true"
    role="presentation"
  >
    <svg
      class="block h-full w-full overflow-visible"
      preserveAspectRatio="none"
      viewBox="0 0 100 24"
    >
      <!-- Halos diffus en filtre Gaussien -->
      <defs>
        <radialGradient id="meyn-halo" cx="50%" cy="50%" r="50%">
          <stop offset="0%" :stop-color="bulbColor" stop-opacity="0.95" />
          <stop offset="40%" :stop-color="haloColor" stop-opacity="0.6" />
          <stop offset="100%" :stop-color="haloColor" stop-opacity="0" />
        </radialGradient>
        <radialGradient id="meyn-bulb" cx="40%" cy="35%" r="60%">
          <stop offset="0%" stop-color="#fff5d4" />
          <stop offset="60%" :stop-color="bulbColor" />
          <stop offset="100%" stop-color="#d99a3a" />
        </radialGradient>
        <filter id="meyn-blur" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="0.6" />
        </filter>
      </defs>

      <!-- Câble en arc, dessiné en deux courbes pour un sag naturel -->
      <path
        d="M 0 2 Q 25 8 50 5.5 Q 75 3 100 2"
        fill="none"
        :stroke="cableColor"
        stroke-width="0.35"
        stroke-linecap="round"
        vector-effect="non-scaling-stroke"
      />

      <g v-for="light in lights" :key="light.id">
        <!-- Halo (premier — au fond) -->
        <circle
          :cx="light.x"
          :cy="light.cableY + 4"
          r="3.6"
          fill="url(#meyn-halo)"
          filter="url(#meyn-blur)"
          class="meyn-halo"
          :style="{
            animationDelay: `${light.delay}s`,
            animationDuration: `${light.duration}s`,
          }"
        />
        <!-- Petit fil entre câble et ampoule -->
        <line
          :x1="light.x"
          :y1="light.cableY"
          :x2="light.x"
          :y2="light.cableY + 1.4"
          :stroke="cableColor"
          stroke-width="0.18"
          vector-effect="non-scaling-stroke"
        />
        <!-- Culot doré -->
        <rect
          :x="light.x - 0.45"
          :y="light.cableY + 1.4"
          width="0.9"
          height="0.55"
          rx="0.12"
          fill="rgba(80, 56, 22, 0.85)"
        />
        <!-- Ampoule (verre + filament) en forme de poire -->
        <ellipse
          :cx="light.x"
          :cy="light.cableY + 3.2"
          rx="1.2"
          ry="1.5"
          fill="url(#meyn-bulb)"
          class="meyn-bulb"
          :style="{
            animationDelay: `${light.delay}s`,
            animationDuration: `${light.duration}s`,
          }"
        />
        <!-- Reflet brillant sur le verre -->
        <ellipse
          :cx="light.x - 0.4"
          :cy="light.cableY + 2.5"
          rx="0.25"
          ry="0.45"
          fill="rgba(255, 255, 240, 0.85)"
        />
      </g>
    </svg>
  </div>
</template>

<style scoped>
@keyframes meyn-bulb-flicker {
  0%, 100% { opacity: 1; }
  47% { opacity: 1; }
  50% { opacity: 0.82; }
  53% { opacity: 1; }
  78% { opacity: 1; }
  80% { opacity: 0.92; }
  82% { opacity: 1; }
}

@keyframes meyn-halo-pulse {
  0%, 100% { opacity: 0.85; transform: scale(1); }
  50%      { opacity: 1; transform: scale(1.08); }
}

.meyn-bulb {
  animation: meyn-bulb-flicker 3.4s ease-in-out infinite;
  transform-origin: center;
  transform-box: fill-box;
}

.meyn-halo {
  animation: meyn-halo-pulse 3.6s ease-in-out infinite;
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
