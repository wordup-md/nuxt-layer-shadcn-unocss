<template>
  <section
    class="mx-auto max-w-[980px] flex flex-col items-center gap-2 py-8 lg:py-24 md:py-12 lg:pb-20 md:pb-8"
  >
    <NuxtLink
      v-if="model.announcement"
      :to="model.announcement.to"
      :target="model.announcement.target"
      class="inline-flex items-center rounded-lg bg-muted px-3 py-1 text-sm font-medium"
    >
      <template v-if="model.announcement.icon">
        <SmartIcon :name="model.announcement.icon" :size="16" />
        <UiSeparator class="mx-2 h-4" orientation="vertical" />
      </template>
      <span class="sm:hidden">{{ model.announcement.title }}</span>
      <span class="hidden sm:inline">
        {{ model.announcement.title }}
      </span>
      <Icon name="lucide:arrow-right" class="ml-1 size-4" />
    </NuxtLink>

    <h1
      class="text-center text-3xl font-bold leading-tight tracking-tighter md:text-6xl lg:leading-[1.1]"
    >
      <ContentSlot :use="$slots.title" unwrap="p" />
    </h1>
    <span
      class="max-w-[750px] text-center text-lg text-muted-foreground sm:text-xl"
    >
      <ContentSlot :use="$slots.description" unwrap="p" />
    </span>

    <section
      class="w-full flex items-center justify-center py-4 space-x-4 md:pb-10"
    >
      <NuxtLink
        v-for="(action, i) in model.actions"
        :key="i"
        :to="action.to"
        :target="action.target"
      >
        <UiButton :variant="action.variant" @click.prevent>
          <SmartIcon
            v-if="action.leftIcon"
            :name="action.leftIcon"
            class="mr-1"
          />
          {{ action.name }}
          <SmartIcon
            v-if="action.rightIcon"
            :name="action.rightIcon"
            class="ml-1"
          />
        </UiButton>
      </NuxtLink>
    </section>
  </section>
</template>

<script setup lang="ts">
import type { VueNodeViewProps } from "prosekit/vue";

// defineProps<{
//   announcement?: {
//     to?: string
//     target?: string
//     icon?: string
//     title: string
//   }
//   actions: [{
//     name: string
//     leftIcon?: string
//     rightIcon?: string
//     variant?: 'default' | 'link' | 'destructive' | 'outline' | 'secondary' | 'ghost'
//     to: string
//     target?: string
//   }]
// }>()
const props = defineProps<VueNodeViewProps>();
const { getComponentProps } = useMdcEditor();

const { model } = getComponentProps(props, {
  id: {
    type: String,
  },
  class: {
    type: String,
  },
  announcement: {
    type: Object,
  },
  actions: {
    type: Array,
  },
});

defineSlots();
</script>
