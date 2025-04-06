<script lang="ts" setup>
import { cn } from '@/lib/utils'
import { navigationMenuTriggerStyle } from '@/components/ui/navigation-menu'

const { to, target, showLinkIcon, icon, title, tag, dropdownClass }
  = defineProps<{
    to?: string
    target?: string
    rel?: string
    showLinkIcon?: boolean
    icon?: string
    title?: string
    tag?: string
    dropdownClass?: string
  }>()
</script>

<template>
  <UiNavigationMenuItem class="relative">
    <NuxtLink
      v-if="!$slots.content"
      :to
      :target
      :rel
      class="relative"
    >
      <NuxtIcon
        v-if="showLinkIcon ?? false"
        name="lucide:arrow-up-right"
        class="absolute right-1 top-1 text-muted-foreground"
        size="13"
      />
      <div
        class="bg-transparent font-semibold whitespace-break-spaces !flex"
        :class="[navigationMenuTriggerStyle()]"
      >
        <Icon
          v-if="icon"
          :name="icon"
          class="min-w-5 mr-2"
        />
        <span v-if="title">{{ title }}</span>
        <slot v-else-if="$slots.default" />
      </div>
    </NuxtLink>

    <template v-else>
      <UiNavigationMenuTrigger
        class="bg-transparent font-semibold whitespace-break-spaces"
      >
        <span v-if="title">{{ title }}</span>
        <slot v-else-if="$slots.default" />
      </UiNavigationMenuTrigger>
      <UiNavigationMenuContent class="dropdown-menu">
        <component
          :is="tag || 'div'"
          :class="cn('w-[450px] p-2', dropdownClass)"
        >
          <slot name="content" />
        </component>
      </UiNavigationMenuContent>
    </template>
  </UiNavigationMenuItem>
</template>

<style scoped>
:deep(p) {
  margin-top: 0 !important;
}
:deep(ul) {
  list-style: none;
  margin: 0 !important;
}
:deep(hr) {
  margin: 0.5rem 0 !important;
}
:deep(> hr),
:deep(> div > hr) {
  margin: 0 !important;
  height: auto;
  border-left-width: 1px;
}
</style>
