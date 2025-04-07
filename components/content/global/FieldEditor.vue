<template>
  <Field v-bind="model">
    <slot />
  </Field>
</template>

<script setup lang="ts">
import type { VueNodeViewProps } from 'prosekit/vue'

const props = defineProps<VueNodeViewProps>()
const { getComponentProps } = useMdcEditor()

const { model } = getComponentProps(props, {
  id: {
    type: String,
  },
  class: {
    type: String,
  },
  name: {
    type: String,
    required: true,
    default: 'Field',
  },
  type: {
    type: String,
  },
  required: {
    type: Boolean,
  },
  description: {
    type: String,
  },
  defaultValue: {
    type: String,
  },
})
</script>
