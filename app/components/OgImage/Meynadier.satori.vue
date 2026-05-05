<script setup lang="ts">
defineProps<{
  title?: string
  description?: string
  kicker?: string
}>()
</script>

<template>
  <div
    class="relative flex h-full w-full flex-col justify-between overflow-hidden"
    style="background: linear-gradient(135deg, #f6ecd9 0%, #ecdcbf 50%, #ddc59a 100%);"
  >
    <!-- Texture / nuance bois en surimpression -->
    <div
      class="absolute inset-0"
      style="background: radial-gradient(ellipse 60% 50% at 70% 30%, rgba(184, 138, 61, 0.18), transparent 70%);"
    />
    <div
      class="absolute inset-0"
      style="background: radial-gradient(ellipse 50% 40% at 20% 90%, rgba(63, 45, 26, 0.10), transparent 70%);"
    />

    <!-- Filets dorés en bordure (style comptoir luxe) -->
    <div
      class="absolute"
      style="top: 32px; left: 32px; right: 32px; bottom: 32px; border: 1px solid #b88a3d; border-radius: 12px;"
    />
    <div
      class="absolute"
      style="top: 38px; left: 38px; right: 38px; bottom: 38px; border: 1px solid rgba(184, 138, 61, 0.35); border-radius: 8px;"
    />

    <!-- En-tête : kicker -->
    <div class="relative flex w-full justify-center" style="padding-top: 80px;">
      <p
        v-if="kicker"
        style="font-family: 'Inter Tight', sans-serif; font-size: 22px; font-weight: 500; color: #6f521d; letter-spacing: 0.32em; text-transform: uppercase; margin: 0;"
      >
        {{ kicker }}
      </p>
    </div>

    <!-- Wordmark + contenu central -->
    <div class="relative flex flex-col items-center justify-center px-20" style="flex: 1;">
      <div class="flex items-baseline" style="gap: 12px; margin-bottom: 24px;">
        <span style="font-family: 'Italianno', cursive; font-size: 96px; color: #976f29; line-height: 1; padding-bottom: 6px;">
          Le
        </span>
        <span style="font-family: 'Cormorant Garamond', serif; font-size: 96px; color: #1a1209; font-weight: 600; line-height: 1; letter-spacing: -0.01em;">
          Meynadier
        </span>
      </div>

      <!-- Filet doré central -->
      <div class="flex items-center" style="gap: 12px; margin-bottom: 32px;">
        <div style="width: 60px; height: 1px; background: #b88a3d;" />
        <span style="color: #b88a3d; font-size: 16px;">◆</span>
        <div style="width: 60px; height: 1px; background: #b88a3d;" />
      </div>

      <h1
        v-if="title"
        style="font-family: 'Cormorant Garamond', serif; font-size: 60px; font-weight: 500; color: #2c1f12; line-height: 1.1; letter-spacing: -0.01em; margin: 0; text-align: center; max-width: 900px;"
      >
        {{ title }}
      </h1>

      <p
        v-if="description"
        style="font-family: 'Inter Tight', sans-serif; font-size: 26px; color: #5d4326; line-height: 1.4; margin-top: 28px; text-align: center; max-width: 880px;"
      >
        {{ description }}
      </p>
    </div>

    <!-- Pied : adresse + horaires -->
    <div class="relative flex justify-between items-center" style="padding: 60px 100px;">
      <p
        style="font-family: 'Inter Tight', sans-serif; font-size: 18px; font-weight: 500; color: #5d4326; letter-spacing: 0.18em; text-transform: uppercase; margin: 0;"
      >
        1 rue Meynadier · Cannes
      </p>
      <p
        style="font-family: 'Inter Tight', sans-serif; font-size: 18px; font-weight: 500; color: #5d4326; letter-spacing: 0.18em; text-transform: uppercase; margin: 0;"
      >
        7 j/7 · 8h – 00h30
      </p>
    </div>
  </div>
</template>
