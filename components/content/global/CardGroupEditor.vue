<template>
  <div class="[&:not(:first-child)]:mt-5">
    <UiEditorHorizontalControls class="mb--1">
      <UiEditorInput
        v-model="mdcAttrs.data"
        input-classes="INPUT_GHOST"
        label="Source"
        type="text"
        placeholder="Enter a path"
        class="flex-grow"
      />
    </UiEditorHorizontalControls>

    <CardGroup
      v-bind="mdcAttrs"
      class="[&>div>div]:grid [&>div>div]:gap-4 [&>div>div]:md:grid-cols-2 [&>div>div>div>div]:md:h-full [&>div>div>div>div>a]:pointer-events-none"
      :class="!mdcAttrs.data && 'block'"
    >
      <div
        :ref="props.contentRef"
        class=""
      />
    </CardGroup>
  </div>
</template>

<script setup lang="ts">
import type { VueNodeViewProps } from 'prosekit/vue'

const props = defineProps<VueNodeViewProps>()
const { getComponentProps } = useMdcEditor()

const { model, mdcAttrs } = getComponentProps(props, {
  id: {
    type: String,
  },
  class: {
    type: String,
  },
  data: {
    type: [String, Array, Object],
  },
})

// watch(() => mdcAttrs.data, async (value) => {
//   console.log(value, 'tasta')
//   const data = await queryContent(value).find()
//   console.log(data)
// }, { immediate: true })
</script>
