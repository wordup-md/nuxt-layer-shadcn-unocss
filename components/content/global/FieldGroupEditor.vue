<template>
  <FieldGroup class="[&>div>div>span]:block [&>div>div]:divide-y [&>div>div>span:not(:first-child)]:mt-4 [&>div>div>span:not(:first-child)]:pt-4">
    <slot />
  </FieldGroup>
</template>

<script setup lang="ts">
// import type { VueNodeViewProps } from 'prosekit/vue'

// const props = defineProps<VueNodeViewProps>()
// const { getComponentProps } = useMdcEditor()

// const { model } = getComponentProps(props, {
//   id: {
//     type: String,
//   },
//   class: {
//     type: String,
//   },
//   data: {
//     type: [String, Array, Object],
//   },
// })
</script>
