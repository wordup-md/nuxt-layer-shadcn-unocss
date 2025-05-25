<template>
  <div class="group grid gap-4 md:grid-cols-2 [&:not(:first-child)]:mt-5">
    <slot v-if="!data" />

    <template v-else>
      <Card
        v-for="(item, index) in _data"
        :key="index"
        :title="item.title"
        :description="item.description"
        :to="item._path"
        :icon="item.icon"

        :media="item.cover"
      />
    </template>
  </div>
</template>

<script setup lang="ts">
import type { ParsedContent } from '@nuxt/content'

const props = defineProps<{
  data?: string
}>()

const _data = ref<ParsedContent[] | undefined>(undefined)

if (props.data) {
  const { data } = await useAsyncData('card-group-data-' + String(props.data), () =>
    queryContent(props.data!).find(),
  )
  // Remove _dir.yaml ...
  _data.value = data.value?.filter(item => !item._partial)
}

defineSlots()
</script>
