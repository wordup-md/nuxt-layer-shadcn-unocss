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
            class="transition-colors hover:text-foreground flex items-center gap-2"
            :class="index === breadcrumbs.length - 1 && 'text-foreground'"
          >
            <SmartIcon
              v-if="(breadcrumb.icon && config.main.breadCrumb.showIcon)"
              :size="breadcrumb.iconSize || config.main.breadCrumb.iconSize || 14"
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
const config = useConfig()

const breadcrumbs = computed(() => useBreadcrumb(route.path))
</script>
