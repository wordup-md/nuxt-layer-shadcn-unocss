<template>
  <header
    class="app__header"
    :class="cn(
      'sticky top-0 z-40 w-full bg-background/80 backdrop-blur-lg',
      !config.header.border && 'lg:border-b mb-[-1px]',
      config.header.class,
    )"
  >
    <LayoutBanner v-if="config.banner.enable" />

    <div
      class="flex h-14 items-center justify-between gap-2 px-4 md:px-8"
      :class="{
        'border-b lg:border-none': config.header.border,
        'container max-w-screen-2xl': config.main.padded,
      }"
    >
      <LayoutHeaderLogo class="hidden md:flex" />

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
import { cn } from '@/lib/utils'

const config = useConfig()
</script>
