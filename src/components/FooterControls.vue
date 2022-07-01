<script setup lang="ts">
import { minutesSinceModeChange, reset, setMinutesSinceModeChange } from '~/composables/state'

const resetButtonClasses = computed(() => {
  if (isStopped()) {
    return ['top-0']
  }
  return ['top-30 op-0']
})
</script>

<template>
  <div transition-all-1000 relative :class="resetButtonClasses">
    <div flex="~ row" justify-center>
      <div btn border-rd-100  @click="reset()">
        <div i-mdi-refresh text-6xl />
      </div>
    </div>
  </div>

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

  <ul flex="~ row" justify-between gap-3 mx-3>
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
