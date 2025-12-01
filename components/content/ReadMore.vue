<template>
  <Alert
    :to
    :target
    :icon
  >
    <slot>
      {{ $t(prefix) }} <span class="font-semibold">{{ computedTitle }}</span>
    </slot>
  </Alert>
</template>

<script setup lang="ts">
const {
  prefix = 'Read more at',
  title,
  to,
  icon = 'lucide:info',
} = defineProps<{
  prefix?: string
  title?: string
  to?: string
  target?: Target
  icon?: string
}>()

const computedTitle = computed<string>(
  () => {
    if (title)
      return title

    if (!to)
      return ''

    try {
      if (to?.startsWith('http'))
        return to.replace('http://', '').replace('https://', '').replace(/\/$/, '')

      return useBreadcrumb(to).filter(x => x.title !== '').map(x => x.title.replace(/#.*$/, '')).join(' > ')
    }
    catch {
      return to
    }
  },
)
</script>
