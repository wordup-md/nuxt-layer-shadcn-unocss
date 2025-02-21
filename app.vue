<template>
  <NuxtLoadingIndicator :color="false" class="z-100 bg-primary/80" />
  <NuxtRouteAnnouncer />

  <ViewModeSwitcher class="!top-26" />

  <div class="app-default-layout grid grid-cols-1 grid-rows-2 min-h-screen">
    <div>
      <LayoutBanner v-if="config.banner.enable" />
      <LayoutHeader />
    </div>

    <NuxtPage />

    <UiToaster />
    <LayoutFooter />
  </div>
</template>

<script setup lang="ts">
const config = useConfig()
const { themeClass, radius } = useThemes()

useSeoMeta({
  description: config.value.site.description,
  ogDescription: config.value.site.description,
  ogImage: config.value.site.ogImage,
  twitterCard: 'summary_large_image',
})

useHead({
  bodyAttrs: {
    class: themeClass.value,
    style: `--radius: ${radius.value}rem;`,
  },
})
</script>

<style lang="postcss" scoped>
.app-default-layout {
  grid-template-rows: auto 1fr;
}
</style>
