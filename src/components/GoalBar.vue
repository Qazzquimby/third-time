<script setup lang="ts">
import { storage, totalWorkSeconds } from '~/composables/state'

function setDailyGoalHours(event: Event) {
  if (event.target instanceof HTMLInputElement) {
    const hours = parseInt(event.target.value)
    if (!isNaN(hours)) {
      storage.value.dailyGoalHours = hours
    }
  }
}

const inputRem = computed(() => {
  const hours = storage.value.dailyGoalHours
  const numDigits = hours.toString().length
  return [`width: ${numDigits + 1}rem`]
})
</script>

<template>
  <div>
    <div flex="~ row grow" gap-2 w-full>
      <span flex-basis-100 text-right font-mono text-2xl self-center>{{ formatTime(totalWorkSeconds) }}</span>
      <span flex-basis-100 text-lg>
        Worked of <br>
        <input
          :placeholder="storage.dailyGoalHours.toString()"
          type="number"
          :style="inputRem"
          color-black
          border-rd-2
          text-center
          @change="setDailyGoalHours"
        >h
        goal
      </span>
    </div>
  </div>
</template>
