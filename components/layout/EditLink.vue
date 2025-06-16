<template>
  <div
    v-if="enabledPageFooter"
    class="mb-6 w-fit"
  >
    <NuxtLink
      :to="url"
      target="_blank"
      class="text-sm font-semibold text-primary"
    >
      <div class="flex items-center gap-2">
        <Icon :name="icon" />
        <span>
          {{ $t(text) }}
        </span>
      </div>
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
const { url, enabledPageFooter, text, icon } = useEditLink()
</script>
