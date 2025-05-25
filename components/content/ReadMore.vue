<template>
  <Alert
    :to
    :target
    :icon
  >
    {{ $t(prefix) }} <span class="font-semibold">{{ computedTitle }}</span>
  </Alert>
</template>

<script setup lang="ts">
const {
  prefix = 'Read more at',
  title,
  to,
  icon = 'lucide:bookmark',
} = defineProps<{
  prefix?: string
  title?: string
  to: string
  target?: Target
  icon?: string
}>()

const computedTitle = computed<string>(
  () => {
    if (title)
      return title

    try {
      if (to?.startsWith('http'))
        return to.replace('http://', '').replace('https://', '').replace(/\/$/, '')

      return useBreadcrumb(to).filter(x => x.title !== '').map(x => x.title).join(' > ')
    }
    catch {
      return to
    }
  },
)
</script>
