<template>
  <!-- Iconify Icons -->
  <Icon
    v-if="isValidIcon"
    :name
    :size="+size"
    :style="`min-width: ${+size + 1}px; min-height: ${+size + 1}px;`"
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
    class="inline"
  />
</template>

<script setup lang="ts">
import { stringToIcon, validateIconName } from "@iconify/utils";

const { name, size = 16 } = defineProps<{
  name: string;
  size?: number | string;
}>();

const isValidIcon = computed(() => {
  if (name.startsWith("http")) return false;
  return validateIconName(stringToIcon(name));
});

const isValidEmoji = computed(() =>
  /(\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff])/g.test(
    name
  )
);
</script>
