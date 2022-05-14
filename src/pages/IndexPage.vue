<template>
  <!--  <q-page class="row items-center justify-evenly">-->
  <div style="height: 500px; width: 500px">
    <div v-if="initialized">
      <div v-if="timerMode.name === WORKING.name">
        <working-control-bar
          :session-duration-seconds="currentSessionDurationSeconds"
          @pause="pause"
          @stop="stop"
        ></working-control-bar>
      </div>
      <div v-else-if="timerMode.name === RESTING.name">
        <resting-control-bar
          :stored-rest-seconds="storedRestSeconds"
          @start="start"
          @stop="stop"
        ></resting-control-bar>
      </div>
      <div v-else-if="timerMode.name === STOPPED.name">
        <stopping-control-bar
          :stored-rest-seconds="storedRestSeconds"
          @start="start"
          @reset="reset"
        ></stopping-control-bar>
      </div>
      <div v-else>Invalid timerMode {{ timerMode }}</div>

      <div
        v-if="
          timerMode.name === WORKING.name || timerMode.name === STOPPED.name
        "
      >
        <stored-rest-bar
          :stored-rest-seconds="storedRestSeconds"
        ></stored-rest-bar>
      </div>
      <total-work-bar :total-work-seconds="totalWorkSeconds"></total-work-bar>
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
import { DateTime } from 'luxon';

const $q = useQuasar();

const initialized = ref(false);
const currentSessionDurationSeconds = ref(0);
const storedRestSeconds = ref(0);
const totalWorkSeconds = ref(0);

const alerted = ref(false);
const audio = new Audio(
  'https://cdn.videvo.net/videvo_files/audio/premium/audio0151/watermarked/Ringtone-Alarm-Smart-Phone-Vibe-Chime-Alarm-or-Alert_COMM-1450_preview.mp3'
);

const WORKING = {
  name: 'working',
  passTime: (seconds: number) => {
    currentSessionDurationSeconds.value += seconds;
    storedRestSeconds.value += seconds / 3;
    totalWorkSeconds.value += seconds;

    alerted.value = false;
  },
};
const RESTING = {
  name: 'resting',
  passTime: (seconds: number) => {
    storedRestSeconds.value -= seconds;

    if (storedRestSeconds.value < 0 && !alerted.value) {
      audio.play();
      alerted.value = true;
    }
  },
};
const STOPPED = {
  name: 'stopped',
  passTime: (seconds: number) => {
    // decrease to minimum of 0
    storedRestSeconds.value = Math.max(0, storedRestSeconds.value - seconds);
  },
};
const ACTIONS = [WORKING, RESTING, STOPPED];

const timerMode = ref(STOPPED);

function onUnload(event: BeforeUnloadEvent) {
  $q.localStorage.set('exitTime', DateTime.now());
  $q.localStorage.set(
    'currentSessionDurationSeconds',
    currentSessionDurationSeconds.value
  );
  $q.localStorage.set('storedRestSeconds', storedRestSeconds.value);
  $q.localStorage.set('totalWorkSeconds', totalWorkSeconds.value);
  $q.localStorage.set('timerMode', timerMode.value.name);

  if (timerMode.value.name === RESTING.name) {
    // Cancel the event as stated by the standard.
    event.preventDefault();
    // Chrome requires returnValue to be set.
    event.returnValue = '';
  }
}

function isRealNumber(value: number | undefined) {
  return typeof value === 'number' && !isNaN(value);
}

onBeforeMount(() => {
  window.addEventListener('beforeunload', (event) => {
    onUnload(event);
  });

  const currentTime = DateTime.now();

  const storage = $q.localStorage.getAll();

  const exitTime = DateTime.fromISO(storage.exitTime) ?? currentTime;

  if (isRealNumber(storage.currentSessionDurationSeconds)) {
    currentSessionDurationSeconds.value = storage.currentSessionDurationSeconds;
  }
  if (isRealNumber(storage.storedRestSeconds)) {
    storedRestSeconds.value = storage.storedRestSeconds;
  }
  if (isRealNumber(storage.totalWorkSeconds)) {
    totalWorkSeconds.value = storage.totalWorkSeconds;
  }

  timerMode.value =
    ACTIONS.find((mode) => mode.name === storage.timerMode) ?? timerMode.value;

  //floor number

  const passedSeconds = Math.floor(
    currentTime.diff(exitTime, ['seconds']).seconds
  );
  timerMode.value.passTime(passedSeconds);

  initialized.value = true;
});

function start() {
  currentSessionDurationSeconds.value = 0;
  timerMode.value = WORKING;
}

function pause() {
  timerMode.value = RESTING;
}

function stop() {
  timerMode.value = STOPPED;
}

function reset() {
  console.log('resetting');
  // $q.bex.send('TIMER_RESET');
}

setInterval(() => {
  timerMode.value.passTime(1);
}, 1000);
</script>
