<script setup lang="ts">
import { backgroundClass, currentSessionDurationSeconds, isWorking } from '~/composables/state'

const barClasses = computed(() => {
  if (isWorking.value) {
    return ['scale-100']// ['h-14']
  }
  return ['scale-y-0']// ['mb--10', 'h-0']
})

const notchClasses = computed(() => {
  if (isWorking.value) {
    return [' scale-100']
  }
  return [' scale-y-0']
})
</script>

<template>
  <div transition-all-1000 :class="barClasses" text-4xl>
    <div flex="~ row grow" gap-2 w-full>
      <span text-right font-mono w-full>{{ formatTime(currentSessionDurationSeconds) }}</span>
      <span w-full>Worked</span>
    </div>
  </div>

  <div
    :class="[notchClasses]"
    transition-all-1000
    relative z-3
    text-sm h-0 mb-6
  >
    <p w-fit mx-auto mb--2>
      ÷ 3 =
    </p>
    <p
      :class="[backgroundClass]"
      transition-all-1000
      border-rd-100
      w-fit mx-auto p-1
    >
      +29m Rest
    </p>
  </div>
</template>
