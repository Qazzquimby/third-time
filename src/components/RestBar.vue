<script setup lang="ts">
import { storedRestSeconds } from '~/composables/state'
</script>

<template>
  <div text-2xl>
    <div flex="~ row grow" gap-2 w-full>
      <span flex-basis-100 text-right font-mono>{{ formatTime(storedRestSeconds) }}</span>
      <span flex-basis-100>Rest</span>
    </div>
  </div>
</template>

