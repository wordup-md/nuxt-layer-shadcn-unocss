<template>
  <div class="group relative" contenteditable="false">
    <Alert icon="lucide:bookmark">
      Read more in
      <UiEditorLinkInput v-model="mdcAttrs.to" class="inline-block" />
    </Alert>
  </div>
</template>

<script lang="ts" setup>
import type { VueNodeViewProps } from "prosekit/vue";

const props = defineProps<VueNodeViewProps>();
const { getComponentProps } = useMdcEditor();

const { mdcAttrs } = getComponentProps(props, {
  id: {
    type: String,
  },
  class: {
    type: String,
  },
  title: {
    type: String,
  },
  to: {
    type: String,
  },
  target: {
    type: String,
  },
});

// const computedTitle = computed<string>(
//   () => {
//     if (props.title)
//       return props.title

//     try {
//       return useBreadcrumb(props.to).map(x => x.title).join(' > ')
//     } catch {
//       return props.to
//     }
//   },
// )
</script>
