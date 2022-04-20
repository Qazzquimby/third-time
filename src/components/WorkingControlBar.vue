<template>
  <control-bar :icon="sharpPlayArrow" :text="text" icon-color="#23d34a">
    <q-btn
      class="self-center q-pa-sm q-ma-sm"
      color="black"
      icon="pause"
      @click="$emit('pause')"
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
import { sharpPlayArrow } from '@quasar/extras/material-icons-sharp';
import { computed } from 'vue';
import ControlBar from 'components/ControlBar.vue';

defineEmits(['pause', 'stop']);

const props = defineProps({
  sessionDurationMinutes: Number,
});
const text = computed(() => {
  return `Working: ${props.sessionDurationMinutes}m`;
  // Todo support hours.
});
</script>

<style scoped lang="scss">
.bar {
  height: 100px;
  width: 500px;
  background: linear-gradient(
      270deg,
      rgba(38, 197, 12, 0.3) 0%,
      rgba(48, 242, 16, 0) 100%
    ),
    #1f9e3b;
}

.bar-icon {
  color: #23d34a;
}
</style>
