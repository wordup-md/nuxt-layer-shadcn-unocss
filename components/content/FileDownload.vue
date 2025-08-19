<script lang="ts" setup>
const props = defineProps<{
  path: string
  title?: string
  size?: number
  icon?: string
  inStack?: boolean
  external?: boolean
}>()

// Get the asset
const { data } = await useFetch(props.path)

// Compute size
const size = computed(() => {
  return props.size ?? data.value?.size
})

// onMounted(async () => {
//   // Download the asset and get the size
//   const size = await fetch(data.value?.url).then(res => res.headers.get('content-length'))
//   console.log(size.value)
// })

const files = {
  pdf: 'i-mdi-file-pdf-outline',
  jpeg: 'i-mdi-file-image',
  svg: 'i-mdi-file-image',
}
function ext(name: string) {
  const ext = name.split('.').slice(-1)
  if (files[ext]) return files[ext]
  return 'i-mdi-file'
}

function fileSize(size: number) {
  if (props.size) return props.size
  if (!size) return null
  if (size < 1024)
    return `${size} octets`
  if (size < 1024 * 1024)
    return `${(size / 1024).toFixed(2)} Ko`
  return `${(size / 1024 / 1024).toFixed(2)} Mo`
}

const _icon = computed(() => {
  return props.icon ?? ext(props.path.split('/').pop() ?? '')
})

const _title = computed(() => {
  return props.title ?? props.path.split('/').pop()
})
</script>

<template>
  <UiAlert
    class="transition-all [&:not(:first-child)]:mt-5 group/card"
    :class="[
      path && 'hover:bg-muted/50',
      path && 'cursor-pointer',
      inStack && 'm-0 rounded-none border-none',
    ]"
  >
    <a
      :href="path"
      :target="external ? '_blank' : undefined"
      :download="external ? undefined : path"
    >
      <div
        v-if="_title"
        class="flex flex-row gap-2 items-center"
      >
        <Icon
          v-if="_icon && _title"
          :name="_icon"
          :size="20"
        />

        <UiAlertTitle
          class="mb-0 flex flex-row gap-2"
        >
          <span class="font-semibold">{{ _title }}</span>
          <span
            v-if="size"
            class="text-sm font-normal text-muted-foreground"
          >
            ( {{ fileSize(size) }} )
          </span>
        </UiAlertTitle>
      </div>
    </a>

    <div
      v-if="path"
      class="absolute right-3 top-3 flex z-1 p-1 transition bg-background/50 rounded group-hover/card:translate-y-1"
    >
      <NuxtIcon
        name="i-mdi-download"
        :size="20"
      />
    </div>
  </UiAlert>
</template>
