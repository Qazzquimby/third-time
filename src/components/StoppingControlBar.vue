<template>
  <control-bar
    icon="stop"
    :optional-prefix="prefix"
    :text="text"
    icon-color="#0C9AC54C"
  >
    <q-btn
      class="self-center q-pa-sm q-ma-sm"
      color="black"
      :icon="sharpPlayArrow"
      @click="$emit('start')"
    />
    <q-btn
      class="self-center q-pa-sm q-ma-sm"
      color="black"
      icon="refresh"
      @click="$emit('reset')"
    />
  </control-bar>
</template>

<script setup lang="ts">
import { sharpPlayArrow } from '@quasar/extras/material-icons-sharp';
import { computed } from 'vue';
import ControlBar from 'components/ControlBar.vue';
import { makeTimeString } from 'components/models';

defineEmits(['start', 'reset']);

const props = defineProps({
  storedRestSeconds: { type: Number, required: true },
});

const prefix = 'Stopped: ';
const text = computed(() => {
  return makeTimeString(props.storedRestSeconds);
});
</script>

<style scoped lang="scss">
#bar {
  background: linear-gradient(
      270deg,
      rgba(12, 154, 197, 0.3) 0%,
      rgba(48, 242, 16, 0) 100%
    ),
    #1f2a9e;
}
</style>
