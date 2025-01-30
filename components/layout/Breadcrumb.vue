<template>
  <UiBreadcrumb>
    <UiBreadcrumbList>
      <template
        v-for="(breadcrumb, index) in breadcrumbs"
        :key="breadcrumb.title"
      >
        <UiBreadcrumbItem>
          <NuxtLink
            :href="breadcrumb.href || '#'"
            class="transition-colors hover:text-foreground flex items-center gap-1"
            :class="[
              index === breadcrumbs.length - 1 && 'text-foreground',
              breadcrumb.classes,
            ]"
          >
            <SmartIcon
              v-if="breadcrumb.icon"
              :size="14"
              :name="breadcrumb.icon"
            />
            {{ breadcrumb.title }}
          </NuxtLink>
        </UiBreadcrumbItem>

        <UiBreadcrumbSeparator v-if="index !== breadcrumbs.length - 1" />
      </template>
    </UiBreadcrumbList>
  </UiBreadcrumb>
</template>

<script setup lang="ts">
const route = useRoute()

const breadcrumbs = computed(() => useBreadcrumb(route.path))
</script>
