<template>
  <div
    v-if="showPageFooter"
    class="mt-16"
  >
    <LayoutEditLink />
    <LayoutPrevNext />
  </div>

  <div
    v-else
    class="mt-16"
  />
</template>

<script setup lang="ts">
const { page } = useContent()
const config = useConfig()

const showPageFooter = computed(() => {
  return (config.value.main.pageFooter.enable && page.value?.pageFooter !== false) || !!page.value?.pageFooter
})
</script>
