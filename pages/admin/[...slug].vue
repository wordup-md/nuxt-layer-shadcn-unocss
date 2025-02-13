<script setup lang="ts">
const { user } = useUnpress()
console.log(user.value)
const isAdmin = ref(false)
if (user.value || import.meta.dev) {
  isAdmin.value = true
}
const config = useConfig()

const repo = 'unpress/nuxt-layer'
const path = 'components-tree.json'

const { data, status, error, refresh, clear } = await useAsyncData(
  'mountains',
  () => $fetch(`https://raw.githubusercontent.com/${repo}/main/${path}`), {
    transform: (data) => {
      const _data = JSON.parse(data)
      console.log(_data)
      return _data.map((item: any) => ({
        ...item,
        _path: `/admin/${item._path}`,
        children: item.children?.map((child: any) => ({
          ...child,
          _path: `/admin/${child._path}`,
        })),
      }))
    },
  },
)

const { slug } = useRoute().params
if (slug?.length === 0) {
  await navigateTo(data.value[0]._path)
}

const md = computed(() => {
  if (slug.length > 1) {
    const level0 = data.value?.find((item: any) => item._path === `/admin/${slug[0]}`)
    return level0.children?.find((item: any) => item._path === `/admin/${slug[0]}/${slug[1]}`)?.content
  }
  else {
    return data.value?.find((item: any) => item._path === `/admin/${slug[0]}`)?.content
  }
})
</script>

<template>
  <NuxtLayout>
    <div class="h-full border-b">
      <div
        v-if="isAdmin"
        class="flex-1 items-start px-4 md:grid md:gap-6 md:px-8 lg:gap-10"
        :class="[
          config.main.padded && 'container',
          'md:grid-cols-[220px_minmax(0,1fr)] lg:grid-cols-[240px_minmax(0,1fr)]',
        ]"
      >
        <aside
          class="sticky top-[162px] z-30 w-full shrink-0 overflow-y-auto md:sticky md:top-[90px] md:block"
        >
          <LayoutAsideTree
            v-if="data"
            :links="data"
            :level="0"
            class=""
          />
        </aside>

        <main
          class="relative container"
          :class="[
            config.toc.enable,
            'lg:grid lg:grid-cols-[1fr_220px] lg:gap-14 lg:py-8',
          ]"
        >
          <div class="mx-auto w-full min-w-0">
            <MDC
              v-if="md"
              :value="md"
              tag="article"
            />
          </div>
        </main>
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
