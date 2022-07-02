<script setup lang="ts">
import { getBackgroundClass } from '~/composables/state'
</script>

<template>
  <div w-full>
    <work-bar />
    <div
      py-3
      bg-gradient-to-b from-white:25 to bg-white:10
      border="rd-100 solid 1px" border-white:30
      grid relative
      style="grid-template-rows: 1fr 5px 1fr"
      items-center
    >
      <rest-bar style="grid-row: 1" />
      <div
        h-5px
        absolute top-0 w-screen
        :class="[getBackgroundClass()]"
        style="grid-row: 2"
      />
      <goal-bar style="grid-row: 3" />
    </div>
  </div>
</template>
