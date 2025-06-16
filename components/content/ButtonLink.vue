<template>
  <NuxtLink
    :to="to || href"
    :target="(blank && '_blank') || target"
    class="button-link block"
  >
    <UiButton
      :variant
      :size
    >
      <Icon
        v-if="leftIcon"
        :name="leftIcon"
        class="mr-1"
      />
      <span v-if="title">
        {{ title }}
      </span>
      <ContentSlot unwrap="p" />
      <Icon
        v-if="rightIcon"
        :name="rightIcon"
        class="ml-1"
      />
    </UiButton>
  </NuxtLink>
</template>

<script setup lang="ts">
import type { ButtonVariants } from '../ui/button'

defineProps<{
  variant?: ButtonVariants['variant']
  size?: ButtonVariants['size']
  title?: string
  leftIcon?: string
  rightIcon?: string
  to?: string
  href?: string
  target?: Target
  blank?: boolean
}>()
</script>
