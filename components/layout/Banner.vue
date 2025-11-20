<template>
  <Transition>
    <div
      v-if="open === true"
      class="app__banner block relative h-[var(--banner-height)] transition-colors bg-primary/10"
      :class="{
        'hover:cursor-pointer hover:bg-primary/25': to,
        'border-b': border,
      }"
    >
      <NuxtLink
        :to
        class="container flex items-stretch w-full md:px-8 h-full"
        @click.prevent.stop="navigate"
      >
        <div class="hidden lg:block" />
        <MDC
          :value="content"
          class="flex items-center justify-center text-primary text-lg w-full"
        />
      </NuxtLink>

      <div class="absolute right-0 top-0 h-full">
        <div class="container h-full flex items-stretch justify-end">
          <UiButton
            v-if="showClose"
            variant="ghost"
            class="z-40 h-auto px-3 [--accent:var(--primary)] !bg-opacity-25 rounded-none"
            aria-label="Close banner"
            @click.stop="open = Date.now()"
          >
            <NuxtIcon
              name="lucide:x"
              size="24"
            />
          </UiButton>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
const open = useCookie<boolean | number>('banner-open', { default: () => true })
const { showClose, content, to, target, border, height } = useConfig().value.banner

function navigate() {
  if (open.value && to) {
    navigateTo(to, {
      external: true,
      open: {
        target,
      },
    })
  }
}

watch(open, () => {
  useHead({
    bodyAttrs: {
      style: `--banner-height: ${open.value === true ? height : '0px'};`,
    },
  })
}, { immediate: true })
</script>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.3s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
