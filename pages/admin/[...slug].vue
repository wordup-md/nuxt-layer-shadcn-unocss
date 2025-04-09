<script setup lang="ts">
import type { NavItem } from '@nuxt/content'
import { useUnpress } from '#imports'

const { client, mountCms, login } = useUnpress()
const config = useConfig()

const isDev = import.meta.dev
const isLoggedIn = computed(() => !!client.value)

const path = 'content-doc.json'

const { data: tree, status, error, refresh, clear } = await useAsyncData<NavItem[]>(
  'admin-docs',
  () => $fetch(`/${path}`), {
    transform: (data) => {
      console.log(data)
      // const _data = JSON.parse(data)
      return data.map((item: NavItem) => ({
        ...item,
        '_path': `/admin/${item._path}`,
        'navigation.redirect': item['navigation.redirect'] ? '/admin' + item['navigation.redirect'] : undefined,
        'children': item.children?.map((child: NavItem) => ({
          ...child,
          '_path': `/admin/${child._path}`,
          'navigation.redirect': child['navigation.redirect'] ? '/admin' + child['navigation.redirect'] : undefined,
          'children': child.children?.map((child2: NavItem) => ({
            ...child2,
            '_path': `/admin/${child2._path}`,
            'navigation.redirect': child2['navigation.redirect'] ? '/admin' + child2['navigation.redirect'] : undefined,
          })),
        })),
      }))
    },
  },
)
console.log(tree.value)
const { slug } = useRoute().params

if (isLoggedIn.value && slug?.length === 0 && tree.value) {
  if (tree.value[0]['navigation.redirect']) {
    await navigateTo(tree.value[0]['navigation.redirect'])
  }
  else {
    await navigateTo(tree.value[0]._path)
  }
}

const page = computed(() => {
  if (slug.length > 2) {
    const level0 = tree.value?.find(item => item._path === `/admin/${slug[0]}`)
    const level1 = level0?.children?.find(item => item._path === `/admin/${slug[0]}/${slug[1]}`)
    return level1?.children?.find(item => item._path === `/admin/${slug[0]}/${slug[1]}/${slug[2]}`)
  }
  else if (slug.length > 1) {
    const level0 = tree.value?.find(item => item._path === `/admin/${slug[0]}`)
    return level0?.children?.find(item => item._path === `/admin/${slug[0]}/${slug[1]}`)
  }
  else {
    const page = tree.value?.find(item => item._path === `/admin/${slug[0]}`)

    if (!page?.['navigation.redirect'] && !page?.content && page?.children?.length) {
      return page.children.find(item => item._path === `/admin/${slug[0]}/index`)
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
    <div class="hidden p-8">
      <!-- it force unocss to trigger some classes -->
    </div>

    <div class="h-full">
      <div
        v-if="isLoggedIn"
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

      <div
        v-else-if="isDev && !isLoggedIn"
        class="col-span-3 mt-[20vh] flex items-center justify-center"
      >
        <div class="flex items-center justify-center gap-4">
          <h3 class="scroll-m-20 py-3 text-2xl font-semibold">
            Open administration
          </h3>
          <Icon name="lucide:arrow-right" />
          <UiButton @click="isDev ? mountCms() : login()">
            Connect & Open
          </Uibutton>
        </div>
      </div>

      <div
        v-else
        class="col-span-3 mt-[20vh] flex items-center justify-center"
      >
        <h3 class="scroll-m-20 border-r px-4 py-3 text-2xl font-semibold">
          404
        </h3>
        <span class="scroll-m-20 px-4"> This page could not be found. </span>
      </div>
    </div>
  </NuxtLayout>
</template>
