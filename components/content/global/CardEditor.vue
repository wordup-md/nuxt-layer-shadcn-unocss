<template>
  <Card v-bind="model">
    <template
      v-if="$slots.title"
      #title
    >
      <ContentSlot
        :use="$slots.title"
        unwrap="p"
      />
    </template>
    <template
      v-if="$slots.description"
      #description
    >
      <ContentSlot
        :use="$slots.description"
        unwrap="p"
      />
    </template>
    <template
      v-if="$slots.content"
      #content
    >
      <ContentSlot
        :use="$slots.content"
        unwrap="p"
      />
    </template>
    <template
      v-if="$slots.footer"
      #footer
    >
      <ContentSlot
        :use="$slots.footer"
        unwrap="p"
      />
    </template>
  </Card>
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

  title: {
    type: String,
  },
  description: {
    type: String,
  },
  content: {
    type: String,
  },
  footer: {
    type: String,
  },

  to: {
    type: String,
  },
  target: {
    type: String,
  },
  showLinkIcon: {
    type: Boolean,
    default: true,
  },

  icon: {
    type: String,
  },
  iconSize: {
    type: Number,
    default: 24,
  },
  iconPosition: {
    type: String,
    default: 'left',
    validator(value: string) {
      return ['left', 'right', 'top', 'bottom'].includes(value)
    },
  },

  media: {
    type: String,
  },
  mediaPosition: {
    type: String,
    default: 'top',
    validator(value: string) {
      return ['left', 'right', 'top', 'bottom', 'cover', 'center'].includes(value)
    },
  },

  inStack: {
    type: Boolean,
    default: false,
  },
})

defineSlots()
</script>
