<template>
  <div>Stored rest: {{ Math.floor(storedRestMinutes) }}m</div>
</template>

<script setup lang="ts">
defineProps({
  storedRestMinutes: Number,
});
</script>
