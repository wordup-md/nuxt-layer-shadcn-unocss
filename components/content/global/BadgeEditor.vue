<template>
  <Badge v-bind="model" class="[&>div]:inline">
    <span :ref="props.contentRef" />
  </Badge>
</template>

<script lang="ts" setup>
import type { VueNodeViewProps } from "prosekit/vue";

const props = defineProps<VueNodeViewProps>();

const types = ["default", "info", "warning", "success", "danger"];
const variants = ["default", "secondary", "destructive", "outline"];
const sizes = ["md", "sm"];

const { getComponentProps } = useMdcEditor();
const { model, mdcAttrs } = getComponentProps(props, {
  id: {
    type: String,
  },
  class: {
    type: String,
    default: "",
  },
  type: {
    type: String,
    default: "default",
    validator(value: string) {
      return types.includes(value);
    },
  },
  to: {
    type: String,
  },
  target: {
    type: String,
  },
  variant: {
    type: String,
    default: "default",
    validator(value: string) {
      return variants.includes(value);
    },
  },
  size: {
    type: String,
    default: "md",
    validator(value: string) {
      return sizes.includes(value);
    },
  },
});
</script>
