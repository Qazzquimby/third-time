<template>
  <control-bar :icon="sharpPlayArrow" :text="text">
    <q-btn class="self-center q-pa-sm q-ma-sm" color="black" icon="pause" />
    <q-btn class="self-center q-pa-sm q-ma-sm" color="black" icon="stop" />
  </control-bar>
</template>

<script setup lang="ts">
import { sharpPlayArrow } from '@quasar/extras/material-icons-sharp';
import { computed } from 'vue';
import ControlBar from 'components/ControlBar.vue';

const props = defineProps({
  sessionDurationMinutes: Number,
});
const text = computed(() => {
  return `Working: ${props.sessionDurationMinutes}m`;
  // Todo support hours.
});
</script>

<style lang="scss">
#bar {
  height: 100px;
  width: 500px;
  background: linear-gradient(
      270deg,
      rgba(38, 197, 12, 0.3) 0%,
      rgba(48, 242, 16, 0) 100%
    ),
    #1f9e3b;
}

.work-highlight {
  color: #23d34a;
}
</style>
