<template>
  <div class="group relative">
    <UiEditorDropdown
      v-model="mdcAttrs.type"
      chevron
      tooltip="Type"
      placement="bottom-start"
      :items="types"
      class="absolute left-3 top--2 z-10 opacity-0 border rounded pl-2 pr-1 transition-opacity group-hover:opacity-100 bg-background"
    >
      <span class="text-xs font-mono capitalize">{{ model.type }}</span>
    </UiEditorDropdown>

    <Alert
      v-bind="model"
      no-click
    >
      <p
        :ref="props.contentRef"
        class="[&>div]:min-h-5.5"
      />
    </Alert>
  </div>
</template>

<script lang="ts" setup>
import type { VueNodeViewProps } from 'prosekit/vue'

const props = defineProps<VueNodeViewProps>()
const { getComponentProps } = useMdcEditor()

const types = ['default', 'info', 'success', 'warning', 'danger', 'example', 'secondary']

const { model, mdcAttrs } = getComponentProps(props, {
  id: {
    type: String,
  },
  class: {
    type: String,
  },
  title: {
    type: String,
  },
  icon: {
    type: String,
  },
  type: {
    type: String,
    default: 'default',
    validator(value: string) {
      return types.includes(value)
    },
  },
  to: {
    type: String,
  },
  target: {
    type: String,
  },
  external: {
    type: Boolean,
  },
})
</script>
