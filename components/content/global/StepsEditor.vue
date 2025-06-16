<template>
  <div class="relative">
    <UiEditorDropdown
      v-model="levelModel"
      chevron
      tooltip="Level"
      placement="bottom-end"
      :items="levels.map(level => `H${level}`)"
      class="absolute right-1 top-1 z-10 opacity-25 transition-opacity group-hover:opacity-100"
    >
      <span class="text-xs font-mono capitalize">{{ levelModel }}</span>
    </UiEditorDropdown>

    <Steps
      v-bind="model"
      :class="levelClass[model.level as keyof typeof levelClass]"
    >
      <div
        :ref="props.contentRef"
        class="[&>div]:min-h-5.5 [&_p]:mt-6"
      />
    </Steps>
  </div>
</template>

<script lang="ts" setup>
import type { VueNodeViewProps } from 'prosekit/vue'

const props = defineProps<VueNodeViewProps>()

const levels = ['1', '2', '3', '4', '5', '6']
const levelClass = {
  1: '[&>div>div>div>h1]:step',
  2: '[&>div>div>div>h2]:step',
  3: '[&>div>div>div>h3]:step',
  4: '[&>div>div>div>h4]:step',
  5: '[&>div>div>div>h5]:step',
  6: '[&>div>div>div>h6]:step',
}

const { getComponentProps } = useMdcEditor()
const { model, mdcAttrs } = getComponentProps(props, {
  id: {
    type: String,
  },
  class: {
    type: String,
    default: '',
  },
  level: {
    type: String,
    default: '3',
    validator(value: string) {
      return levels.includes(value)
    },
  },
})

const levelModel = computed({
  get() {
    return `H${model.level}`
  },
  set(value) {
    mdcAttrs.level = value.replace('H', '')
  },
})
</script>
