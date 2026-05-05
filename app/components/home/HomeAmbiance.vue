<template>
  <section
    aria-labelledby="ambiance-title"
    class="relative bg-walnut-950 py-24"
  >
    <WoodGrain :opacity="0.06" />

    <div class="mx-auto max-w-6xl px-6">
      <div class="grid gap-12 lg:grid-cols-2 lg:gap-20">
        <!-- Texte -->
        <div class="lg:pr-6">
          <p class="font-script text-2xl text-brass-500">Au coeur du</p>
          <h2 id="ambiance-title" class="mt-1 font-display text-4xl text-cream sm:text-5xl">
            vieux Cannes
          </h2>
          <GoldDivider size="sm" ornament="leaf" class="!ml-0 mt-6" />

          <div class="mt-8 space-y-5 text-base leading-relaxed text-walnut-100/85">
            <p>
              Sur la rue Meynadier, à deux pas du marché Forville et de la Croisette, Le Meynadier
              vous accueille dans un décor chaleureux : bois noyer massif, accents laiton,
              guirlandes lumineuses, terrasse animée.
            </p>
            <p>
              Du café du matin au cocktail du soir, c'est l'adresse pour un déjeuner sur le pouce,
              un apéro entre amis ou un dîner complice — toute l'année, sept jours sur sept.
            </p>
          </div>

          <UiButton variant="ghost" to="/histoire" class="mt-8">
            Notre histoire
          </UiButton>
        </div>

        <!-- Galerie miniature -->
        <div class="grid grid-cols-2 grid-rows-3 gap-3 sm:gap-4">
          <div
            class="row-span-2 overflow-hidden rounded-(--radius-card) bg-gradient-to-br from-walnut-700 to-walnut-900 ring-1 ring-walnut-700"
          >
            <div class="flex size-full items-center justify-center text-xs uppercase tracking-widest text-walnut-300/60">
              Photo · 1
            </div>
          </div>
          <div
            class="overflow-hidden rounded-(--radius-card) bg-gradient-to-br from-walnut-800 to-walnut-950 ring-1 ring-walnut-700"
          >
            <div class="flex size-full items-center justify-center text-xs uppercase tracking-widest text-walnut-300/60">
              Photo · 2
            </div>
          </div>
          <div
            class="overflow-hidden rounded-(--radius-card) bg-gradient-to-br from-brass-700/30 to-walnut-900 ring-1 ring-walnut-700"
          >
            <div class="flex size-full items-center justify-center text-xs uppercase tracking-widest text-brass-300/60">
              Photo · 3
            </div>
          </div>
          <div
            class="col-span-2 overflow-hidden rounded-(--radius-card) bg-gradient-to-r from-walnut-800 via-walnut-700 to-walnut-900 ring-1 ring-walnut-700"
          >
            <div class="flex size-full items-center justify-center text-xs uppercase tracking-widest text-walnut-300/60">
              À intégrer dès réception des photos optimisées
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
