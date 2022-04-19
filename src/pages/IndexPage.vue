<template>
  <!--  <q-page class="row items-center justify-evenly">-->
  <div style="height: 500px; width: 500px">
    <div v-if="currentAction.name === WORKING.name">
      <working-control-bar
        :session-duration-minutes="currentSessionDurationMinutes"
      ></working-control-bar>
    </div>
    <stored-rest-bar :stored-rest-minutes="storedRestMinutes"></stored-rest-bar>
  </div>
  <!--  </q-page>-->
</template>

<script setup lang="ts">
/* eslint-disable @typescript-eslint/no-unused-vars */
import WorkingControlBar from 'components/WorkingControlBar.vue';
import StoredRestBar from 'components/StoredRestBar.vue';
import { ref } from 'vue';

const currentSessionDurationMinutes = ref(0);
const storedRestMinutes = ref(0);
const totalWorkMinutes = ref(0);

const WORKING = {
  name: 'working',
  onTick: () => {
    currentSessionDurationMinutes.value += 1;
    storedRestMinutes.value += 1 / 3;
    totalWorkMinutes.value += 1;
  },
};
const RESTING = {
  name: 'resting',
  onTick: () => {
    storedRestMinutes.value -= 1;
  },
};
const STOPPED = {
  name: 'stopped',
  onTick: () => {
    // decrease to minimum of 0
    storedRestMinutes.value = Math.max(0, storedRestMinutes.value - 1);
  },
};

const currentAction = ref(WORKING);

const workingTick = setInterval(() => {
  currentAction.value.onTick();
}, 1000); // Todo add `60 * ` to make it minutes, not seconds
</script>
