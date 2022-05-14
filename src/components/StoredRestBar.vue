<template>
  <div>Stored rest: {{ makeTimeString(storedRestSeconds) }}</div>
</template>

<script setup lang="ts">
import { makeTimeString } from './models';
defineProps({
  storedRestSeconds: Number,
});
</script>
