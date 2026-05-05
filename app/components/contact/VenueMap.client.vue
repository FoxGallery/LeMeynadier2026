<script setup lang="ts">
import maplibregl, { type Map as MapLibreMap, type Marker } from 'maplibre-gl'
import 'maplibre-gl/dist/maplibre-gl.css'

const props = defineProps<{
  lat: number
  lng: number
  zoom?: number
  markerLabel: string
}>()

const container = ref<HTMLElement | null>(null)
let map: MapLibreMap | null = null
let marker: Marker | null = null

function buildMarkerEl(): HTMLDivElement {
  const el = document.createElement('div')
  el.setAttribute('aria-label', props.markerLabel)
  el.style.cssText = [
    'width:34px',
    'height:46px',
    'cursor:pointer',
    'transform-origin:center bottom',
  ].join(';')
  el.innerHTML = `
    <svg viewBox="0 0 34 46" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <linearGradient id="meyn-pin" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stop-color="#dcc185" />
          <stop offset="100%" stop-color="#a37231" />
        </linearGradient>
      </defs>
      <path
        d="M17 1 C8.7 1 2 7.5 2 15.5 C2 25 17 45 17 45 C17 45 32 25 32 15.5 C32 7.5 25.3 1 17 1 Z"
        fill="url(#meyn-pin)"
        stroke="#3f2d1a"
        stroke-width="1.2"
      />
      <circle cx="17" cy="16" r="6" fill="#fcf5e6" stroke="#3f2d1a" stroke-width="1" />
    </svg>
  `
  return el
}

onMounted(() => {
  if (!container.value) return

  // Tuiles CartoDB Positron — style minimaliste, clean, parfait pour
  // recevoir le filter sepia warm de notre design system.
  // Pas d'API key requise (CDN public CartoDB). Privacy-first.
  map = new maplibregl.Map({
    container: container.value,
    style: {
      version: 8,
      sources: {
        carto: {
          type: 'raster',
          tiles: [
            'https://a.basemaps.cartocdn.com/light_all/{z}/{x}/{y}@2x.png',
            'https://b.basemaps.cartocdn.com/light_all/{z}/{x}/{y}@2x.png',
            'https://c.basemaps.cartocdn.com/light_all/{z}/{x}/{y}@2x.png',
            'https://d.basemaps.cartocdn.com/light_all/{z}/{x}/{y}@2x.png',
          ],
          tileSize: 256,
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap</a> · &copy; <a href="https://carto.com/attributions" target="_blank" rel="noopener">CARTO</a>',
        },
      },
      layers: [{ id: 'carto', type: 'raster', source: 'carto' }],
    },
    center: [props.lng, props.lat],
    zoom: props.zoom ?? 17,
    attributionControl: { compact: true },
  })

  map.addControl(new maplibregl.NavigationControl({ showCompass: false }), 'top-right')

  marker = new maplibregl.Marker({ element: buildMarkerEl(), anchor: 'bottom' })
    .setLngLat([props.lng, props.lat])
    .addTo(map)
})

onBeforeUnmount(() => {
  marker?.remove()
  map?.remove()
})
</script>

<template>
  <div
    ref="container"
    class="meyn-map aspect-[16/10] w-full overflow-hidden rounded-(--radius-card) ring-1 ring-walnut-200 shadow-(--shadow-paper)"
    role="application"
    aria-label="Carte interactive — emplacement du Meynadier"
  />
</template>

<style scoped>
/* Filter "papier sépia warm" pour donner aux tuiles CartoDB Positron
 * le ton cream/wood du design system. Appliqué sur le canvas seulement
 * (pas sur les contrôles ni le marker doré). */
.meyn-map {
  position: relative;
}

.meyn-map :deep(.maplibregl-canvas) {
  filter:
    sepia(0.55)
    saturate(0.85)
    brightness(0.99)
    contrast(0.95)
    hue-rotate(-12deg);
}

/* Overlay walnut très subtil pour fondre la map dans la palette */
.meyn-map::after {
  content: '';
  position: absolute;
  inset: 0;
  pointer-events: none;
  background:
    radial-gradient(ellipse at center, transparent 60%, rgba(63, 45, 26, 0.10) 100%);
  z-index: 1;
}

/* Habillage cohérent du contrôle de zoom MapLibre */
:deep(.maplibregl-ctrl-group) {
  background-color: var(--color-cream-50);
  border: 1px solid var(--color-walnut-200);
  border-radius: 9999px;
  box-shadow: var(--shadow-paper);
  overflow: hidden;
}
:deep(.maplibregl-ctrl-group button) {
  color: var(--color-walnut-800);
  border-color: var(--color-walnut-200);
}
:deep(.maplibregl-ctrl-group button:hover) {
  background-color: var(--color-walnut-100);
  color: var(--color-brass-700);
}
:deep(.maplibregl-ctrl-attrib) {
  background-color: rgba(252, 245, 230, 0.92);
  color: var(--color-walnut-700);
  font-size: 11px;
  border-top-left-radius: 0.5rem;
  backdrop-filter: blur(4px);
}
:deep(.maplibregl-ctrl-attrib a) {
  color: var(--color-brass-700);
}
:deep(.maplibregl-ctrl-attrib a:hover) {
  color: var(--color-brass-800);
}
</style>
