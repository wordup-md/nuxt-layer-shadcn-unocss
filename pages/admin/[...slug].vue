<script setup lang="ts">
import type { NavItem } from '@nuxt/content'

const config = useConfig()

const contentDocFile = 'content-doc.json'
const adminPath = '/admin'
// const { data: tree, status, error, refresh, clear } = await useAsyncData<NavItem[]>(
const { data: tree } = await useAsyncData<NavItem[]>(
  'admin-docs',
  () => $fetch(`/${contentDocFile}`), {
    transform: (data) => {
      return data.map((item: NavItem) => ({
        ...item,
        '_path': `${adminPath}/${item._path}`,
        'navigation.redirect': item['navigation.redirect'] ? adminPath + item['navigation.redirect'] : undefined,
        'children': item.children?.map((child: NavItem) => ({
          ...child,
          '_path': `${adminPath}/${child._path}`,
          'navigation.redirect': child['navigation.redirect'] ? adminPath + child['navigation.redirect'] : undefined,
          'children': child.children?.map((child2: NavItem) => ({
            ...child2,
            '_path': `${adminPath}/${child2._path}`,
            'navigation.redirect': child2['navigation.redirect'] ? adminPath + child2['navigation.redirect'] : undefined,
          })),
        })),
      }))
    },
  },
)

const { slug } = useRoute().params

if (slug?.length === 0 && tree.value) {
  if (tree.value[0]['navigation.redirect']) {
    await navigateTo(tree.value[0]['navigation.redirect'])
  }
  else {
    await navigateTo(tree.value[0]._path)
  }
}

const page = computed(() => {
  if (slug.length > 2) {
    const level0 = tree.value?.find(item => item._path === `${adminPath}/${slug[0]}`)
    const level1 = level0?.children?.find(item => item._path === `${adminPath}/${slug[0]}/${slug[1]}`)
    return level1?.children?.find(item => item._path === `${adminPath}/${slug[0]}/${slug[1]}/${slug[2]}`)
  }
  else if (slug.length > 1) {
    const level0 = tree.value?.find(item => item._path === `${adminPath}/${slug[0]}`)
    return level0?.children?.find(item => item._path === `${adminPath}/${slug[0]}/${slug[1]}`)
  }
  else {
    const page = tree.value?.find(item => item._path === `${adminPath}/${slug[0]}`)

    if (!page?.['navigation.redirect'] && !page?.content && page?.children?.length) {
      return page.children.find(item => item._path === `${adminPath}/${slug[0]}/index`)
    }

    return page
  }
})

watch(page, async (newVal) => {
  if (newVal?.['navigation.redirect']) {
    await navigateTo(newVal['navigation.redirect'])
  }
}, { immediate: true })
</script>

<template>
  <NuxtLayout>
    <div class="h-full">
      <div
        class="flex-1 items-start px-4 md:grid md:gap-6 md:px-8 lg:gap-10"
        :class="[
          config.main.padded && 'container',
          'md:grid-cols-[220px_minmax(0,1fr)] lg:grid-cols-[240px_minmax(0,1fr)]',
        ]"
      >
        <aside
          class="sticky top-[162px] z-30 w-full shrink-0 overflow-y-auto md:sticky md:top-[90px] md:block"
        >
          <LayoutAside
            v-if="tree"
            :level="1"
            :navigation="tree"
            :is-mobile="false"
          />
        </aside>

        <main
          class="relative container"
          :class="[
            config.toc.enable,
            'lg:grid lg:grid-cols-[1fr_220px] lg:gap-14 lg:py-8',
          ]"
        >
          <div
            v-if="page"
            class="mx-auto w-full min-w-0"
          >
            <div class="p-1 mb-4 rounded border border-red-500">
              <LayoutBreadcrumb />
            </div>

            <LayoutTitle
              v-if="config.main?.showTitle && (page.showTitle ?? true)"
              :title="page?.title"
              :description="page?.description"
              :badges="page?.badges"
            />

            <MDC
              v-if="page.content"
              :value="page.content"
              tag="article"
            />
          </div>
        </main>
      </div>
    </div>
  </NuxtLayout>
</template>
