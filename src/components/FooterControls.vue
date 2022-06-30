<script setup lang="ts">
</script>

<template>
  <ul flex="~ row" gap-3>
    <li>
      <button btn @click="start">
        PLAY
      </button>
    </li>
    <li>
      <button btn @click="pause">
        PAUSE
      </button>
    </li>
    <li>
      <button btn @click="stop">
        STOP
      </button>
    </li>
  </ul>
</template>
