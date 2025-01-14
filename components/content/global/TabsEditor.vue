<template>
  {{ model }}
  <UiTabs v-bind="model">
    <div :ref="props.contentRef" />
  </UiTabs>
</template>

<script lang="ts" setup>
import type { VueNodeViewProps } from 'prosekit/vue'
import { ref, watch } from 'vue'

// import { useMdcEditor } from '#imports'

const props = defineProps<VueNodeViewProps>()

const variants = ['separate', 'card']

const { getComponentProps } = useMdcEditor()
const { model, mdcAttrs } = getComponentProps(props, {
  id: {
    type: String,
  },
  class: {
    type: String,
    default: '',
  },
  variant: {
    type: String,
    default: 'separate',
    validator(value: string) {
      return variants.includes(value)
    },
  },
  padded: {
    type: Boolean,
    default: true,
  },
})
</script>
