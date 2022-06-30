<script setup lang="ts">
import { currentSessionDurationSeconds } from '~/composables/state'
</script>

<template>
  <div flex="~ row grow" gap-2 w-full>
    <span flex-basis-100 text-right>{{ currentSessionDurationSeconds }}</span>
    <span flex-basis-100>Worked</span>
  </div>
</template>
