<template>
  <section
    aria-labelledby="ambiance-title"
    class="relative overflow-hidden bg-walnut-700 py-32 text-cream-50"
  >
    <WoodGrain :opacity="0.18" :color="'#0d0905'" />
    <div
      aria-hidden="true"
      class="absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_50%_50%,rgba(221,193,138,0.10),transparent_70%)]"
    />

    <div class="relative mx-auto max-w-6xl px-6">
      <div class="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <!-- Texte éditorial -->
        <div class="lg:col-span-5 lg:pt-12">
          <SectionLabel
            number="04"
            kicker="Au cœur du"
            title="vieux Cannes"
            align="left"
            tone="light"
          />

          <div class="mt-8 space-y-5 text-base leading-relaxed text-cream-100/85">
            <p>
              Sur la rue Meynadier, à deux pas du marché Forville et de la Croisette,
              Le Meynadier vous accueille dans un décor chaleureux : bois noyer massif,
              accents laiton, guirlandes lumineuses, terrasse animée.
            </p>

            <blockquote class="border-l-2 border-brass-400 pl-5 font-display text-2xl italic leading-snug text-cream-50">
              « Faire d'une rue commerçante un point de ralliement —
              du café à l'ouverture au cocktail du soir. »
            </blockquote>

            <p>
              Du café du matin au cocktail du soir, c'est l'adresse pour un déjeuner
              sur le pouce, un apéro entre amis ou un dîner complice — sept jours sur sept,
              toute l'année.
            </p>
          </div>

          <UiButton variant="hero-outline" to="/histoire" class="mt-10">
            Notre histoire
          </UiButton>
        </div>

        <!-- Mosaïque éditoriale -->
        <div class="lg:col-span-7">
          <div class="grid grid-cols-6 grid-rows-8 gap-3 sm:gap-4">
            <div class="col-span-4 row-span-5 overflow-hidden rounded-(--radius-card) shadow-(--shadow-deep) ring-1 ring-cream-100/10">
              <img
                src="/images/ambiance/ambiance-1.jpg"
                alt="Intérieur du Meynadier — comptoir bois noyer et lumière chaude"
                loading="lazy"
                decoding="async"
                class="size-full object-cover transition-transform duration-700 hover:scale-105"
              >
            </div>
            <div class="col-span-2 row-span-3 overflow-hidden rounded-(--radius-card) shadow-(--shadow-deep) ring-1 ring-cream-100/10">
              <img
                src="/images/ambiance/ambiance-2.jpg"
                alt="Détail laiton et plantes du comptoir"
                loading="lazy"
                decoding="async"
                class="size-full object-cover transition-transform duration-700 hover:scale-105"
              >
            </div>
            <div class="col-span-2 row-span-2 overflow-hidden rounded-(--radius-card) shadow-(--shadow-deep) ring-1 ring-cream-100/10">
              <img
                src="/images/ambiance/ambiance-3.jpg"
                alt="Plantes et verdure"
                loading="lazy"
                decoding="async"
                class="size-full object-cover transition-transform duration-700 hover:scale-105"
              >
            </div>
            <div class="col-span-3 row-span-3 overflow-hidden rounded-(--radius-card) shadow-(--shadow-deep) ring-1 ring-cream-100/10">
              <img
                src="/images/ambiance/ambiance-4.jpg"
                alt="Terrasse à Cannes"
                loading="lazy"
                decoding="async"
                class="size-full object-cover transition-transform duration-700 hover:scale-105"
              >
            </div>
            <div class="col-span-3 row-span-3 flex items-center justify-center overflow-hidden rounded-(--radius-card) bg-walnut-800 ring-1 ring-cream-100/10 shadow-(--shadow-deep)">
              <div class="text-center">
                <Monogram :size="56" class="mx-auto text-brass-400" />
                <p class="mt-3 font-script text-2xl text-brass-300">Le Meynadier</p>
                <p class="text-xs uppercase tracking-[0.3em] text-cream-100/60">Cannes · 2026</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
