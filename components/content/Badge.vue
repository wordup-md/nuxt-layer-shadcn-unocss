<template>
  <NuxtLink
    v-if="to"
    :to
    :target
    class="mx-0.5"
  >
    <UiBadge
      :variant
      :type
      :class="[
        'cursor-pointer',
        size === 'sm'
          && 'rounded-md px-1.5 py-0.5 text-xs font-normal leading-none',
      ]"
    >
      <ContentSlot unwrap="p" />
    </UiBadge>
  </NuxtLink>

  <span
    v-else
    class="mx-0.5 inline"
  >
    <UiBadge
      :variant
      :type
      :class="[
        size === 'sm'
          && 'rounded-md px-1.5 py-0.5 text-xs font-normal leading-none',
        size === 'lg'
          && 'px-3 text-base',
      ]"
    >
      <ContentSlot unwrap="p" />
    </UiBadge>
  </span>
</template>

<script setup lang="ts">
const {
  type = 'default',
  variant = 'default',
  size = 'md',
} = defineProps<{
  type?: 'default' | 'primary' | 'secondary' | 'info' | 'warning' | 'success' | 'danger' | 'new'
  to?: string
  target?: Target
  variant?: 'default' | 'fill' | 'outline' | 'text'
  size?: 'sm' | 'md' | 'lg'
}>()
</script>
