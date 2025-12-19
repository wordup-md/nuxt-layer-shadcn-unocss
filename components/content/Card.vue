<template>
  <UseTemplate>
    <UiCard
      class="card relative flex flex-col h-full overflow-hidden transition-all min-h-8"
      :class="[
        to && 'hover:shadow-lg',
        inStack && 'mb-0 rounded-none border-none shadow-none',
        ['left', 'right'].includes(mediaPosition) && 'flex-row',
        mediaPosition === 'right' && 'flex-row-reverse',
        mediaPosition === 'bottom' && 'flex-col-reverse justify-between',
        ['cover', 'center'].includes(mediaPosition) && 'bg-opacity-0',
        mediaPosition === 'center' && 'text-center items-center flex-row p-8',
      ]"
    >
      <div
        v-if="media || $slots.media"
        class="card__media overflow-hidden"
        :class="{
          'w-5/13 shrink-0': (media || $slots.media) && (mediaPosition === 'left' || mediaPosition === 'right'),
          'absolute inset-0': ['cover', 'center'].includes(mediaPosition),
        }"
      >
        <NuxtImg
          v-if="media"
          :src="media"
          class="w-full h-full object-cover aspect-video"
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
          class="card__header"
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

          <div class="flex flex-col gap-2 w-full">
            <div
              v-if="date"
              class="card__date text-sm text-muted-foreground"
              style="text-decoration: none !important"
            >
              {{ new Intl.DateTimeFormat(locale, { dateStyle: 'long' }).format(new Date(date)) }}
            </div>

            <UiCardTitle
              v-if="title || $slots.title"
              class="card__title"
              :class="{ 'group-hover/card:underline': to, 'pr-4': ['left', 'bottom'].includes(mediaPosition) && to }"
            >
              <ContentSlot
                :use="$slots.title"
                unwrap="p"
              />
              <MDC
                v-if="title"
                :value="title"
                unwrap="p"
              />
            </UiCardTitle>

            <UiCardDescription
              v-if="description || $slots.description"
              class="card__description"
            >
              <ContentSlot
                :use="$slots.description"
                unwrap="p"
              />
              <!-- v-if="description" -->
              <!-- <MDC
                v-if="description"
                :value="description || ''"
                unwrap="p"
              /> -->
              {{ description }}
            </UiCardDescription>
          </div>
        </UiCardHeader>

        <UiCardContent
          v-if="content || $slots.content || $slots.default"
          class="card__content"
          :class="{ 'py-3': !icon && !(title || $slots.title) && !(description || $slots.description) }"
        >
          <ContentSlot unwrap="p" />
          <ContentSlot
            :use="$slots.content"
            unwrap="p"
          />
        </UiCardContent>

        <UiCardFooter
          v-if="footer || $slots.footer"
          class="card__footer"
        >
          <ContentSlot
            :use="$slots.footer"
            unwrap="p"
          />
          <MDC
            v-if="footer"
            :value="footer"
            unwrap="p"
          />
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

  <div
    :class="cn('group/card group-has-[div]:mt-0 [&:not(:first-child)]:mt-5', String($attrs.class || ''))"
  >
    <NuxtLinkLocale
      v-if="to"
      :to
      :target
      style="text-decoration: none; font-weight: 500"
    >
      <CardInner />
    </NuxtLinkLocale>

    <CardInner v-else />
  </div>
</template>

<script setup lang="ts">
import { cn } from '@/lib/utils'

defineOptions({
  inheritAttrs: false,
})

const {
  title,
  to,
  external = undefined,
  showLinkIcon = true,
  iconSize = 24,
  iconPosition = 'left',
  mediaPosition = 'top',
} = defineProps<{
  title?: string
  description?: string
  date?: string
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

const { locale } = useI18nDocs()

defineSlots()

const [UseTemplate, CardInner] = createReusableTemplate()

// const _slots: SetupContext['slots'] = useSlots()
// console.log(_slots)
</script>
