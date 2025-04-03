<template>
  <div
    class="group relative"
    contenteditable="false"
  >
    <Alert
      v-bind="{ ...model, title: undefined, noClick: true }"
      class="[&_span.w-full]:flex [&_span.w-full]:items-center"
    >
      <!-- <input
        v-model="model.prefix"
        class="inline-block w-min outline-none focus-within:bg-muted"
      > -->
      <div
        contenteditable="true"
        class="inline-block w-min outline-none hover:bg-muted/50 focus-within:bg-muted whitespace-nowrap mr-2"
        @input="updatePrefix"
        v-text="model.prefix"
      />

      <UiEditorLinkInput
        class="inline-flex flex-1 my--2 [&>div]:w-full"
        dropdown-classes="DROPDOWN_MENU absolute mt-8 !w-[500px]"
        :model-value="model.to"
        @update:model-value="updateLink"
      />
    </Alert>
  </div>
</template>

<script lang="ts" setup>
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
  icon: {
    type: String,
    default: 'lucide:bookmark',
  },
  prefix: {
    type: String,
    default: 'Read more at',
  },
  to: {
    type: String,
  },
  title: {
    type: String,
  },
  target: {
    type: String,
  },
})

function updatePrefix(event: Event) {
  const target = event.target as HTMLDivElement
  model.prefix = target.innerHTML
}
function updateLink(to: string) {
  model.to = to
}
</script>
