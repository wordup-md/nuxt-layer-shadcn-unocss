<template>
  <UseTemplate>
    <UiCard
      class="relative flex flex-col h-full overflow-hidden transition-all min-h-8"
      :class="[
        to && 'hover:shadow-lg',
        inStack && 'mb-0 rounded-none border-none shadow-none',
        ['left', 'right'].includes(mediaPosition) && 'flex-row',
        mediaPosition === 'right' && 'flex-row-reverse',
        mediaPosition === 'bottom' && 'flex-col-reverse',
        ['cover', 'center'].includes(mediaPosition) && 'bg-opacity-0',
        mediaPosition === 'center' && 'text-center items-center flex-row p-8',
        $attrs.class,
      ]"
    >
      <div
        class="overflow-hidden"
        :class="{
          'w-5/13 shrink-0': media && (mediaPosition === 'left' || mediaPosition === 'right'),
          'absolute inset-0': ['cover', 'center'].includes(mediaPosition),
        }"
      >
        <NuxtImg
          v-if="media"
          :src="media"
          class="w-full h-full object-cover"
          :class="{
            'group-hover/card:scale-105 transition-all': to,
          }"
        />
        <ContentSlot
          :use="$slots.media"
          unwrap="p"
        />
      </div>

      <div class="w-full z-1">
        <UiCardHeader
          v-if="
            icon || title || $slots.title || description || $slots.description
          "
          :class="{
            'flex-row gap-5': iconPosition === 'left',
            'items-center': mediaPosition === 'center',
          }"
        >
          <Icon
            v-if="icon"
            :name="icon"
            :size="iconSize"
            :class="{ 'mb-2': iconPosition !== 'left' && (title || $slots.title) }"
          />

          <div class="flex flex-col gap-1.5 w-full">
            <UiCardTitle
              v-if="title || $slots.title"
              :class="{ 'group-hover/card:underline': to, 'pr-4': ['left', 'bottom'].includes(mediaPosition) && to }"
            >
              <ContentSlot
                :use="$slots.title"
                unwrap="p"
              />
              {{ title }}
            </UiCardTitle>

            <UiCardDescription v-if="description || $slots.description">
              <ContentSlot
                :use="$slots.description"
                unwrap="p"
              />
              {{ description }}
            </UiCardDescription>
          </div>
        </UiCardHeader>

        <UiCardContent
          v-if="content || $slots.content || $slots.default"
          :class="{ 'py-3': !icon && !(title || $slots.title) && !(description || $slots.description) }"
        >
          <ContentSlot
            :use="$slots.content"
            unwrap="p"
          />
          <ContentSlot unwrap="p" />
        </UiCardContent>

        <UiCardFooter v-if="footer || $slots.footer">
          <ContentSlot
            :use="$slots.footer"
            unwrap="p"
          />
          {{ footer }}
        </UiCardFooter>

        <LinkIcon
          v-if="showLinkIcon"
          :to
          :target
          :external
        />
      </div>
    </UiCard>
  </UseTemplate>

  <div class="group/card group-has-[div]:mt-0 [&:not(:first-child)]:mt-5">
    <NuxtLink
      v-if="to"
      :to
      :target
      style="text-decoration: none; font-weight: 500"
    >
      <CardInner />
    </NuxtLink>
    <CardInner v-else />
  </div>
</template>

<script setup lang="ts">
defineOptions({
  inheritAttrs: false,
})

const {
  to,
  external = undefined,
  showLinkIcon = true,
  iconSize = 24,
  iconPosition = 'left',
  mediaPosition = 'top',
} = defineProps<{
  title?: string
  description?: string
  content?: string
  footer?: string

  to?: string
  target?: Target
  external?: boolean
  showLinkIcon?: boolean

  icon?: string
  iconSize?: number
  iconPosition?: 'top' | 'left'

  media?: string
  mediaPosition?: 'left' | 'right' | 'top' | 'bottom' | 'cover' | 'center'

  inStack?: boolean
}>()

defineSlots()

const [UseTemplate, CardInner] = createReusableTemplate()

// const _slots: SetupContext['slots'] = useSlots()
// console.log(_slots)
</script>
