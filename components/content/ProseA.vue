<template>
  <NuxtLinkLocale
    :to="href"
    :target="target"
    :external="external"
    :class="cn('font-semibold underline underline-offset-4', String($attrs.class || ''))"
  >
    <slot />
  </NuxtLinkLocale>
</template>

<script setup lang="ts">
import { cn } from '@/lib/utils'

const {
  href = '',
  external = false,
} = defineProps<{
  href?: string
  target?: Target
  external?: boolean
}>()
</script>
