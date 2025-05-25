<script setup lang="ts">
import { cn } from '@/lib/utils'

// Don't inherit attrs, we want to use it with cn
defineOptions({
  inheritAttrs: false,
})

defineProps<{
  color?: string
}>()
</script>

<template>
  <section
    :class="cn(
      'relative p-6 mt-6',
      classToString($attrs.class),
      color,
    )"
  >
    <!-- <span class="absolute bg-muted-foreground/05 -left-2 -top-1 -bottom-1 -right-2 md:-left-3 md:-top-0 md:-bottom-0 md:-right-3 -rotate-1" /> -->
    <div class="grid grid-cols-[repeat(auto-fit,minmax(300px,auto))] gap-6 [&>*]:mt-0!">
      <slot />
    </div>
  </section>
</template>
