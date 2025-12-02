<template>
  <UiScrollArea
    orientation="vertical"
    class="app__aside relative overflow-hidden text-sm mt-6 pr-6 md:pr-4 h-[calc(100vh-var(--header-height)-var(--banner-height)-7rem)]"
    type="hover"
  >
    <template v-if="!tree?.children.length">
      <LayoutHeaderNavMobile
        v-if="isMobile"
        class="mb-5 border-b pb-2"
      />

      <LayoutSearchButton v-if="config.search.inAside" />

      <ul
        v-if="config.aside.useLevel"
        class="flex flex-col gap-1 border-b pb-4"
      >
        <li
          v-for="link in navigation || nav"
          :key="link.id"
        >
          <LayoutAsideMenuItem v-bind="{ ...link, children: [] }" />
        </li>
      </ul>

      <LayoutAsideTree
        :links
        :level="0"
        :class="[config.aside.useLevel ? 'pt-4' : 'pt-1']"
      />
    </template>

    <MDCRenderer
      v-else
      :body="tree"
      class="min-h-10"
      :class="{ 'flex flex-col gap-1': !!tree }"
      :components="{
        'aside-menu-item': AsideMenuItem,
        'aside-tree-2': AsideTree2,
      }"
    />
  </UiScrollArea>
</template>

<script setup lang="ts">
import type { NavItem } from '@nuxt/content'
import AsideMenuItem from './AsideMenuItem.vue'
import AsideTree2 from './AsideTree2.vue'

const { isMobile, navigation, level = 0 } = defineProps<{
  isMobile: boolean
  navigation?: NavItem[]
  level?: number
}>()

const { navDirFromPath } = useContentHelpers()
const { navigation: nav } = useContent()
const config = useConfig()

const links = computed(() => {
  const route = useRoute()
  const path = route.path.split('/')

  if (config.value.aside.useLevel) {
    const leveledPath = path.splice(0, level + 2).join('/')
    const dir = navDirFromPath(leveledPath, navigation || nav.value)
    return dir ?? []
  }

  return navigation || nav.value
})

// const path = computed(() => useRoute().path)

const menu = '/_menu-aside'
const { data: count } = await useAsyncData(menu + '-count', () => queryContent(menu).count())

let tree = undefined
if (count.value) {
  const { data } = await useAsyncData(menu, () =>
    queryContent(menu).findOne(),
  )
  tree = await useMdcMenu(data, {
    menuComponentName: 'aside-menu-item',
    submenuComponentName: 'aside-tree-2',
  })
}
</script>
