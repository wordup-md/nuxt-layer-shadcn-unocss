<template>
  <UiCard class="relative px-8 py-4 [&:not(:first-child)]:mt-5 overflow-hidden">
    <MdcEditor v-model="md" />

    <div class="absolute w-full flex items-center justify-center gap-2 mx--6 mt--10 [--primary:142_71%_45%]">
      <Shortcut
        v-for="(char, index) in currentChars"
        :key="index"
        :value="char || ''"
        size="md"
        class="min-w-6 justify-center"
        :class="[
          char === 'hidden' && '!hidden',
          index === offset-1 && 'scale-120 border-primary',
          index < offset && 'shadow-lg bg-primary/10',
          index > offset-1 && 'border-none',
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
          class="min-w-10"
          size="xs"
          variant="outline"
          @click="cycleSpeed"
        >
          {{ speedLabel }}x
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
</template>

<script setup lang="ts">
const props = defineProps<{
  content: string
  defaultPosition?: number
}>()

const _content = props.content.trim()
const currentPosition = ref(props.defaultPosition ? [props.defaultPosition] : [0])
const md = ref(_content.slice(0, currentPosition.value[0]))
const isPlaying = ref(false)
const replayInterval = ref<ReturnType<typeof setInterval>>()

const baseSpeed = 200 // base interval in ms
const speeds = [0.5, 1, 2]
const currentSpeedIndex = ref(1) // start at 1x speed

const speed = computed(() => baseSpeed / speeds[currentSpeedIndex.value])
const speedLabel = computed(() => speeds[currentSpeedIndex.value])

const getCurrentChar = (pos: number): string | null => {
  const char = _content[pos - 1] || null
  return char === ' ' ? '␣' : char === '\n' ? '↵' : char
}

const offset = 6
const currentChars = computed(() => {
  const start = currentPosition.value[0] - offset

  return Array.from({ length: offset * 2 + 1 }, (_, i) => {
    const pos = start + i
    if (pos < 0 || pos >= _content.length)
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
    if (currentPosition.value[0] < _content.length) {
      currentPosition.value = [currentPosition.value[0] + 1]
      md.value = _content.slice(0, currentPosition.value[0])
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
    if (currentPosition.value[0] >= _content.length) {
      currentPosition.value = [0]
      md.value = ''
    }
    startReplay()
  }
}

const nextChar = () => {
  if (currentPosition.value[0] < _content.length) {
    currentPosition.value = [currentPosition.value[0] + 1]
    md.value = _content.slice(0, currentPosition.value[0])
  }
}

const prevChar = () => {
  if (currentPosition.value[0] > 0) {
    currentPosition.value = [currentPosition.value[0] - 1]
    md.value = _content.slice(0, currentPosition.value[0])
  }
}

const firstChar = () => {
  currentPosition.value = [0]
  md.value = ''
}

// Watch for manual slider changes when not playing
watch(currentPosition, (newPos) => {
  if (!isPlaying.value) {
    md.value = _content.slice(0, newPos[0])
  }
})
</script>
