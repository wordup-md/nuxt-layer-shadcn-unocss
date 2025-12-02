<template>
  <span
    v-if="name?.endsWith('.svg')"
    class="svg-icon"
    :style="`--svg: url(${name}); width: ${size}px; height: ${size}px;`"
    v-bind="$attrs"
  />
  <!-- Iconify Icons -->
  <NuxtIcon
    v-else-if="isValidIcon"
    :name
    :size="+size"
    :style="`min-width: ${+size + 1}px; min-height: ${+size + 1}px;`"
    :class="$attrs.class"
  />

  <!-- Emojis // Need v-bind to apply class in ssr mode -->
  <span
    v-else-if="isValidEmoji"
    :style="`font-size: ${+size - 2}px;line-height: ${size}px;`"
    v-bind="$attrs"
  >
    {{ name }}
  </span>

  <!-- Link -->
  <NuxtImg
    v-else
    :src="name"
    :style="`width: ${size}px; height: ${size}px;`"
    class="inline-block"
    :class="$attrs.class"
  />
</template>

<script setup lang="ts">
import { stringToIcon, validateIconName } from '@iconify/utils'

const { name, size = 16 } = defineProps<{
  name: string
  size?: number | string
}>()

const isValidIcon = computed(() => {
  if (!name) return false
  if (name.startsWith('http')) return false
  return validateIconName(stringToIcon(name))
})

const isValidEmoji = computed(() =>
  /(\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff])/g.test(
    name,
  ),
)
</script>

<style scoped>
.svg-icon {
  display: inline-block;
  width: 1em;
  height: 1em;
  background-color: currentColor;
  -webkit-mask-image: var(--svg);
  mask-image: var(--svg);
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;
  -webkit-mask-size: 100% 100%;
  mask-size: 100% 100%;
}
</style>
