<template>
  <UiCard class="divide-y overflow-hidden [&:not(:first-child)]:mt-5" v-bind="model">
    <div
      v-for="(slot, i) in $slots.default?.() ?? []"
      :key="i"
    >
      <component
        :is="slot"
        :in-stack="true"
      />
      <!-- <span :ref="props.contentRef" /> -->
    </div>
  </UiCard>
</template>

<script lang="ts" setup>
import type { VueNodeViewProps } from 'prosekit/vue'

defineSlots()
const props = defineProps<VueNodeViewProps>()

const { getComponentProps } = useMdcEditor()
const { model } = getComponentProps(props, {
  id: {
    type: String,
  },
  class: {
    type: String,
    default: '',
  },
})
</script>
