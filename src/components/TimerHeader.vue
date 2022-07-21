<script setup lang="ts">
import { runTour } from '~/composables/tour'
</script>

<template>
  <div flex justify-center>
    <div
      flex="~"
      text="1.5rem"
      max-w-100
      w-full
    >
      <span
        i-mdi-clock-time-nine-outline
        inline-block
      />
      <h1>ThirdTime</h1>

      <div flex-grow />

      <button
        glass text-center font-bold
        border-rd-100 h-10 w-10
        @click="runTour"
      >
        ?
      </button>
    </div>
  </div>
</template>

