<script lang="ts" setup>
import { useUnpress } from '#imports'

const { client, mountCms, login } = useUnpress()
const isDev = import.meta.dev

function onLogin() {
  if (isDev) {
    mountCms()
  }
  else {
    login()
  }
}

function navigateToAdmin() {
  if (client.value) {
    const route = useRoute()
    const originUrl = route.query.redirectFrom

    if (originUrl) {
      return navigateTo(originUrl as string)
    }
    else {
      return navigateTo('/admin/')
    }
  }
}

watch(client, navigateToAdmin, { immediate: true })
</script>

<template>
  <NuxtLayout>
    <div class="h-full">
      <div
        class="col-span-3 mt-[20vh] flex items-center justify-center"
      >
        <div class="flex items-center justify-center gap-4">
          <h3 class="scroll-m-20 py-3 text-2xl font-semibold">
            Open administration
          </h3>
          <Icon name="lucide:arrow-right" />
          <UiButton @click="onLogin">
            Connect & Open
          </Uibutton>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>
