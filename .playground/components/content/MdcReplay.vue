<template>
  <ClientOnly>
    <UiCard class="relative px-8 py-4 [&:not(:first-child)]:mt-5 overflow-hidden">
      <MdcEditor v-model="markdown" />

      <div class="absolute w-full flex items-center justify-center gap-2 mx--6 mt--10 [--primary:142_71%_45%] h-8">
        <Shortcut
          v-for="(char, index) in currentChars"
          :key="index + currentPosition[0]"
          :value="char || ''"
          size="md"
          class="min-w-6 justify-center"
          :class="[
            char === 'hidden' && '!hidden',
            index === offset-1 && '!h-8 min-w-8 border-primary !font-bold animate-in slide-in-from-bottom-0.5',
            index < offset && 'shadow-lg bg-primary/10',
            index > offset-1 && 'border-none',
            processedContent.markedPositions.has(currentPosition[0] - offset + index) && 'text-white !bg-blue !border-blue',
            processedContent.markedPositions.has(currentPosition[0] - offset + index) && index === offset-1 && '!bg-blue',
          ]"
          :style="{
            opacity: index === offset-1 ? 1
              : index < offset-1 ? Math.max(0, 1 - (offset-2 - index) * 0.1)
                : Math.max(0, 0.9 - (index - offset) * 0.1),
          }"
        />
      </div>

      <div class="flex items-center gap-2 mx--6 [--primary:142_71%_45%]">
        <div class="flex items-center gap-1">
          <UiButton
            :disabled="currentPosition[0] <= 0"
            size="xs"
            variant="outline"
            @click="firstChar"
          >
            <Icon name="lucide:chevron-first" />
          </UiButton>

          <UiButton
            :disabled="currentPosition[0] <= 0"
            size="xs"
            variant="outline"
            @click="prevChar"
          >
            <Icon name="lucide:chevron-left" />
          </UiButton>

          <UiButton
            size="sm"
            @click="togglePlayPause"
          >
            <Icon :name="isPlaying ? 'lucide:pause' : 'lucide:play'" />
          </UiButton>

          <UiButton
            size="xs"
            variant="outline"
            :disabled="currentPosition[0] >= _content.length"
            @click="nextChar"
          >
            <Icon name="lucide:chevron-right" />
          </UiButton>

          <UiButton
            class="min-w-12"
            size="xs"
            variant="outline"
            @click="cycleSpeed"
          >
            x{{ speedLabel }}
          </UiButton>

          <UiButton
            class="min-w-12"
            size="xs"
            variant="outline"
            @click="onReload"
          >
            <Icon name="lucide:rotate-cw" />
          </UiButton>
        </div>

        <UiSlider
          v-model="currentPosition"
          :min="0"
          :max="_content.length"
          :disabled="isPlaying"
        />
      </div>
    </UiCard>
  </ClientOnly>
</template>

<script setup lang="ts">
const props = defineProps<{
  content: string
  defaultPosition?: number
}>()

// Add a function to process content and track marked positions
const processedContent = computed(() => {
  const markedPositions = new Set<number>()
  const contentArray: string[] = []
  let inMark = false
  let inKbd = false
  let currentPos = 0
  let currentKbdContent = ''

  const content = props.content?.trim() || ''
  for (let i = 0; i < content.length; i++) {
    if (content.slice(i, i + 7) === '<Xmark>') {
      inMark = true
      i += 6 // Skip the <Xmark> tag
    }
    else if (content.slice(i, i + 8) === '</Xmark>') {
      inMark = false
      i += 7 // Skip the </Xmark> tag
    }
    else if (content.slice(i, i + 6) === '<Xkbd>') {
      inKbd = true
      currentKbdContent = ''
      i += 5
    }
    else if (content.slice(i, i + 7) === '</Xkbd>') {
      inKbd = false
      contentArray.push(currentKbdContent)
      currentPos++
      i += 6
    }
    else {
      if (inMark) {
        markedPositions.add(currentPos)
      }
      if (inKbd) {
        currentKbdContent += content[i]
      }
      else {
        contentArray.push(content[i])
      }

      currentPos++
    }
  }

  return {
    content: contentArray,
    markedPositions,
  }
})

// Update _content to use processed content
const _content = computed(() => processedContent.value.content)

const currentPosition = ref(props.defaultPosition ? [props.defaultPosition] : [0])

// Update getMdContent to use markedPositions
const getMdContent = (position: number) => {
  return _content.value.slice(0, position).map((char) => {
    // Replace Xkbd content with 'X'
    return char.length > 1 ? '\\\n' : char
  }).join('')
}

// Update the md ref
const markdown = ref(getMdContent(currentPosition.value[0]))
const isPlaying = ref(false)
const replayInterval = ref<ReturnType<typeof setInterval>>()

const baseSpeed = 250 // base interval in ms
const speeds = [0.5, 1, 2]
const currentSpeedIndex = ref(1) // start at 1x speed

const speed = computed(() => baseSpeed / speeds[currentSpeedIndex.value])
const speedLabel = computed(() => speeds[currentSpeedIndex.value])

const offset = 6
const currentChars = computed(() => {
  const start = currentPosition.value[0] - offset

  return Array.from({ length: offset * 2 + 1 }, (_, i) => {
    const pos = start + i
    if (pos < 0 || pos >= _content.value.length)
      return 'hidden'
    return getCurrentChar(pos + 1)
  })
})

const cycleSpeed = () => {
  currentSpeedIndex.value = (currentSpeedIndex.value + 1) % speeds.length
  if (isPlaying.value) {
    stopReplay()
    startReplay()
  }
}

const startReplay = () => {
  isPlaying.value = true
  replayInterval.value = setInterval(() => {
    if (currentPosition.value[0] < _content.value.length) {
      currentPosition.value = [currentPosition.value[0] + 1]
      markdown.value = getMdContent(currentPosition.value[0])
    }
    else {
      stopReplay()
    }
  }, speed.value)
}

const stopReplay = () => {
  if (replayInterval.value) {
    clearInterval(replayInterval.value)
  }
  isPlaying.value = false
}

const togglePlayPause = () => {
  if (isPlaying.value) {
    stopReplay()
  }
  else {
    if (currentPosition.value[0] >= _content.value.length) {
      currentPosition.value = [0]
      markdown.value = ''
    }
    startReplay()
  }
}

const nextChar = () => {
  if (currentPosition.value[0] < _content.value.length) {
    currentPosition.value = [currentPosition.value[0] + 1]
    markdown.value = getMdContent(currentPosition.value[0])
  }
}

const prevChar = () => {
  if (currentPosition.value[0] > 0) {
    currentPosition.value = [currentPosition.value[0] - 1]
    markdown.value = getMdContent(currentPosition.value[0])
  }
}

const firstChar = () => {
  currentPosition.value = [0]
  markdown.value = ''
}

const onReload = () => {
  currentPosition.value = props.defaultPosition ? [props.defaultPosition] : [0]
}

// Watch for manual slider changes when not playing
watch(currentPosition, (newPos) => {
  if (!isPlaying.value) {
    markdown.value = getMdContent(newPos[0])
  }
})

const getCurrentChar = (pos: number): string | null => {
  const char = _content.value[pos - 1] || null
  return char === ' ' ? '␣' : char === '\n' ? '↵' : char
}
</script>
