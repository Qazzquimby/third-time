<template>
  <div>Stored rest: {{ makeTimeString(storedRestSeconds) }}</div>
</template>

<script setup lang="ts">
import { makeTimeString } from './models';
defineProps({
  storedRestSeconds: { type: Number, required: true },
});
</script>
