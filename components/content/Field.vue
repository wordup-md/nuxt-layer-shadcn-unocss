<template>
  <div class="[&:not(:first-child)]:mt-4 [&:not(:first-child)]:pt-4 animate-scroll-fade-in-up">
    <div class="mb-2">
      <div class="flex items-center gap-2">
        <Badge
          type="primary"
          size="lg"
        >
          {{ name }}
        </Badge>

        <span
          v-if="required"
          class="font-mono text-sm text-muted-foreground"
        >
          {{ $t(fieldRequiredText) }}
        </span>

        <span class="ml-auto font-mono text-sm text-muted-foreground text-right text-balance">
          {{ type }}
        </span>
      </div>

      <div
        v-if="defaultValue"
        class="text-muted-foreground text-right"
      >
        <span class="font-bold mr-1 text-sm text-muted-foreground">
          default:
        </span>
        <ProseCodeInline>
          {{ defaultValue }}
        </ProseCodeInline>
      </div>
    </div>
    <span class="text-sm text-muted-foreground">
      <ContentSlot unwrap="p" />
      {{ description }}
    </span>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  name: string
  type?: string
  required?: boolean
  description?: string
  defaultValue?: string
}>()

const { fieldRequiredText } = useConfig().value.main
</script>
