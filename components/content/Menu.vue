<script lang="ts" setup>
import type { NavItem } from '@nuxt/content'

const { items, title } = defineProps<{
  title?: string
  items: NavItem[]
}>()

const { navigation } = useContent()

const _links = computed(() => {
  return items?.map((link) => {
    if (typeof link === 'string') {
      return {
        ...navigation.value?.find(n => n._path === link),
        _path: link,
      }
    }

    return {
      ...link,
      _path: link.to || link._path,
    }
  })
})
</script>

<template>
  <div>
    <p
      v-if="title"
      class="mb-2 text-base font-semibold"
    >
      {{ title }}
    </p>

    <MenuItem
      v-for="link in _links"
      :key="link._path"
      :link="link"
    />
  </div>
</template>
