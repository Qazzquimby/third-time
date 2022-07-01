<script setup lang="ts">
import { minutesSinceModeChange, setMinutesSinceModeChange } from '~/composables/state'
</script>

<template>
  <!-- consider using https://headlessui.com/vue/dialog -->
  <div>
    <p>
      I should've pressed that
      <little-input
        :target="minutesSinceModeChange" :min="0" :max="999"
        @change="(val: number) => { setMinutesSinceModeChange(val) }"
      />
      minutes ago.
    </p>
  </div>

  <ul flex="~ row" gap-3>
    <li>
      <button btn @click="start">
        PLAY
      </button>
    </li>
    <li>
      <button btn @click="pause">
        PAUSE
      </button>
    </li>
    <li>
      <button btn @click="stop">
        STOP
      </button>
    </li>
  </ul>
</template>
