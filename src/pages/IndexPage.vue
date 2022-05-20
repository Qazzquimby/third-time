<template>
  <!--  <q-page class="row items-center justify-evenly">-->
  <div style="width: 500px">
    <div v-if="timerMode === WORKING">
      <working-control-bar
        :session-duration-seconds="currentSessionDurationSeconds"
        @pause="pause"
        @stop="stop"
      ></working-control-bar>
    </div>
    <div v-else-if="timerMode === RESTING">
      <resting-control-bar
        :stored-rest-seconds="storedRestSeconds"
        @start="start"
        @stop="stop"
      ></resting-control-bar>
    </div>
    <div v-else-if="timerMode === STOPPED">
      <stopping-control-bar
        :stored-rest-seconds="storedRestSeconds"
        @start="start"
        @reset="reset"
      ></stopping-control-bar>
    </div>
    <div v-else>Invalid timerMode {{ timerMode }}</div>

    <div v-if="timerMode === WORKING || timerMode === STOPPED">
      <stored-rest-bar
        :stored-rest-seconds="storedRestSeconds"
      ></stored-rest-bar>
    </div>
    <total-work-bar :total-work-seconds="totalWorkSeconds"></total-work-bar>
  </div>

  <div>
    <q-input
      v-model="minutesSinceModeChange"
      debounce="500"
      style="max-width: 300px"
      label="Minutes since mode change"
    ></q-input>
  </div>

  <div>currentTime {{ currentTime }}</div>

  <div>modeChangeTime {{ modeChangeTime }}</div>

  <div>currentSessionDurationSeconds {{ currentSessionDurationSeconds }}</div>
  <div>Mode: {{ timerMode }}, {{ minutesSinceModeChange }}</div>
  <!--  </q-page>-->
</template>

<script setup lang="ts">
/* eslint-disable @typescript-eslint/no-unused-vars */
import WorkingControlBar from 'components/WorkingControlBar.vue';
import StoredRestBar from 'components/StoredRestBar.vue';
import { computed, onBeforeMount, ref, watch } from 'vue';
import RestingControlBar from 'components/RestingControlBar.vue';
import StoppingControlBar from 'components/StoppingControlBar.vue';
import TotalWorkBar from 'components/TotalWorkBar.vue';
import { useQuasar } from 'quasar';
import { DateTime } from 'luxon';
const $q = useQuasar();
import { useStorage } from '@vueuse/core';

const audio = new Audio(
  'https://cdn.videvo.net/videvo_files/audio/premium/audio0151/watermarked/Ringtone-Alarm-Smart-Phone-Vibe-Chime-Alarm-or-Alert_COMM-1450_preview.mp3'
);

const initialized = ref(false);

const WORKING = 'working';
const RESTING = 'resting';
const STOPPED = 'stopped';

const timerMode = useStorage('timerMode', STOPPED);
const currentTime = ref(DateTime.now());

const modeChangeTime = useStorage('modeChangeTime', DateTime.now(), undefined, {
  serializer: {
    read: (v: string) => DateTime.fromISO(v),
    write: (v: DateTime) => v.toISO(),
  },
});

const minutesSinceModeChange = computed({
  get() {
    return Math.floor(
      currentTime.value.diff(modeChangeTime.value, 'minutes').minutes
    );
  },
  set(value: number) {
    modeChangeTime.value = currentTime.value.minus({ minutes: value });
  },
});

const oldStoredRestSeconds = useStorage('oldStoredRestSeconds', 0);
const oldTotalWorkSeconds = useStorage('oldTotalWorkSeconds', 0);

const WORK_TO_REST_RATIO = 3;

const timeSinceModeChange = computed(() => {
  return Math.ceil(
    currentTime.value.diff(modeChangeTime.value, ['seconds']).seconds
  );
});

const currentSessionDurationSeconds = computed(() => {
  if (timerMode.value === WORKING) {
    return timeSinceModeChange.value;
  } else {
    return 0;
  }
});

const newEarnedRest = computed(() => {
  if (timerMode.value === WORKING) {
    return currentSessionDurationSeconds.value / WORK_TO_REST_RATIO;
  } else {
    return 0;
  }
});

const newSpentRest = computed(() => {
  if (timerMode.value === RESTING || timerMode.value === STOPPED) {
    return timeSinceModeChange.value;
  } else {
    return 0;
  }
});

const storedRestSeconds = computed(() => {
  let result =
    oldStoredRestSeconds.value + newEarnedRest.value - newSpentRest.value;
  if (timerMode.value === STOPPED) {
    result = Math.max(0, result);
  }
  return result;
});

const totalWorkSeconds = computed(() => {
  return oldTotalWorkSeconds.value + currentSessionDurationSeconds.value;
});

watch(storedRestSeconds, (newSeconds, oldSeconds) => {
  if (oldSeconds >= 0 && newSeconds < 0) {
    audio.play();
  }
});

function onUnload(event: BeforeUnloadEvent) {
  if (timerMode.value === RESTING) {
    // Cancel the event as stated by the standard.
    event.preventDefault();
    // Chrome requires returnValue to be set.
    event.returnValue = '';
  }
}

onBeforeMount(() => {
  window.addEventListener('beforeunload', (event) => {
    onUnload(event);
  });
});

function setTimerMode(newMode: string) {
  if (timerMode.value === newMode) {
    return;
  }

  oldTotalWorkSeconds.value = totalWorkSeconds.value;
  oldStoredRestSeconds.value = storedRestSeconds.value;

  modeChangeTime.value = DateTime.now();
  timerMode.value = newMode;
}

function start() {
  setTimerMode(WORKING);
}

function pause() {
  setTimerMode(RESTING);
}

function stop() {
  setTimerMode(STOPPED);
}

function reset() {
  console.log('resetting');
  stop();
  oldStoredRestSeconds.value = 0;
  oldTotalWorkSeconds.value = 0;
}

setInterval(() => {
  currentTime.value = DateTime.now();
}, 1000);
</script>
