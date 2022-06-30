<script setup lang="ts">
import { currentSessionDurationSeconds, isWorking } from '~/composables/state'

const barClasses = computed(() => {
  if (isWorking()) {
    return ['h-15', 'text-3xl']
  }
  return 'h-0 op-0'
})
</script>

<template>
  <div transition-all-1000 :class="barClasses">
    <div flex="~ row grow" gap-2 w-full>
      <span flex-basis-100 text-right font-mono>{{ formatTime(currentSessionDurationSeconds) }}</span>
      <span flex-basis-100>Worked</span>
    </div>
  </div>
</template>
