<template>
  <div class="group relative">
    <UiEditorDropdown
      v-model="mdcAttrs.type" chevron tooltip="Type" placement="bottom-end" :items="types"
      class="absolute right-1 top-1 z-10 opacity-25 transition-opacity group-hover:opacity-100"
    >
      <span class="text-xs font-mono capitalize">{{ model.type }}</span>
    </UiEditorDropdown>

    <Alert v-bind="model">
      <div :ref="props.contentRef" />
    </Alert>
  </div>
</template>

<script lang="ts" setup>
import type { VueNodeViewProps } from 'prosekit/vue'

const props = defineProps<VueNodeViewProps>()
const { getComponentProps } = useMdcEditor()

const types = ['default', 'info', 'success', 'warning', 'danger', 'primary']

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
