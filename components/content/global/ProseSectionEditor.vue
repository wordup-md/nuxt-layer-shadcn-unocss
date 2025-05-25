<script setup lang="ts">
import type { VueNodeViewProps } from 'prosekit/vue'
// import { useMdcEditor } from '#imports'

const props = defineProps<VueNodeViewProps>()
const { getComponentProps } = useMdcEditor()
const { model, mdcAttrs } = getComponentProps(props, {
  id: {
    type: String,
  },
  class: {
    type: String,
    default: '',
  },
  color: {
    type: String,
    default: '',
  },
})

const isFullWidth = computed(() => mdcAttrs.class?.includes('full-width'))
const isBreakout = computed(() => mdcAttrs.class?.includes('breakout'))
const isDisabled = ref(false)
const isColorMenuOpen = ref(false)

function toggleClass(classList: string, className: string) {
  classList ||= ''

  const classes = classList.trim().split(' ')

  // Add or remove class if present
  const index = classes.indexOf(className)
  if (index !== -1)
    classes.splice(index, 1)
  else
    classes.push(className)

  if (!classes.length)
    return null

  return classes.filter(c => c.length).join(' ')
}

function onSetColor(color: string | null) {
  mdcAttrs.color = color
}

function onSetBreakout() {
  mdcAttrs.class = toggleClass(mdcAttrs.class, 'breakout')
}
function onSetFullWidth() {
  mdcAttrs.class = toggleClass(mdcAttrs.class, 'full-width')
}
</script>

<template>
  <ProseSection
    v-bind="model"
    class="relative group"
  >
    <div
      contenteditable="false"
      class="flex absolute h-4 right-0 left-0 opacity-0 transition-opacity top-[-1px] hover:opacity-100"
      @mouseleave="isColorMenuOpen = false"
    >
      <div class="border-base border-t grow-1" />
      <div class="flex mx-2 h-6.5 items-stretch overflow-hidden shadow-none -mt-3.25 SECTION_MENU">
        <UiEditorToggle
          :pressed="isBreakout"
          :disabled="isDisabled"
          tooltip="Larger text content width"
          @click="onSetBreakout"
        >
          <svg
            width="24"
            height="12"
            viewBox="0 0 24 14"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              opacity="0.3"
              d="M18.6667 2C18.6667 2.35362 18.5262 2.69276 18.2761 2.94281C18.0261 3.19286 17.687 3.33333 17.3333 3.33333H6.66667C6.31304 3.33333 5.97391 3.19286 5.72386 2.94281C5.47381 2.69276 5.33333 2.35362 5.33333 2C5.33333 1.64638 5.47381 1.30724 5.72386 1.05719C5.97391 0.807142 6.31304 0.666666 6.66667 0.666666H17.3333C17.687 0.666666 18.0261 0.807142 18.2761 1.05719C18.5262 1.30724 18.6667 1.64638 18.6667 2ZM17.3333 14C17.687 14 18.0261 13.8595 18.2761 13.6095C18.5262 13.3594 18.6667 13.0203 18.6667 12.6667C18.6667 12.313 18.5262 11.9739 18.2761 11.7239C18.0261 11.4738 17.687 11.3333 17.3333 11.3333H6.66667C6.31304 11.3333 5.97391 11.4738 5.72386 11.7239C5.47381 11.9739 5.33333 12.313 5.33333 12.6667C5.33333 13.0203 5.47381 13.3594 5.72386 13.6095C5.97391 13.8595 6.31304 14 6.66667 14H17.3333Z"
              fill="currentColor"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M24 7.33333C24 7.68695 23.8595 8.02609 23.6095 8.27614C23.3594 8.52619 23.0203 8.66667 22.6667 8.66667H1.33333C0.979711 8.66667 0.640573 8.52619 0.390524 8.27614C0.140476 8.02609 0 7.68695 0 7.33333C0 6.97971 0.140476 6.64057 0.390524 6.39052C0.640573 6.14047 0.979711 6 1.33333 6H22.6667C23.0203 6 23.3594 6.14047 23.6095 6.39052C23.8595 6.64057 24 6.97971 24 7.33333Z"
              fill="currentColor"
            />
          </svg>
        </UiEditorToggle>

        <div class="border-base border-l" />

        <UiEditorToggle
          :pressed="isFullWidth"
          :disabled="isDisabled"
          tooltip="Full width background"
          @click="onSetFullWidth"
        >
          <svg
            width="24"
            height="12"
            viewBox="0 0 24 12"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              width="24"
              height="12"
              fill="currentColor"
              fill-opacity="0.15"
            />
            <path
              d="M16.2 3L19 6M19 6L16.2 9M19 6H5M7.8 3L5 6M5 6L7.8 9"
              stroke="currentColor"
              stroke-width="1.2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </UiEditorToggle>

        <div class="border-l border-base" />

        <UiEditorDropdown
          :offset="-1"
          :open="isColorMenuOpen"
          @on-open-change="isColorMenuOpen = $event"
        >
          <UiEditorToggle
            :pressed="!!mdcAttrs.color"
            :disabled="isDisabled"
            tooltip="Color"
            :offset="5"
            class="h-full p0 pt-[2px]"
            @click.prevent
          >
            <div class="i-mdi-format-color-fill mt0.75 h-5 min-w-10 opacity-80" />
          </UiEditorToggle>

          <template #menu>
            <label>Couleur de fond :</label>
            <div class="flex gap-2">
              <UiEditorToggle
                :pressed="!mdcAttrs.color"
                @click="onSetColor(null)"
              >
                <div class="h-4 overflow-hidden border w-8">
                  <div class="bg-red-500 w-10 h-[2px] translate-x-[-3px] translate-y-[5px] rotate--25 transform" />
                </div>
              </UiEditorToggle>
              <UiEditorToggle
                v-for="color in ['bg-primary-500', 'bg-secondary-500', 'bg-gray-100']"
                :key="color"
                :pressed="mdcAttrs.color === color"
                @click="onSetColor(color)"
              >
                <div
                  class="h-4 w-8"
                  :class="color"
                />
              </UiEditorToggle>
            </div>
          </template>
        </UiEditorDropdown>
      </div>

      <div class="grow-1 border-t border-base" />
    </div>

    <div :ref="props.contentRef" />

    <template #section>
      <slot name="section" />
    </template>
  </ProseSection>
</template>
