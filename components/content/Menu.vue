<script lang="ts" setup>
import type { NavItem } from '@nuxt/content'

const { items, title, removeCurrentPage } = defineProps<{
  title?: string
  items: NavItem[] | string[]
  removeCurrentPage?: boolean
}>()

const { navigation } = useContent()
const { navDirFromPath, navPageFromPath } = useContentHelpers()
const route = useRoute()

const links = computed(() => {
  const _links = []
  for (const item of items) {
    if (typeof item === 'string') {
      if (item.endsWith('/')) {
        const path = item.replace(/\/$/, '')
        const dir = navDirFromPath(path, navigation.value || [])
        const _dir = removeCurrentPage ? dir?.filter(d => d._path !== route.path) : dir
        if (_dir) {
          _links.push(..._dir)
        }
      }
      else {
        _links.push(navPageFromPath(item as unknown as string, navigation.value || []))
      }
      // _links.push({
      //   ...navigation.value?.find(n => item === n._path),
      //   _path: item,
      // })
    }
    else {
      _links.push({
        ...item,
        _path: item.to || item._path,
      })
    }
  }
  return _links
  // return items?.map((item) => {
  //   console.log(
  //     item, navigation.value, navigation.value?.find(n => item === n._path),
  //     navDirFromPath(item as unknown as string, navigation.value || []),
  //   )
  //   if (typeof item === 'string') {
  //     return {
  //       ...navigation.value?.find(n => item === n._path),
  //       _path: item,
  //     }
  //   }

  //   return {
  //     ...item,
  //     _path: item.to || item._path,
  //   }
  // })
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
      v-for="link in links"
      :key="link._path"
      :link="link"
    />
  </div>
</template>
