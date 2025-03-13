<template>
  <render />
</template>

<script setup lang="ts">
const _slots = useSlots()
const Tabs = resolveComponent('Tabs')
function render() {
  const slots = _slots?.default?.() || []
  // console.log('p', slots)
  return h(Tabs, { variant: 'card' }, () => slots)
}
</script>
