<script lang="ts" setup>
import { useUnpress } from '#imports'

const { client, logout, login } = useUnpress()
</script>

<template>
  <UiButton
    variant="ghost"
    class="flex gap-2"
    @click="!!client ? logout() : login()"
  >
    <Icon
      :name="!!client ? 'lucide:log-out' : 'lucide:log-in'"
      :size="20"
    />
    {{ !!client ? $t('Logout') : $t('Login') }}
  </UiButton>
</template>
