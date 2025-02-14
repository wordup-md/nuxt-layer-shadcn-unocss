<template>
  <div>
    <NuxtLink
      v-if="logo.light && logo.dark"
      to="/"
      class="logo-container flex transition"
    >
      <NuxtImg
        :src="logo.light"
        class="logo logo-light h-7 dark:hidden"
      />
      <NuxtImg
        :src="logo.dark"
        class="logo logo-dark hidden h-7 dark:block"
      />
      <span
        v-if="showTitle && title"
        class="ml-3 self-center font-bold whitespace-nowrap"
      >
        {{ title }}
      </span>
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
const { logo, title, showTitle } = useConfig().value.header
</script>
