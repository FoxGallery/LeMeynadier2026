<script setup lang="ts">
const { t } = useI18n()
</script>

<template>
  <a
    href="#main-content"
    class="sr-only focus-visible:not-sr-only focus-visible:fixed focus-visible:left-4 focus-visible:top-4 focus-visible:z-[100] focus-visible:rounded-md focus-visible:bg-brass-500 focus-visible:px-4 focus-visible:py-2 focus-visible:text-walnut-900 focus-visible:shadow-(--shadow-deep) focus-visible:outline-2 focus-visible:outline-walnut-900"
  >
    {{ t('common.skipToContent') }}
  </a>
</template>
