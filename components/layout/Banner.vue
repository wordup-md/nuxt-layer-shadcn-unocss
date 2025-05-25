<template>
  <Transition>
    <div
      v-if="open === true"
      class="app__banner block transition-colors bg-primary/10"
      :class="{
        'hover:cursor-pointer hover:bg-primary/25': to,
        'border-b': border,
      }"
    >
      <div class="container h-10 flex items-center justify-between px-4 md:px-8">
        <NuxtLink

          :to
          @click.prevent="navigate"
        >
          <div class="hidden lg:block" />
          <div class="text-sm">
            <MDC
              :value="content"
              class="flex items-center text-primary text-lg"
            />
          </div>
        </NuxtLink>

        <UiButton
          v-if="showClose"
          variant="ghost"
          class="z-40 size-10 p-2 [--accent:var(--primary)] !bg-opacity-25 rounded-none"
          aria-label="Close banner"
          @click.prevent="open = Date.now()"
        >
          <NuxtIcon
            name="lucide:x"
            size="36"
          />
        </UiButton>
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
