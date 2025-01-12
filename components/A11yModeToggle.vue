<script lang="ts" setup>
const isA11yMode = ref(false)

function toggleA11yMode() {
  document.body.classList.toggle('is-a11y')
  isA11yMode.value = !isA11yMode.value
}
</script>

<template>
  <UiButton variant="ghost" size="icon" :class="{ 'border-2 border-primary': isA11yMode }" @click="toggleA11yMode()">
    <Icon name="lucide:glasses" size="16" />
  </UiButton>
</template>
