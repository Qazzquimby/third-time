<script setup lang="ts">
import { totalWorkSeconds } from '~/composables/state'

function setDailyGoalHours(event: Event) {
  if (event.target instanceof HTMLInputElement) {
    const hours = parseInt(event.target.value)
    if (!isNaN(hours)) {
      storage.value.dailyGoalHours = hours
    }
  }
}
</script>

<template>
  <div flex="~ row grow" gap-2 w-full>
    <span flex-basis-100 text-right font-mono>{{ formatTime(totalWorkSeconds) }}</span>
    <span flex-basis-100>
      Worked of
      <input
        :placeholder="storage.dailyGoalHours.toString()"
        type="number"
        w="1.5rem"
        color-black
        border-rd-2
        text-center
        @change="setDailyGoalHours"
      >h
      goal
    </span>
  </div>
</template>
