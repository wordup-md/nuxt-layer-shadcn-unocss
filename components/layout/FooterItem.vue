<script lang="ts" setup>
defineProps<{
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
    <div class="text-xl font-bold pb-4 text-muted-foreground">
      <slot />
    </div>

    <div class="flex flex-col gap-1 text-sm [&_a]:decoration-none">
      <MDCSlot
        name="content"
        unwrap="p"
      />
    </div>
    <!-- <NuxtLink
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
          <slot />
        </div>
        <div
          v-if="description"
          class="text-sm text-muted-foreground"
        >
          {{ description }}
        </div>
      </div>
    </NuxtLink> -->
  </component>
</template>
