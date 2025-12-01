<template>
  <div
    class="group relative"
    contenteditable="false"
  >
    <ReadMore
      v-bind="{ ...model, title: undefined, noClick: true }"
      class="[&_span.w-full]:flex [&_span.w-full]:items-center"
    >
      <input
        ref="prefixInput"
        v-model="mdcAttrs.prefix"
        name="prefix"
        class="inline-block outline-none focus-within:bg-muted py-1 my--1"
        :style="{ width: `${inputWidth}px` }"
        @input="updateInputWidth"
      >
      <!-- <div
        contenteditable="true"
        class="inline-block w-min outline-none hover:bg-muted/50 focus-within:bg-muted whitespace-nowrap mr-2"
        @input="updatePrefix"
        v-text="model.prefix"
      /> -->

      <UiEditorLinkInput
        class="inline-flex flex-1 my--2 [&>div]:w-full ml--1"
        dropdown-classes="DROPDOWN_MENU absolute mt-8 !w-[500px]"
        :model-value="model.to"
        @update:model-value="updateLink"
      />
    </ReadMore>
  </div>
</template>

<script lang="ts" setup>
import type { VueNodeViewProps } from 'prosekit/vue'

const props = defineProps<VueNodeViewProps>()
const { getComponentProps } = useMdcEditor()

const { mdcAttrs, model } = getComponentProps(props, {
  id: {
    type: String,
  },
  class: {
    type: String,
  },
  icon: {
    type: String,
    default: 'lucide:info',
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

const prefixInput = useTemplateRef<HTMLInputElement>('prefixInput')
const inputWidth = ref(100)

function updateInputWidth() {
  if (!prefixInput.value) return

  // Create a temporary span to measure text width
  const measure = document.createElement('span')
  measure.style.visibility = 'hidden'
  measure.style.position = 'absolute'
  measure.style.whiteSpace = 'pre'
  measure.style.font = window.getComputedStyle(prefixInput.value).font
  measure.textContent = prefixInput.value.value || prefixInput.value.placeholder || ''

  document.body.appendChild(measure)
  inputWidth.value = Math.max(measure.offsetWidth, 20) // Add padding, min 20px
  document.body.removeChild(measure)
}

function updateLink(to: string) {
  mdcAttrs.to = to
}

watch(() => mdcAttrs.prefix, () => {
  nextTick(() => {
    updateInputWidth()
  })
})

onMounted(() => {
  nextTick(() => {
    updateInputWidth()
  })
})
</script>
