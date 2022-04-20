<template>
  <control-bar :icon="sharpPause" :text="text" icon-color="#d38123">
    <q-btn
      class="self-center q-pa-sm q-ma-sm"
      color="black"
      :icon="sharpPlayArrow"
      @click="$emit('start')"
    />
    <q-btn
      class="self-center q-pa-sm q-ma-sm"
      color="black"
      icon="stop"
      @click="$emit('stop')"
    />
  </control-bar>
</template>

<script setup lang="ts">
import {
  sharpPlayArrow,
  sharpPause,
} from '@quasar/extras/material-icons-sharp';
import { computed } from 'vue';
import ControlBar from 'components/ControlBar.vue';

defineEmits(['start', 'stop']);

const props = defineProps({
  storedRestMinutes: { type: Number, required: true },
});

const text = computed(() => {
  return `Resting: ${Math.floor(props.storedRestMinutes)}m`;
  // Todo support hours.
});
</script>

<style scoped lang="scss">
#bar {
  height: 100px;
  width: 500px;
  background: linear-gradient(
      270deg,
      rgba(197, 160, 12, 0.3) 0%,
      rgba(48, 242, 16, 0) 100%
    ),
    #9e6b1f;
}
</style>
