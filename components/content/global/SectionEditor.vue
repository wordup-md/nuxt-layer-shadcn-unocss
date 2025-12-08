<template>
  <section
    :ref="props.contentRef"
  />
</template>

<script lang="ts" setup>
import type { VueNodeViewProps } from 'prosekit/vue'

const props = defineProps<VueNodeViewProps>()
// const { getComponentProps } = useMdcEditor()
// const { model } = getComponentProps(props, {
//   id: {
//     type: String,
//   },
//   class: {
//     type: String,
//     default: '',
//   },
// })
</script>
