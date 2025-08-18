<template>
  <NuxtLayout>
    <div
      class="h-full flex-1 items-start px-4 md:grid md:gap-6 md:px-8 lg:gap-10"
      :class="[
        showAside
          && 'md:grid-cols-[220px_minmax(0,1fr)] lg:grid-cols-[240px_minmax(0,1fr)]',
      ]"
    >
      <aside
        v-if="showAside"
        class="sticky hidden z-30 w-full shrink-0 overflow-y-auto top-[calc(var(--header-height)+var(--banner-height))] md:sticky md:block"
      >
        <LayoutAside :is-mobile="false" />
      </aside>

      <LayoutBlock404 v-if="!page?.body" />

      <main
        v-else
        class="relative mt-3"
        :class="[
          showToc && 'lg:grid lg:grid-cols-[1fr_220px] lg:gap-14',
        ]"
      >
        <article class="mx-auto w-full min-w-0">
          <LayoutBreadcrumb
            v-if="
              page?.body
                && config.main.breadCrumb
                && (page.breadcrumb ?? true)
            "
            class="mt-4.5 mb-6"
          />

          <LayoutTitle
            v-if="config.main?.showTitle && (page.showTitle ?? true)"
            :title="page?.title"
            :description="page?.description"
            :badges="page?.badges"
          />

          <Alert
            v-if="page?.body?.children?.length === 0"
            title="Empty Page"
            icon="lucide:circle-x"
          >
            Start writing in
            <ProseCodeInline>content/{{ page?._file }}</ProseCodeInline> to
            see this page taking shape.
          </Alert>

          <!-- <ContentRenderer
              v-else
              :key="page._id"
              :value="page"
              class="page-content"
            /> -->
          <!-- ℹ️ .page-content is only used for TOC -->
          <ContentCms
            v-else
            :key="page._id"
            :value="page"
            class="page-content"
          />

          <LayoutPageFooter />
        </article>

        <div
          v-if="showToc"
          class="text-sm hidden lg:block lg:sticky lg:top-[calc(var(--header-height)+var(--banner-height)+1.75rem)] h-min max-h-[calc(100vh-var(--header-height)-var(--banner-height)-6rem)]"
        >
          <div class="overflow-hidden">
            <LayoutToc :is-small="false" />
          </div>
        </div>
      </main>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
const { page } = useContent()
const config = useConfig()

const showAside = computed(() => {
  return (Object.keys(config.value.aside).length || page.value?.aside) && (page.value?.body && true)
})

const showToc = computed(() => {
  return (config.value.toc.enable && page.value?.toc !== false) || !!page.value?.toc
})

useSeoMeta({
  title: `${page.value?.title ?? '404'} - ${config.value.site.name}`,
  ogTitle: page.value?.title,
  description: page.value?.description,
  ogDescription: page.value?.description,
  twitterCard: 'summary_large_image',
})

// defineOgImageComponent(config.value.site.ogImageComponent, {
//   title: page.value?.title,
//   description: page.value?.description,
// })
</script>
