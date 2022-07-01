<script setup lang="ts">
import { currentSessionDurationSeconds, isWorking } from '~/composables/state'

const barClasses = computed(() => {
  if (isWorking()) {
    return ['h-15', 'text-4xl']
  }
  return 'h-0 op-0'
})
</script>

<template>
  <div transition-all-1000 :class="barClasses">
    <div flex="~ row grow" gap-2 w-full>
      <span text-right font-mono w-full>{{ formatTime(currentSessionDurationSeconds) }}</span>
      <span w-full>Worked</span>
    </div>
  </div>
</template>
