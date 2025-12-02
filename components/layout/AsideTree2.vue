<template>
  <NuxtLink
    :to
    class="flex items-center gap-2 rounded-md p-2 text-sm text-foreground/80 hover:bg-muted hover:text-primary"
  >
    <Icon
      v-if="icon"
      :name="icon"
      class="self-center"
      :size="16"
    />
    {{ title }}
  </NuxtLink>
</template>

<script setup lang="ts">
import type { NavItem } from '@nuxt/content'

defineProps<{
  to?: string
  target?: string
  showLinkIcon?: boolean
  icon?: string
  title?: string
  description?: string
  tag?: string
}>()
</script>
