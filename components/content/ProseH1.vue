<template>
  <h1
    :id
    class="prose-h1 scroll-m-20 text-4xl font-extrabold tracking-tight text-pretty lg:text-5xl"
  >
    <NuxtLinkLocale
      v-if="generate"
      :to="`#${id}`"
    >
      <slot />
    </NuxtLinkLocale>
    <slot v-else />
  </h1>
</template>

<script setup lang="ts">
const { id } = defineProps<{ id?: string }>()

const { headings } = useRuntimeConfig().public.mdc
const generate = computed(
  () =>
    id
    && ((typeof headings?.anchorLinks === 'boolean'
      && headings?.anchorLinks === true)
    || (typeof headings?.anchorLinks === 'object' && headings?.anchorLinks?.h1)),
)
</script>
