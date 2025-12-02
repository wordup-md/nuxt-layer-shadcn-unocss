<template>
  <template v-if="enable">
    <UiButton
      v-if="style === 'input'"
      variant="outline"
      class="h-8 w-full self-center rounded-md px-1.5 font-normal bg-muted/50 text-muted-foreground hover:text-accent-foreground"
      :class="[inAside ? 'mb-4' : 'md:w-32 lg:w-40']"
      @click="isOpen = true"
    >
      <span class="mr-auto overflow-hidden">
        {{ $t(placeholder) }}
      </span>
      <Kbd
        v-if="displayShortcut"
        class="ml-auto hidden md:block"
      >
        <span class="text-xs">⌘</span>K
      </Kbd>
    </UiButton>
    <UiButton
      v-else
      variant="ghost"
      size="icon"
      :class="displayShortcut && 'flex gap-2 w-[72px]'"
      @click="isOpen = true"
    >
      <NuxtIcon
        name="lucide:search"
        size="18"
      />
      <Kbd
        v-if="displayShortcut"
        class="hidden md:block"
      >
        <span class="text-xs">⌘</span>K
      </Kbd>
    </UiButton>
  </template>

  <LayoutSearchDialog v-model:open="isOpen" />
</template>

<script setup lang="ts">
const isOpen = ref(false)
const { enable, inAside, style, placeholder, displayShortcut } = useConfig().value.search
</script>
