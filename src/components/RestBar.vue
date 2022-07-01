<script setup lang="ts">
import { isResting, storedRestSeconds } from '~/composables/state'

const barClasses = computed(() => {
  if (isResting()) {
    return ['h-15', 'text-4xl']
  }
  return ['h-7']
})
</script>

<template>
  <div transition-all-1000 text-2xl :class="barClasses">
    <div flex="~ row grow" gap-2>
      <span text-right font-mono w-full>{{ formatTime(storedRestSeconds) }}</span>
      <span w-full>Rest</span>
    </div>
  </div>
</template>

