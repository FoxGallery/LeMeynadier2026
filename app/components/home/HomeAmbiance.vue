<template>
  <section
    aria-labelledby="ambiance-title"
    class="relative overflow-hidden bg-walnut-100 py-28 text-walnut-800"
  >
    <WoodGrain :opacity="0.10" :color="'#3f2d1a'" />

    <div class="relative mx-auto max-w-6xl px-6">
      <div class="grid gap-12 lg:grid-cols-2 lg:gap-20">
        <!-- Texte -->
        <div class="lg:pr-6">
          <p class="font-script text-2xl text-brass-700">Au cœur du</p>
          <h2 id="ambiance-title" class="mt-1 font-display text-4xl text-walnut-900 sm:text-5xl">
            vieux Cannes
          </h2>
          <GoldDivider size="sm" ornament="leaf" class="!ml-0 mt-6 text-brass-700" />

          <div class="mt-8 space-y-5 text-base leading-relaxed text-walnut-700">
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

        <!-- Galerie miniature en placeholders bois warm -->
        <div class="grid grid-cols-2 grid-rows-3 gap-3 sm:gap-4">
          <div
            class="row-span-2 overflow-hidden rounded-(--radius-card) bg-gradient-to-br from-walnut-300 to-walnut-500 ring-1 ring-walnut-300/60 shadow-(--shadow-paper)"
          >
            <div class="flex size-full items-center justify-center text-xs uppercase tracking-widest text-cream-50/85">
              Photo · 1
            </div>
          </div>
          <div
            class="overflow-hidden rounded-(--radius-card) bg-gradient-to-br from-walnut-200 to-walnut-400 ring-1 ring-walnut-300/60 shadow-(--shadow-paper)"
          >
            <div class="flex size-full items-center justify-center text-xs uppercase tracking-widest text-cream-50/85">
              Photo · 2
            </div>
          </div>
          <div
            class="overflow-hidden rounded-(--radius-card) bg-gradient-to-br from-brass-300 to-brass-600 ring-1 ring-brass-500/40 shadow-(--shadow-paper)"
          >
            <div class="flex size-full items-center justify-center text-xs uppercase tracking-widest text-walnut-900/90">
              Photo · 3
            </div>
          </div>
          <div
            class="col-span-2 overflow-hidden rounded-(--radius-card) bg-gradient-to-r from-walnut-300 via-walnut-400 to-walnut-300 ring-1 ring-walnut-300/60 shadow-(--shadow-paper)"
          >
            <div class="flex size-full items-center justify-center text-xs uppercase tracking-widest text-cream-50/85">
              À intégrer dès réception des photos optimisées
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
