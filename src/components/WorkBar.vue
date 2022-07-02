<script setup lang="ts">
import { currentSessionDurationSeconds, isWorking } from '~/composables/state'

const barClasses = computed(() => {
  if (isWorking()) {
    return ['text-4xl', 'h-10']// ['top-0', 'text-4xl']
  }
  return ['mb--10', 'mb-0', 'h-0'] // 'top-10'
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
