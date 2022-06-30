<script setup lang="ts">
import { isResting, storedRestSeconds } from '~/composables/state'

const barClasses = computed(() => {
  if (isResting()) {
    return ['h-15', 'text-4xl']
  }
})
</script>

<template>
  <div transition-all-1000 text-2xl :class="barClasses">
    <div flex="~ row grow" gap-2 w-full>
      <span flex-basis-100 text-right font-mono>{{ formatTime(storedRestSeconds) }}</span>
      <span flex-basis-100>Rest</span>
    </div>
  </div>
</template>

