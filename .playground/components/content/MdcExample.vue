<template>
  <UiCard class="divide-y overflow-hidden [&:not(:first-child)]:mt-5">
    <!-- <div
      v-for="(slot, i) in $slots.default?.() ?? []"
      :key="i"
    >
      <button @click="console.log(slot)">
        {{ i }}

        {{ slot?.props?.language === 'mdc' }}
      </button>
      <component
        :is="slot"
        :in-stack="true"
      />
    </div> -->

    <div class="p-4">
      <!-- <MdcEditor v-model="md" /> -->
      a{{ md }}
    </div>

    <MdcEditor
      v-model="code"
      editor-content-class="![&>div]:mt-0 [&_pre]:p-3 [&_pre]:bg-muted [&_code]:min-h-32"
    />
    <!-- <pre
      class="language-mdc shiki shiki-themes github-light github-dark"
    >
      <code
        ref="editableCode"
        contenteditable="true"
        @input="updateCode"
      >{{ md }}</code>
    </pre> -->
  </UiCard>
</template>

<script setup lang="ts">
import type { SetupContext } from 'vue'

defineSlots()

const _slots: SetupContext['slots'] = useSlots()

const extractMdc = () => {
  const slots = _slots?.default?.() ?? []

  for (const slot of slots) {
    if (slot.props?.language === 'mdc') {
      console.log(slot)
      return slot.props.code || ''
    }
  }
  return ''
}

const _md = extractMdc()
const md = ref(_md)

const code = computed({
  get() {
    return '```mdc\n' + md.value + '\n```'
  },
  set(value) {
    md.value = value.replace('```mdc\n', '').replace('\n```', '')
  },
})

// const updateCode = (event: Event) => {
//   md.value = (event.target as HTMLTextAreaElement).innerText
//   console.log('Code updated:', md.value)
// }
// function render() {
//   const slots = _slots?.default?.() || []
//   const code = slots[0]
//   console.log(code)
//   code.props.contenteditable = 'true'
//   return code
// }
</script>
