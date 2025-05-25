<template>
  <header
    class="app__header"
    :class="[
      cn(
        'sticky top-0 z-40 w-full bg-background/70 backdrop-blur',
        config.header.border && 'lg:border-b mb-[-1px]',
        config.header.position === 'floating' && 'floating top-4 w-min mx-auto rounded-full border-none',
        config.header.class,
      ),
      {
        'hide-on-scroll': config.header.behavior === 'hide-on-scroll',
        'scroll-up': scrollUp,
        'scroll-down': !scrollUp,
        'timeline-scroll-range-exceeded': timelineScrollRangeExceeded,
      },
    ]"
  >
    <LayoutBanner v-if="config.banner.enable" />

    <div
      class="flex h-14 items-center justify-between gap-2 px-4 md:px-8"
      :class="{
        'border-b lg:border-none': config.header.border,
        'container': config.main.padded,
      }"
    >
      <LayoutHeaderLogo class="hidden md:flex w-max mr-4" />

      <LayoutMobileNav />

      <LayoutHeaderLogo
        v-if="config.header.showTitleInMobile"
        class="flex md:hidden"
      />

      <LayoutHeaderNav class="hidden lg:flex" />

      <div class="flex justify-end gap-2">
        <LayoutSearchButton
          v-if="!config.search.inAside && config.search.style === 'input'"
        />

        <div class="flex">
          <LayoutSearchButton
            v-if="!config.search.inAside && config.search.style === 'button'"
          />

          <ThemePopover v-if="config.theme.customizable" />
          <DarkModeToggle v-if="config.header.darkModeToggle" />
          <A11yModeToggle />

          <NuxtLink
            v-for="(link, i) in config.header.links"
            :key="i"
            :to="link?.to"
            :target="link?.target"
          >
            <UiButton
              variant="ghost"
              size="icon"
              class="flex gap-2"
            >
              <Icon
                v-if="link?.icon"
                :name="link.icon"
                :size="18"
              />
            </UiButton>
          </NuxtLink>
        </div>
      </div>
    </div>

    <div
      v-if="config.toc.enable && config.toc.enableInMobile"
      class="lg:hidden"
    >
      <LayoutToc is-small />
    </div>
  </header>
</template>

<script setup lang="ts">
import { useWindowScroll } from '@vueuse/core'
import { cn } from '@/lib/utils'

const config = useConfig()

const { y } = useWindowScroll()

let lastScrollPosition = 0
let startingScrollUpPosition = 0
const timelineScrollRange = 680
const scrollUpOffset = 300

const timelineScrollRangeExceeded = computed(() => {
  return y.value - timelineScrollRange > 0
})

const scrollUp = computed(() => {
  let isScrollingUp = false

  if (y.value > lastScrollPosition) {
    isScrollingUp = false
    startingScrollUpPosition = 0
  }
  else if (y.value < lastScrollPosition) {
    if (startingScrollUpPosition === 0) {
      startingScrollUpPosition = y.value
    }
    if (startingScrollUpPosition - y.value > scrollUpOffset) {
      console.log(timelineScrollRangeExceeded.value, isScrollingUp)
      if (timelineScrollRangeExceeded.value || scrollUp.value) isScrollingUp = true
    }
  }
  lastScrollPosition = y.value
  return isScrollingUp
})
</script>

<style scoped>
@supports(animation-timeline: view()){
  .app__header.hide-on-scroll {
    --header-timeline-scroll-range-min: 200px;
    --header-animation-duration: 0.3s;
    --header-translate-y: -100%;
  }
  .app__header.hide-on-scroll.floating {
    --header-translate-y: calc(-100% - 1rem);
  }
  .app__header:not(.timeline-scroll-range-exceeded) {
    animation: disappearHeader linear both;
    animation-timeline: scroll();
    animation-range: var(--header-timeline-scroll-range-min) calc(v-bind(timelineScrollRange) * 1px);
  }
  .app__header.scroll-down.timeline-scroll-range-exceeded {
    animation: disappearHeader var(--header-animation-duration) linear both;
  }
  .app__header.scroll-up {
    animation: appearHeader var(--header-animation-duration) linear both;
    animation-range: unset;
  }

  @keyframes disappearHeader {
    100% {
        transform: translateY(var(--header-translate-y));
    }
  }

  @keyframes appearHeader {
    0% {
        transform: translateY(var(--header-translate-y));
    }
    100% {
        transform: translateY(0);
    }
  }
}
</style>
