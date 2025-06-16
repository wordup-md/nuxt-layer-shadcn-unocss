<script setup lang="ts">
import { cn } from '@/lib/utils'

// Don't inherit attrs, we want to use it with cn
defineOptions({
  inheritAttrs: false,
})

defineProps<{
  title?: string
}>()

defineSlots()
</script>

<template>
  <section
    class="prose-section"
    :class="cn(
      'relative p-6 mt-6',
      classToString($attrs.class),
    )"
  >
    <div>
      <div
        v-if="$slots.before"
        class="prose-section__before"
      >
        <ContentSlot
          :use="$slots.before"
          unwrap="p"
        />
      </div>

      <ProseH2 v-if="title">
        {{ title }}
      </ProseH2>

      <!-- <span class="absolute bg-muted-foreground/05 -left-2 -top-1 -bottom-1 -right-2 md:-left-3 md:-top-0 md:-bottom-0 md:-right-3 -rotate-1" /> -->
      <!-- <div class="grid grid-cols-[repeat(auto-fit,minmax(300px,auto))] gap-6 [&>*]:mt-0!"> -->
      <div
        v-if="$slots.default"
        class="prose-section__content"
      >
        <ContentSlot
          :use="$slots.default"
          unwrap="p"
        />
      </div>

      <div
        v-if="$slots.after"
        class="prose-section__after"
      >
        <ContentSlot
          :use="$slots.after"
          unwrap="p"
        />
      </div>
    </div>
  </section>
</template>

<style scoped>
.grid-flex {
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(auto-fit, minmax(min(var(--min-column-size, 15ch), 100%), 1fr));
  background: #f7f7f7;
  border: 1px solid #e5e5e5;
  padding: 0.25rem;
}

.grid-flex > div {
  background-color: #ffdc00;
  border: 1px solid #665800;
  color: #665800;
  padding: 1rem 2rem;
  text-align: center;
}
</style>
