<template>
  <NuxtLayout :class="page.header.position === 'over' && 'header-over'">
    <ContentCms
      :key="page._id"
      :value="page"
      class="content-grid"
    />
    <!-- <ContentRenderer :key="page._id" :value="page" class="content-grid" /> -->
  </NuxtLayout>
</template>

<script setup lang="ts">
const { page } = useContent()
const config = useConfig()

useSeoMeta({
  title: `${page.value?.title ?? '404'} - ${config.value.site.name}`,
  ogTitle: page.value?.title,
  description: page.value?.description,
  ogDescription: page.value?.description,
  ogImage: config.value.site.ogImage,
  twitterCard: 'summary_large_image',
})
</script>
