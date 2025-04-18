<template>
  <NuxtLoadingIndicator
    color="repeating-linear-gradient(to right, hsl(var(--primary)) 0%, hsl(var(--primary) / 0.25) 100%)"
    class="z-100"
  />
  <NuxtRouteAnnouncer />

  <ViewModeSwitcher class="!top-[calc(var(--header-height)+var(--banner-height)+0.75rem)] [&>div]:shadow-xl [&>div]:border [&_span]:w-0 [&_span]:ml--2 [&_span]:hover:ml-0 [&_span]:transition-all">
    <template #footer>
      <div class="border-t my-0.5 mx-1" />
      <div class="pb-0.5">
        <nuxt-link
          to="/admin"
          class="flex items-center gap-2 py-1 transition hover:opacity-100 px-2 opacity-50 hover:bg-blue-500/10"
          :class="$route.path.startsWith('/admin') && 'text-primary opacity-100'"
        >
          <div class="i-lucide-book" />
          <span class="of-hidden">
            {{ 'Docs' }}
          </span>
        </nuxt-link>
      </div>
    </template>
  </ViewModeSwitcher>

  <div class="app-default-layout grid grid-cols-1 min-h-dvh">
    <LayoutHeader />

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
    style: `--radius: ${radius.value}rem;--header-height: ${config.value.header.height};--banner-height: 0px;`,
  },
})
</script>

<style scoped>
.app-default-layout {
  grid-template-rows: auto 1fr auto;
}
</style>
