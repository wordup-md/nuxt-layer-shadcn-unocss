<template>
  <NuxtLinkLocale
    :to="to || href"
    :target="(blank && '_blank') || target"
    class="button-link block"
  >
    <UiButton
      :variant
      :size
      :class="String($attrs.class || '')"
    >
      <Icon
        v-if="icon"
        :name="icon"
        class="mr-2"
      />

      <span v-if="title">
        {{ title }}
      </span>
      <ContentSlot unwrap="p" />

      <Icon
        v-if="trailingIcon"
        :name="trailingIcon"
        class="ml-2"
      />
    </UiButton>
  </NuxtLinkLocale>
</template>

<script setup lang="ts">
import type { ButtonVariants } from '../ui/button'

defineProps<{
  variant?: ButtonVariants['variant']
  size?: ButtonVariants['size']
  title?: string
  icon?: string
  trailingIcon?: string
  to?: string
  href?: string
  target?: Target
  blank?: boolean
}>()
</script>
