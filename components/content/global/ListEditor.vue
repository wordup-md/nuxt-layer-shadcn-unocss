<script lang="ts" setup>
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
  path: {
    type: String,
  },
  query: {
    default: () => ({}),
    type: Object,
  },
  component: {
    type: String,
  },
})
</script>

<template>
  <div class="relative mt-8">
    <UiEditorHorizontalControls>
      <UiEditorInput
        v-model="mdcAttrs.path"
        flex-1
        placeholder="Path to folder"
        label="Chemin"
        input-classes="INPUT_GHOST"
      />

      <UiEditorInput
        v-model="mdcAttrs.query.limit"
        flex-1
        placeholder="Sans limite"
        label="Limit"
        input-classes="INPUT_GHOST"
      />
    </UiEditorHorizontalControls>

    <List
      v-if="model.path || model.query"
      :path="model.path"
      :query="model.query"
      :component="model.component"
      contenteditable="false"
      :class="model.class"
    />
  </div>
</template>
