<template>
  <NuxtLoadingIndicator :color="false" class="z-100 bg-primary/80" />
  <NuxtRouteAnnouncer />

  <ViewModeSwitcher />

  <div class="app-default-layout grid grid-cols-1 grid-rows-2 min-h-screen">
    <LayoutBanner v-if="config.banner.enable" />
    <LayoutHeader />

    <NuxtPage />

    <Toaster />
    <LayoutFooter />
  </div>
</template>

<script setup lang="ts">
import Toaster from "@/components/ui/toast/Toaster.vue";

const config = useConfig();
const { themeClass, radius } = useThemes();

useSeoMeta({
  description: config.value.site.description,
  ogDescription: config.value.site.description,
  ogImage: config.value.site.ogImage,
  twitterCard: "summary_large_image",
});

useServerHead({
  bodyAttrs: {
    class: themeClass.value,
    style: `--radius: ${radius.value}rem;`,
  },
});
</script>

<style lang="postcss" scoped>
.app-default-layout {
  grid-template-rows: auto 1fr;
}
</style>
