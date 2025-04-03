<template>
  <div
    v-if="to"

    class="absolute right-3 top-3 flex z-1 p-1 transition bg-background/50 rounded"
    :class="{
      'group-hover/card:translate-x-1 group-hover/card:translate-y--1': _external,
      'group-hover/card:translate-x-1': !_external,
    }"
  >
    <SmartIcon
      :name="_external ? 'lucide:arrow-up-right' : 'lucide:arrow-right'"
      :size="size"
    />
  </div>
</template>

<script setup lang="ts">
const {
  to,
  target,
  external = undefined,
  size = 20,
} = defineProps<{
  to?: string
  target?: Target
  external?: boolean
  size?: number
}>()

const _external = computed(() => external ?? (target === '_blank' || to?.startsWith('http')))
</script>
