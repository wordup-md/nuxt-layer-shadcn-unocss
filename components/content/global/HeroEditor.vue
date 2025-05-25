<template>
  <Hero
    :id="model.id"
    :announcement="model.announcement"
    :actions="model.actions"
    :class="model.class"
  >
    <template #title>
      <ContentSlot
        :use="$slots.title"
        unwrap="p"
      />
    </template>
    <template #description>
      <ContentSlot
        :use="$slots.description"
        unwrap="p"
      />
    </template>
    <template #support>
      <ContentSlot
        :use="$slots.support"
        unwrap="p"
      />
    </template>
  </Hero>
</template>

<script setup lang="ts">
import type { VueNodeViewProps } from 'prosekit/vue'

// defineProps<{
//   announcement?: {
//     to?: string
//     target?: string
//     icon?: string
//     title: string
//   }
//   actions: [{
//     name: string
//     leftIcon?: string
//     rightIcon?: string
//     variant?: 'default' | 'link' | 'destructive' | 'outline' | 'secondary' | 'ghost'
//     to: string
//     target?: string
//   }]
// }>()
const props = defineProps<VueNodeViewProps>()
const { getComponentProps } = useMdcEditor()

const { model } = getComponentProps(props, {
  id: {
    type: String,
  },
  class: {
    type: String,
  },
  announcement: {
    type: Object,
  },
  actions: {
    type: Array,
  },
})

defineSlots()
</script>
