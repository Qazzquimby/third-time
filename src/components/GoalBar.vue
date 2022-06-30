<script setup lang="ts">
import { totalWorkSeconds } from '~/composables/state'
</script>

<template>
  <div flex="~ row grow" gap-2 w-full>
    <span flex-basis-100 text-right>{{ totalWorkSeconds }}</span>
    <span flex-basis-100>Worked of 5h goal</span>
  </div>
</template>
