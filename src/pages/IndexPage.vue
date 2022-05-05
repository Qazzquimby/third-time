<template>
  <!--  <q-page class="row items-center justify-evenly">-->
  <div style="height: 500px; width: 500px">
    <div v-if="currentAction.name === 'working'">
      <working-control-bar
        :session-duration-minutes="currentSessionDurationMinutes"
        @pause="pause"
        @stop="stop"
      ></working-control-bar>
    </div>
    <div v-else-if="currentAction.name === 'resting'">
      <resting-control-bar
        :stored-rest-minutes="storedRestMinutes"
        @start="start"
        @stop="stop"
      ></resting-control-bar>
    </div>

    <div
      v-if="
        currentAction.name === 'working' ||
        currentAction.name === 'stopped'
      "
    >
      <stored-rest-bar
        :stored-rest-minutes="storedRestMinutes"
      ></stored-rest-bar>
    </div>
    <total-work-bar :total-work-minutes="totalWorkMinutes"></total-work-bar>
  </div>
  <!--  </q-page>-->
</template>

<script setup lang="ts">
/* eslint-disable @typescript-eslint/no-unused-vars */
import WorkingControlBar from 'components/WorkingControlBar.vue';
import StoredRestBar from 'components/StoredRestBar.vue';
import { ref } from 'vue';
import RestingControlBar from 'components/RestingControlBar.vue';
import TotalWorkBar from 'components/TotalWorkBar.vue';
import { useQuasar } from 'quasar';

const $q = useQuasar()

const currentAction = {name: 'working'}
const currentSessionDurationMinutes = ref(0)
const storedRestMinutes = ref(0);
const totalWorkMinutes = ref(0);

function start() {
  $q.bex.send('TIMER_START')
}

function pause() {
  $q.bex.send('TIMER_PAUSE')
}

function stop() {
  $q.bex.send('TIMER_STOP')
}

$q.bex.on('ON_TICK_TIMERS', (
  response: { data: {
    currentSessionDurationMinutes: number,
    storedRestMinutes: number,
    totalWorkMinutes: number
    }
  }
) => {
  const timers = response.data
  console.log('timers', timers);
  currentSessionDurationMinutes.value = timers.currentSessionDurationMinutes;
  storedRestMinutes.value = timers.storedRestMinutes;
  totalWorkMinutes.value = timers.totalWorkMinutes;
})

</script>
