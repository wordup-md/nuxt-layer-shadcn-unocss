<template>
  <section
    class="hero relative mx-auto flex max-w-[980px] items-center gap-6 mb-8 py-8 md:py-12 md:pb-8 lg:py-24 lg:pb-20"
    :class="[
      ($attrs?.class || '').includes('full-width') && 'w-full max-w-full',
      ['left', 'right'].includes(mediaPosition) && 'flex-row',
      mediaPosition === 'right' && 'flex-row-reverse',
      mediaPosition === 'bottom' && 'flex-col-reverse',
      ['cover', 'center'].includes(mediaPosition) && 'bg-opacity-0',
      mediaPosition === 'center' && 'text-center items-center flex-row p-8',
    ]"
  >
    <div
      class="hero__media overflow-hidden"
      :class="{
        'w-5/13 shrink-0': media && (mediaPosition === 'left' || mediaPosition === 'right'),
        'absolute inset-0': ['cover', 'center'].includes(mediaPosition),
      }"
    >
      <NuxtImg
        v-if="media"
        :src="media"
        class="w-full h-full object-cover"
      />
      <ContentSlot
        :use="$slots.media"
        unwrap="p"
      />
    </div>

    <div class="hero__content flex flex-col gap-6 w-full z-1">
      <NuxtLink
        v-if="announcement"
        :to="announcement.to"
        :target="announcement.target"
        class="hero__announcement inline-flex items-center rounded-lg bg-muted px-3 py-1 text-sm font-medium"
        :class="($attrs?.class || '').includes('full-width') && 'w-max mx-auto'"
      >
        <template v-if="announcement.icon">
          <Icon
            :name="announcement.icon"
            :size="16"
          />
          <UiSeparator
            class="mx-2 h-4"
            orientation="vertical"
          />
        </template>
        <span class="sm:hidden">{{ announcement.title }}</span>
        <span class="hidden sm:inline">
          {{ announcement.title }}
        </span>
        <NuxtIcon
          name="lucide:arrow-right"
          class="ml-1 size-4"
        />
      </NuxtLink>

      <h1 class="hero__title text-center text-3xl font-bold md:text-6xl md:leading-[1.25]">
        <ContentSlot
          :use="$slots.title"
          unwrap="p"
        />
      </h1>

      <span
        class="hero__description max-w-[750px] text-center text-lg text-muted-foreground sm:text-xl"
        :class="($attrs?.class || '').includes('full-width') && 'max-w-full'"
      >
        <ContentSlot
          :use="$slots.description"
          unwrap="p"
        />
      </span>

      <section
        v-if="actions"
        class="hero__actions flex w-full items-center justify-center space-x-4 py-4 md:pb-10"
      >
        <NuxtLink
          v-for="(action, i) in actions"
          :key="i"
          :to="action.to"
          :target="action.target"
        >
          <UiButton :variant="action.variant">
            <Icon
              v-if="action.leftIcon"
              :name="action.leftIcon"
              class="mr-1"
            />
            {{ action.name }}
            <Icon
              v-if="action.rightIcon"
              :name="action.rightIcon"
              class="ml-1"
            />
          </UiButton>
        </NuxtLink>
      </section>
    </div>
  </section>
</template>

<script setup lang="ts">
const {
  mediaPosition = 'right',
} = defineProps<{
  announcement?: {
    to?: string
    target?: Target
    icon?: string
    title: string
  }

  actions?: [
    {
      name: string
      leftIcon?: string
      rightIcon?: string
      variant?:
        | 'default'
        | 'link'
        | 'destructive'
        | 'outline'
        | 'secondary'
        | 'ghost'
      to: string
      target?: Target
    },
  ]

  media?: string
  mediaPosition?: 'left' | 'right' | 'top' | 'bottom' | 'cover' | 'center'
}>()

defineSlots()
</script>
