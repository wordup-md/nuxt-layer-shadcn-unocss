<template>
  <div :class="[config?.main?.padded && 'container']">
    <slot />
  </div>
</template>

<script setup lang="ts">
const config = useConfig()
</script>
