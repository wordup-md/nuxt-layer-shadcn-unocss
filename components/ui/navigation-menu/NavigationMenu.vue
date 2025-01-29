<template>
  <div
    class="w-full amx-w-[700px] flex items-center justify-center before:flex-1 before:content-[''] after:flex-1 after:content-['']"
  >
    <NavigationMenuRoot
      v-bind="forwarded"
      v-model="currentTrigger"
      :class="
        cn('relative z-10 flex w-full items-center justify-center', props.class)
      "
    >
      <slot />
      <NavigationMenuViewport />
    </NavigationMenuRoot>
  </div>
</template>

<script setup lang="ts">
import { cn } from "@/lib/utils";
import {
  NavigationMenuRoot,
  type NavigationMenuRootEmits,
  type NavigationMenuRootProps,
  useForwardPropsEmits,
} from "radix-vue";
import { computed, type HTMLAttributes } from "vue";
import NavigationMenuViewport from "./NavigationMenuViewport.vue";

const props = defineProps<
  NavigationMenuRootProps & { class?: HTMLAttributes["class"] }
>();

const emits = defineEmits<NavigationMenuRootEmits>();

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props;

  return delegated;
});

const forwarded = useForwardPropsEmits(delegatedProps, emits);
const currentTrigger = ref("");
</script>

<style scoped></style>
