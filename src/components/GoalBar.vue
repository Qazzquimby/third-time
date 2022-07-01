<script setup lang="ts">
import { storage, totalWorkSeconds } from '~/composables/state'
</script>

<template>
  <div transition-all-1000>
    <div flex="~ row grow" gap-2 w-full>
      <span text-right font-mono text-2xl self-center w-full>{{ formatTime(totalWorkSeconds) }}</span>
      <span text-lg w-full>
        Worked of <br>
        <little-input
          :target="storage.dailyGoalHours" :min="0" :max="999"
          @change="(val: number) => { storage.dailyGoalHours = val }"
        />h
        goal
      </span>
    </div>
  </div>
</template>
