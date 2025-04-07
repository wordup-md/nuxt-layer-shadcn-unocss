<template>
  <UiAlert
    class="transition-all [&:not(:first-child)]:mt-5 group/card"
    :class="[
      typeTwClass[type],
      to && 'hover:bg-muted/50',
      !noClick && to && 'cursor-pointer',
      inStack && 'm-0 rounded-none border-none',
    ]"
    @click="alertClick"
  >
    <div class="flex flex-row gap-2">
      <Icon
        v-if="icon && title"
        :name="icon"
        :size="16"
      />

      <UiAlertTitle
        v-if="title"
        class="font-semibold mb-3"
      >
        {{ title }}
      </UiAlertTitle>
    </div>

    <UiAlertDescription class="w-full">
      <div class="flex flex-row gap-2">
        <Icon
          v-if="icon && !title"
          :name="icon"
          :size="16"
          class="mb-[2px] mt-0.5 min-w-5 self-start"
        />

        <span
          class="w-full text-foreground"
          :class="[to && 'pr-8']"
        >
          <slot />
        </span>
      </div>

      <LinkIcon
        v-if="showLinkIcon"
        :to
        :target
        :external
      />
    </UiAlertDescription>
  </UiAlert>
</template>

<script setup lang="ts">
const {
  to,
  target,
  type = 'default',
  external = undefined,
  inStack = false,
  showLinkIcon = true,
  noClick = false,
} = defineProps<{
  title?: string
  icon?: string
  type?: 'default' | 'info' | 'warning' | 'success' | 'danger' | 'secondary'
  to?: string
  target?: Target
  external?: boolean
  inStack?: boolean
  showLinkIcon?: boolean
  noClick?: boolean
}>()

const typeTwClass = {
  default: '',
  info: 'border-info text-info bg-info/05 dark:bg-info/15 [&>svg]:text-info',
  warning: 'border-warning text-warning bg-warning/05 dark:bg-warning/15 [&>svg]:text-warning',
  success: 'border-success text-success bg-success/05 dark:bg-success/15 [&>svg]:text-success',
  danger: 'border-danger text-danger bg-danger/05 dark:bg-danger/15 [&>svg]:text-danger',
  example: 'border-violet-600 border-dashed text-violet-600 bg-violet-600/05 dark:bg-violet-600/15 [&>svg]:text-violet-600',
  secondary: 'bg-muted/50',
}

async function alertClick() {
  if (!noClick && to) {
    if (target) {
      await navigateTo(to, {
        external: external ?? to?.startsWith('http'),
        open: { target },
      })
    }
    else {
      await navigateTo(to, {
        external: external ?? to?.startsWith('http'),
      })
    }
  }
}
</script>
