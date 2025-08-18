<template>
  <section :class="cn('flex flex-col gap-4 mt-4', String($attrs.class || ''))">
    <ContentList
      v-if="path.length || Object.keys(normalizedQuery).length"
      :path
      :query="normalizedQuery"
    >
      <template #default="{ list }">
        <component
          :is="component || 'Card'"
          v-for="data in sortedList(list)"
          :key="data._path"
          v-bind="itemProps ? { ...data, to: data._path, ...itemProps } : { ...data, to: data._path }"
          :class="cn('mt-0!', String(itemClass))"
        />
      </template>

      <template #not-found>
        <p>No articles found.</p>
      </template>
    </ContentList>
  </section>
</template>

<script setup lang="ts">
import type { QueryBuilderParams, ParsedContent } from '@nuxt/content'
import { cn } from '@/lib/utils'

type ListQuery = QueryBuilderParams & { sort?: { date?: 'ASC' | 'DESC' | 1 | -1 } }

const {
  path = '',
  query = {} as ListQuery,
  component = 'Card',
  itemProps = {},
  itemClass = '',
} = defineProps<{
  path?: string
  query?: ListQuery
  component?: string
  itemProps?: object
  itemClass?: string
}>()

// const { data } = await useAsyncData('homeiiii', () =>
//   queryContent(path)
//   // regex should exclude .../index.md file
//     .where({ _type: { $not: 'yaml' }, _id: { $not: { $regex: /index\.md$/ } } })
//     .find(),
// )
// console.log(data.value)

const normalizedQuery = computed(() => {
  const _query = { ...query }
  // Extends query.where
  _query.where = {
    ..._query.where,
    _type: { $not: 'yaml' },
    _id: { $not: { $regex: /index\.md$/ } },
  }

  return {
    ..._query,
    limit: _query.limit ? Number(_query.limit) : undefined,
  }
})

const sortedList = (list: ParsedContent[]) => {
  if (query?.sort && 'date' in query.sort) {
    return [...list].sort((a, b) =>
      query.sort!.date === 'DESC' || query.sort!.date === -1
        ? new Date(b.date).getTime() - new Date(a.date).getTime()
        : new Date(a.date).getTime() - new Date(b.date).getTime(),
    )
  }

  return list
}
</script>
