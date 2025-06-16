<template>
  <h3
    :class="
      cn('text-2xl font-semibold leading-tight tracking-tight text-pretty', props.class)
    "
  >
    <slot />
  </h3>
</template>

<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>
