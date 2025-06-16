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
      />
    </UiEditorHorizontalControls>

    <List
      v-if="model.path || model.query"
      :path="model.path"
      :query="model.query"
      :component="model.component"
      contenteditable="false"
    />
  </div>
</template>
