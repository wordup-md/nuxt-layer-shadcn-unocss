<template>
  <div
    v-if="(page.prevNext ?? true) && (showPrev || showNext)"
    class="border-t pt-6 lg:grid lg:grid-cols-2 lg:gap-6"
  >
    <LayoutPrevNextButton
      v-if="showPrev"
      :prev-next="prev"
      side="left"
    />
    <span
      v-if="!prev || !showPrev"
      class="flex-1"
    />
    <LayoutPrevNextButton
      v-if="showNext"
      :prev-next="next"
      side="right"
    />
  </div>
</template>

<script setup lang="ts">
const { page } = useContent()
const { prev, next } = useI18nDocs()
// const { main } = useConfig()

// TODO: implement restrictSameLevel
const showPrev = computed(() => {
  const dirs = prev.value?._path.split('/').length
  const dirsPage = page.value?._path?.split('/').length
  return dirs >= (dirsPage ?? false)
})

const showNext = computed(() => {
  const dirs = next.value?._path.split('/').length
  const dirsPage = page.value?._path?.split('/').length
  return dirs >= (dirsPage ?? false)
})
</script>
