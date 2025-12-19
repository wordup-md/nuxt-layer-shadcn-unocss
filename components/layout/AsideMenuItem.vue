<script lang="ts" setup>
import type { BadgeVariants } from '@/components/ui/badge'
import type { NavItem } from '@nuxt/content'

defineProps<{
  to?: string
  _path?: string
  target?: string
  icon?: string
  title?: string
  navBadges?: {
    variant: BadgeVariants['variant']
    type: BadgeVariants['type']
    size: BadgeVariants['size']
    value: string
  }[]
  redirect?: string
  children?: NavItem[]

}>()

const { path } = useRoute()
const { folderStyle: defaultFolderStyle } = useConfig().value.aside
// const folderStyle = computed(() => link.sidebar?.style ?? defaultFolderStyle)
const folderStyle = computed(() => defaultFolderStyle)
const isOpen = ref(false)
</script>

<template>
  <div v-if="$slots.content">
    <template v-if="folderStyle === 'group'">
      <div
        class="mt-4 flex items-center gap-2 rounded-md px-2 text-base font-semibold outline-none"
        :class="['h-8']"
      >
        <LayoutAsideTreeItemButton :link="{ title: title ?? '', _path: _path ?? '', icon, navBadges }" />
      </div>

      <div class="flex flex-col gap-1 py-1">
        <slot name="content" />
      </div>
    </template>

    <template v-else>
      <button
        class="flex w-full cursor-pointer items-center gap-2 rounded-md p-2 text-left text-sm font-medium text-foreground/80 hover:bg-muted hover:text-primary"
        :class="['h-8']"
        @click="isOpen = !isOpen"
      >
        <NuxtIcon
          v-if="folderStyle === 'tree'"
          name="lucide:chevron-down"
          class="transition-transform"
          :class="[!isOpen && '-rotate-90']"
        />
        <LayoutAsideTreeItemButton :link="{ title: title ?? '', _path: _path ?? '', icon, navBadges }" />
        <NuxtIcon
          v-if="folderStyle === 'default'"
          name="lucide:chevron-down"
          class="ml-auto transition-transform"
          :class="[!isOpen && '-rotate-90']"
        />
      </button>
      <div v-show="isOpen">
        <ul
          class="flex flex-col gap-1 py-1"
          :class="['mx-3.5 border-l px-2.5']"
        >
          <slot name="content" />
        </ul>
      </div>
    </template>
  </div>

  <NuxtLinkLocale
    v-else
    :to="redirect ?? _path ?? to"
    class="flex h-8 items-center gap-2 rounded-md p-2 text-sm text-foreground/80 hover:bg-muted hover:text-primary"
    :class="[(_path && path.startsWith(_path) || to && path.startsWith(to)) && 'bg-muted !text-primary']"
  >
    <Icon
      v-if="icon"
      :name="icon"
      class="self-center"
      :size="16"
    />

    {{ title }}

    <span
      v-for="(badge, i) in navBadges"
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
  </NuxtLinkLocale>
</template>
