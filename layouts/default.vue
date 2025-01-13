<template>
  <div class="px-4 py-6 md:px-8" :class="[config?.main?.padded && 'container']">
    <slot />
  </div>
</template>

<script setup lang="ts">
const config = useConfig()
</script>
