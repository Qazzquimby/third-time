<template>
  <div>Total Work: {{ makeTimeString(totalWorkSeconds) }}</div>
</template>

<script setup lang="ts">
import { makeTimeString } from './models';
defineProps({
  totalWorkSeconds: { type: Number, required: true },
});
</script>
