<template>
  <div
    class="perspective-[2000px] absolute top-full left-0 flex w-full justify-center"
  >
    <NavigationMenuViewport
      v-bind="forwardedProps"
      :class="
        cn(
          'data-[state=open]:animate-in data-[state=closed]:animate-out relative mt-[10px] h-[var(--radix-navigation-menu-viewport-height)] w-full origin-top-center overflow-hidden rounded-md bg-white transition-[width,_height] duration-300 sm:w-[var(--radix-navigation-menu-viewport-width)]',
          'border bg-popover text-popover-foreground shadow-lg data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-90',
          // '     md:w-[--radix-navigation-menu-viewport-width]',
          props.class
        )
      "
    />
  </div>
</template>

<script setup lang="ts">
import { cn } from "@/lib/utils";
import {
  NavigationMenuViewport,
  type NavigationMenuViewportProps,
  useForwardProps,
} from "radix-vue";
import { computed, type HTMLAttributes } from "vue";

const props = defineProps<
  NavigationMenuViewportProps & { class?: HTMLAttributes["class"] }
>();

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props;

  return delegated;
});

const forwardedProps = useForwardProps(delegatedProps);
</script>
