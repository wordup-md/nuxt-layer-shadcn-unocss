<template>
  <render />
  <!-- <Tabs v-bind="model">
    <div
      v-for="(slot, index) in props.node.value.children ?? []"
      :key="index"
      :label="slot.attrs?.attributes?.label"
      :icon="slot.attrs?.attributes?.icon"
    >
      {{ slot.attrs }}
      <component
        :is="slot.type"
        :label="slot.attrs.label"
      />
    </div>
  </Tabs> -->
</template>

<script lang="ts" setup>
import type { VueNodeViewProps } from 'prosekit/vue'
import Tabs from '../Tabs.vue'

// import { useMdcEditor } from '#imports'

const props = defineProps<VueNodeViewProps>()
const variants = ['separate', 'card', 'line', 'combobox']

const { getComponentProps } = useMdcEditor()
const { model } = getComponentProps(props, {
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
  sync: {
    type: String,
  },
  disableSearch: {
    type: Boolean,
    default: false,
  },
  searchPlaceholder: {
    type: String,
    default: 'Search Tab...',
  },
  searchEmpty: {
    type: String,
    default: 'No tab found.',
  },
})

function render() {
  // const slots = _slots?.default?.() || []
  // console.log('slots', slots)
  // const slotsData = slots.map((slot, index) => ({
  //   label: slot.props?.label || slot.props?.filename || '',
  //   index,
  // }))

  // <div
  //     v-for="(slot, index) in props.node.value.children ?? []"
  //     :key="index"
  //     :label="slot.attrs?.attributes?.label"
  //     :icon="slot.attrs?.attributes?.icon"
  //   >

  return h(
    Tabs,
    model,
    () => props.node.value.children.map(child => h('div', { label: child.attrs?.attributes?.label, icon: child.attrs?.attributes?.icon })),

    // () => [h('div', { label: 'Tab 1' }), h('div', { label: 'Tab 2' })],
  )
}
</script>
