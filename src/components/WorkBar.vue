<script setup lang="ts">
import { currentSessionDurationSeconds, isWorking } from '~/composables/state'

const barClasses = computed(() => {
  if (isWorking.value) {
    return ['text-4xl', 'h-10']
  }
  return ['mb--10', 'h-0']
})
</script>

<template>
  <div transition-all-1000 static :class="barClasses">
    <div flex="~ row grow" gap-2 w-full>
      <span text-right font-mono w-full>{{ formatTime(currentSessionDurationSeconds) }}</span>
      <span w-full>Worked</span>
    </div>
  </div>
</template>
