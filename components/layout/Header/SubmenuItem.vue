<script lang="ts" setup>
const { to, target, icon, title, description, tag } = defineProps<{
  to?: string
  target?: string
  showLinkIcon?: boolean
  icon?: string
  title?: string
  description?: string
  tag?: string
}>()
</script>

<template>
  <component :is="tag || 'div'">
    <NuxtLinkLocale
      :to
      :target
      class="mb-1 flex w-full gap-2 rounded-md px-3 py-2 transition-all hover:bg-muted"
    >
      <Icon
        v-if="icon"
        :name="icon"
        class="mt-1"
      />

      <div>
        <div class="font-semibold text-base">
          {{ title }}
        </div>
        <div
          v-if="description"
          class="text-sm text-muted-foreground"
        >
          {{ description }}
        </div>
      </div>
    </NuxtLinkLocale>
  </component>
</template>
