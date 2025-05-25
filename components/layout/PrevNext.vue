<template>
  <div
    v-if="page.prevNext ?? true"
    class="border-t pt-6 lg:grid lg:grid-cols-2 lg:gap-6"
  >
    <LayoutPrevNextButton
      :prev-next="prev"
      side="left"
    />
    <span
      v-if="!prev"
      class="flex-1"
    />
    <LayoutPrevNextButton
      :prev-next="next"
      side="right"
    />
  </div>
</template>

<script setup lang="ts">
const { page } = useContent()
const { prev, next } = useI18nDocs()
</script>
