<template>
  <!--  <q-page class="row items-center justify-evenly">-->
  <div style="height: 500px; width: 500px">
    <div v-if="initialized">
      <div v-if="timerMode === 'working'">
        <working-control-bar
          :session-duration-minutes="currentSessionDurationMinutes"
          @pause="pause"
          @stop="stop"
        ></working-control-bar>
      </div>
      <div v-else-if="timerMode === 'resting'">
        <resting-control-bar
          :stored-rest-minutes="storedRestMinutes"
          @start="start"
          @stop="stop"
        ></resting-control-bar>
      </div>
      <div v-else-if="timerMode === 'stopped'">
        <stopping-control-bar
          :stored-rest-minutes="storedRestMinutes"
          @start="start"
          @reset="reset"
        ></stopping-control-bar>
      </div>
      <div v-else>Invalid timerMode {{ timerMode }}</div>

      <div v-if="timerMode === 'working' || timerMode === 'stopped'">
        <stored-rest-bar
          :stored-rest-minutes="storedRestMinutes"
        ></stored-rest-bar>
      </div>
      <total-work-bar :total-work-minutes="totalWorkMinutes"></total-work-bar>
    </div>
  </div>
  <!--  </q-page>-->
</template>

<script setup lang="ts">
/* eslint-disable @typescript-eslint/no-unused-vars */
import WorkingControlBar from 'components/WorkingControlBar.vue';
import StoredRestBar from 'components/StoredRestBar.vue';
import { onBeforeMount, ref } from 'vue';
import RestingControlBar from 'components/RestingControlBar.vue';
import StoppingControlBar from 'components/StoppingControlBar.vue';
import TotalWorkBar from 'components/TotalWorkBar.vue';
import { useQuasar } from 'quasar';

const $q = useQuasar();

const initialized = ref(false);
const timerMode = ref('stopped');
const currentSessionDurationMinutes = ref(0);
const storedRestMinutes = ref(0);
const totalWorkMinutes = ref(0);

onBeforeMount(() => {
  // @ts-ignore chrome is present but not found
  chrome.storage.local
    .get([
      'timerMode',
      'currentSessionDurationMinutes',
      'storedRestMinutes',
      'totalWorkMinutes',
    ])
    .then(
      (resp: {
        timerMode: string;
        currentSessionDurationMinutes: number;
        storedRestMinutes: number;
        totalWorkMinutes: number;
      }) => {
        if (!['working', 'resting', 'stopped'].includes(resp.timerMode)) {
          $q.bex.send('TIMER_RESET');
        }
        initialized.value = true;
        timerMode.value = resp.timerMode;
        currentSessionDurationMinutes.value =
          resp.currentSessionDurationMinutes;
        storedRestMinutes.value = resp.storedRestMinutes;
        totalWorkMinutes.value = resp.totalWorkMinutes;
      }
    );
});

function start() {
  console.log('sending start');
  timerMode.value = 'working';
  $q.bex.send('TIMER_START');
}

function pause() {
  console.log('sending pause');
  timerMode.value = 'resting';
  $q.bex.send('TIMER_PAUSE');
}

function stop() {
  console.log('sending stop');
  timerMode.value = 'stopped';
  $q.bex.send('TIMER_STOP');
}

function reset() {
  console.log('sending reset');
  $q.bex.send('TIMER_RESET');
}

$q.bex.on(
  'ON_TICK_TIMERS',
  (response: {
    data: {
      currentSessionDurationMinutes: number;
      storedRestMinutes: number;
      totalWorkMinutes: number;
    };
  }) => {
    const timers = response.data;
    console.log('timers', timers);
    currentSessionDurationMinutes.value = timers.currentSessionDurationMinutes;
    storedRestMinutes.value = timers.storedRestMinutes;
    totalWorkMinutes.value = timers.totalWorkMinutes;
  }
);
</script>
