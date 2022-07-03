<script setup lang="ts">
import { minutesSinceModeChange, reset, setMinutesSinceModeChange } from '~/composables/state'

const resetButtonClasses = computed(() => {
  if (isStopped.value) {
    return ['top-0']
  }
  return ['top-30 op-0']
})
</script>

<template>
  <div>
    <div transition-all-1000 relative :class="resetButtonClasses">
      <div flex="~ row" justify-center>
        <div btn border-rd-100 @click="reset()">
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

    <ul
      flex="~ row" justify-between gap-3 mx-1
      bg-gradient-to-b from-white:25 to bg-white:10
      border="rd-10 solid 1px" border-white:30
      h-30
      relative top-15
      min-w-13rem
      max-w-18rem
      mx-auto
    >
      <li>
        <timer-button label="start" :is-pressed="isWorking" @click="start">
          <div i-mdi-play />
        </timer-button>
      </li>
      <li>
        <timer-button label="pause" :is-pressed="isResting" @click="pause">
          <div i-mdi-pause />
        </timer-button>
      </li>
      <li>
        <timer-button label="stop" :is-pressed="isStopped" @click="stop">
          <div i-mdi-stop />
        </timer-button>
      </li>
    </ul>
  </div>
</template>

