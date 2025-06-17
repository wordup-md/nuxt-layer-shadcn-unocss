<template>
  <section :class="cn('flex flex-col gap-8 mt-8', String($attrs.class || ''))">
    <ContentList
      v-if="path.length || Object.keys(query).length"
      :path
      :query
    >
      <template #default="{ list }">
        <component
          :is="component || 'Card'"
          v-for="data in sortedList(filterList(list))"
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

const filterList = (list: ParsedContent[]) => {
  return list.filter(item => !item?._file?.includes('index.md'))
}

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
