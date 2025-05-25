<template>
  <div>
    <NuxtLink
      v-if="logo.light && logo.dark"
      to="/"
      class="logo__container flex transition"
    >
      <Icon
        :name="logo.light"
        size="28"
        class="logo logo-light h-7 dark:hidden!"
      />
      <Icon
        :name="logo.dark"
        size="28"
        class="logo logo-dark h-7 hidden! dark:block!"
      />
      <div
        v-if="showTitle && title"
        class="ml-3 self-center font-bold whitespace-nowrap"
      >
        {{ $t(title) }}
      </div>
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
const { logo, title, showTitle } = useConfig().value.header
</script>
