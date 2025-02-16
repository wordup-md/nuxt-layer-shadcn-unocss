<template>
  <NuxtLayout>
    <div class="h-full">
      <div
        class="flex-1 items-start px-4 md:grid md:gap-6 md:px-8 lg:gap-10"
        :class="[
          config.main.padded && 'container',
          (page?.aside ?? true)
            && 'md:grid-cols-[220px_minmax(0,1fr)] lg:grid-cols-[240px_minmax(0,1fr)]',
        ]"
      >
        <aside
          v-if="page?.aside ?? (page?.body && true)"
          class="sticky top-[162px] z-30 w-full shrink-0 overflow-y-auto md:sticky md:top-[90px] md:block"
        >
          <LayoutAside :is-mobile="false" />
        </aside>

        <div
          v-if="!page?.body"
          class="col-span-3 mt-[20vh] flex items-center justify-center"
        >
          <h3 class="scroll-m-20 border-r px-4 py-3 text-2xl font-semibold">
            404
          </h3>
          <span class="scroll-m-20 px-4"> This page could not be found. </span>
        </div>

        <main
          v-else
          class="relative container"
          :class="[
            config.toc.enable
              && (page.toc ?? true)
              && 'lg:grid lg:grid-cols-[1fr_220px] lg:gap-14 lg:py-8',
          ]"
        >
          <div class="mx-auto w-full min-w-0">
            <LayoutBreadcrumb
              v-if="
                page?.body
                  && config.main.breadCrumb
                  && (page.breadcrumb ?? true)
              "
              class="mt-8 mb-6"
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
              class="docs-content"
            /> -->
            <ContentCms
              v-else
              :key="page._id"
              :value="page"
            />

            <LayoutDocsFooter />
          </div>

          <div
            v-if="config.toc.enable && (page.toc ?? true)"
            class="hidden text-sm lg:block"
          >
            <div class="sticky top-[112px] overflow-hidden">
              <LayoutToc :is-small="false" />
            </div>
          </div>
        </main>
      </div>
    </div>
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
  twitterCard: 'summary_large_image',
})

// defineOgImageComponent(config.value.site.ogImageComponent, {
//   title: page.value?.title,
//   description: page.value?.description,
// })
</script>
