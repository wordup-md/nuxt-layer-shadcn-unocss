<template>
  <div :class="cn(badgeVariants({ variant, type }), props.class)">
    <slot />
  </div>
</template>

<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { type BadgeVariants, badgeVariants } from '.'
import { cn } from '@/lib/utils'

const props = defineProps<{
  type?: BadgeVariants['type']
  variant?: BadgeVariants['variant']
  class?: HTMLAttributes['class']
}>()
</script>
