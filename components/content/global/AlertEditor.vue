<template>
  <div class="group relative">
    <UiEditorDropdown
      chevron
      tooltip="Type"
      placement="bottom-start"
      class="absolute left-3 top--2 z-10 opacity-0 border rounded pl-2 pr-1 transition-opacity group-hover:opacity-100 bg-background"
    >
      <span class="text-xs font-mono capitalize">{{ model.type }}</span>
      <template #menu>
        <UiEditorMenuItem
          v-for="item of types"
          :key="item"
          :label="item"
          :pressed="mdcAttrs.type === item"
          class="mb-0.5 last:mb-0"
          @click="mdcAttrs.type = item"
        />
        <hr
          v-if="filteredFrontmatter.length > 0"
          class="my-1"
        >
        <UiEditorMenuItem
          v-for="[key, value] of filteredFrontmatter"
          :key="key"
          :label="`${key}: ${value}`"
          :pressed="mdcAttrs.type === `:${key}`"
          class="mb-0.5 last:mb-0 fmkeys"
          @click="mdcAttrs.type = `:${key}`"
        >
          <template #label>
            {{ key }}: <strong>{{ value }}</strong>
          </template>
        </UiEditorMenuItem>
      </template>
    </UiEditorDropdown>

    <Alert
      v-bind="model"
      no-click
    >
      <p
        :ref="props.contentRef"
        class="[&>div]:min-h-5.5"
      />
    </Alert>
  </div>
</template>

<script lang="ts" setup>
import type { VueNodeViewProps } from 'prosekit/vue'

const props = defineProps<VueNodeViewProps>()
const { getComponentProps, frontmatter } = useMdcEditor()

const types = ['default', 'info', 'success', 'warning', 'danger', 'example', 'secondary']

const filteredFrontmatter = computed(() => Object.entries(frontmatter.value).filter(([key, value]) => types.includes(value as string)))

const { model, mdcAttrs } = getComponentProps(props, {
  id: {
    type: String,
  },
  class: {
    type: String,
  },
  title: {
    type: String,
  },
  icon: {
    type: String,
  },
  type: {
    type: String,
    default: 'default',
    validator(value: string) {
      return types.includes(value)
    },
  },
  to: {
    type: String,
  },
  target: {
    type: String,
  },
  external: {
    type: Boolean,
  },
})
</script>

<style scoped>
.fmkeys :deep(div) {
  @apply first-letter:lowercase! font-mono;
}
:deep(p) {
  margin-top: 0;
  margin-bottom: 0;
}
</style>
