<template>
  <UiScrollArea
    orientation="vertical"
    class="app__aside relative overflow-hidden text-sm mt-6 pr-6 md:pr-4 h-[calc(100vh-var(--header-height)-var(--banner-height)-6rem)]"
    type="hover"
  >
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
        <NuxtLink
          :to="link.redirect ?? link._path"
          class="flex h-8 items-center gap-2 rounded-md p-2 text-sm text-foreground/80 hover:bg-muted hover:text-primary"
          :class="[path.startsWith(link._path) && 'bg-muted !text-primary']"
        >
          <SmartIcon
            v-if="link.icon"
            :name="link.icon"
            class="self-center"
            :size="16"
          />
          {{ link.title }}

          <span
            v-for="(badge, i) in link.navBadges"
            :key="i"
          >
            <Badge
              :variant="badge.variant"
              :type="badge.type"
              :size="badge.size ?? 'sm'"
            >
              {{ badge.value }}
            </Badge>
          </span>
        </NuxtLink>
      </li>
    </ul>
    <LayoutAsideTree
      :links
      :level="0"
      :class="[config.aside.useLevel ? 'pt-4' : 'pt-1']"
    />
  </UiScrollArea>
</template>

<script setup lang="ts">
import type { NavItem } from '@nuxt/content'

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

const path = computed(() => useRoute().path)
</script>
