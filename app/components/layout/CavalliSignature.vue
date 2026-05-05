<script setup lang="ts">
const { t } = useI18n()
</script>

<template>
  <a
    href="https://christopher-cavalli.vercel.app/"
    target="_blank"
    rel="noopener noreferrer"
    class="cavalli"
    aria-label="Christopher Cavalli — christopher-cavalli.vercel.app"
  >
    <span class="cavalli-label">{{ t('common.designedBy') }}</span>
    <img src="/sign-cavalli.svg" alt="Christopher Cavalli" class="cavalli-sign">
  </a>
</template>

<style scoped>
.cavalli {
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  gap: 0.4rem;
  text-decoration: none;
  opacity: 0.75;
  transition: opacity 0.4s ease;
}
.cavalli:hover { opacity: 1; }

.cavalli-label {
  font-family: var(--font-body);
  font-size: 9px;
  letter-spacing: 0.32em;
  text-transform: uppercase;
  color: var(--color-brass-300);
  font-weight: 500;
}

.cavalli-sign {
  height: 34px;
  width: auto;
  /* Le SVG est doré ; sur fond walnut-900 il fait déjà le job sans filtre. */
}
</style>
