<template>
  <NuxtLinkLocale
    :to="link._path"
    class="flex items-center gap-2 rounded-md p-2 text-sm text-foreground/80 hover:bg-muted hover:text-primary"
    :class="[
      isActive && 'bg-muted !text-primary',
      !!link.navTruncate && 'h-8',
    ]"
  >
    <LayoutAsideTreeItemButton :link />
  </NuxtLinkLocale>
</template>

<script setup lang="ts">
import type { NavItem } from '@nuxt/content'

const { link } = defineProps<{
  link: NavItem
}>()

const isActive = computed(() => link._path === useRoute().path)
</script>
