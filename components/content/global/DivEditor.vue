<template>
  <div :ref="props.contentRef" v-bind="model" />
</template>

<script lang="ts" setup>
import type { VueNodeViewProps } from "prosekit/vue";

// import { useMdcEditor } from '#imports'

const props = defineProps<VueNodeViewProps>();

const { getComponentProps } = useMdcEditor();
const { model, mdcAttrs } = getComponentProps(props, {
  id: {
    type: String,
  },
  class: {
    type: String,
    default: "",
  },
});
</script>

<style lang="postcss" scoped></style>
