<script setup lang="ts">
import { isResting, storedRestSeconds } from '~/composables/state'

const barClasses = computed(() => {
  if (isResting.value) {
    return ['h-15', 'text-4xl']
  }
  return ['h-7']
})

const bellClasses = computed(() => {
  if (isResting.value) {
    return ['h-10']
  }
  return ['h-0']
})
</script>

<template>
  <div transition-all-1000 text-2xl :class="barClasses">
    <div transition-all-1000 i-mdi-bell class="left-47%" :class="bellClasses" text-4xl top--10 absolute />
    <div flex="~ row grow" gap-2>
      <span text-right font-mono w-full>{{ formatTime(storedRestSeconds) }}</span>
      <span w-full>Rest</span>
    </div>
  </div>
</template>

