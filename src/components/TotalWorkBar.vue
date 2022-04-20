<template>
  <div>Total Work: {{ totalWorkMinutes }}m</div>
</template>

<script setup lang="ts">
defineProps({
  totalWorkMinutes: Number,
});
</script>
