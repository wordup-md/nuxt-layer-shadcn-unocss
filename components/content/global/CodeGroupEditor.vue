<template>
  <render />
</template>

<script setup lang="ts">
import type { VueNodeViewProps } from 'prosekit/vue'
import type { SetupContext } from 'vue'

// import { useMdcEditor } from '#imports'

const props = defineProps<VueNodeViewProps>()

// const { getComponentProps } = useMdcEditor()
// const { model, mdcAttrs } = getComponentProps(props, {
//   id: {
//     type: String,
//   },
//   class: {
//     type: String,
//     default: '',
//   },
// })

const _slots: SetupContext['slots'] = useSlots()
function render() {
  const slots2 = _slots?.default?.() || []
  const Tabs = resolveComponent('Tabs')
  // console.log(slots2, model, mdcAttrs, Tabs, props.node.value.content.content)
  const slots = props.node.value.content.content.map((tab) => {
    // console.log('tab', tab)
    const filename = tab.attrs?.meta?.replace('[', '').replace(']', '')
    return h(
      'div',
      {
        class:
          tab.attrs.attributes?.class
          || 'language-bash shiki shiki-themes github-light github-dark',
        // code: 'bun run dev\n',
        filename,
        language: tab.attrs.language,
        meta: filename,
        style: '',
        label: tab.attrs.attributes?.label,
      },
      slots2,
    )
  })
  return h(Tabs, { variant: 'card' }, () => slots)
}
</script>
