<script setup lang="ts">
import { reset } from '~/composables/state'

const retroAdjustPressToggled = ref(false)

const resetButtonClasses = computed(() => {
  if (isStopped.value && totalWorkSeconds.value > 0) {
    return ['top-0']
  }
  return ['top-90']
})
</script>

<template>
  <div w-full>
    <div transition-all-1000 relative :class="resetButtonClasses">
      <div flex="~ row" justify-center>
        <button
          id="reset-button"
          h-18 w-18 border-rd-100
          glass
          title="Reset timers."
          @click="reset()"
        >
          <div i-mdi-refresh text-6xl />
        </button>
      </div>
    </div>
    <retro-adjust-popover
      :is-visible="retroAdjustPressToggled"
      @hide="() => retroAdjustPressToggled = false"
    />

    <ul
      id="button-bar"
      flex="~ row" justify-between gap-3 mx-1
      glass
      relative top-15 h-30
      min-w-13rem max-w-18rem mx-auto
    >
      <li>
        <timer-button id="work-button" label="Start working." :is-pressed="isWorking" @click="if (isWorking){ retroAdjustPressToggled = true }; start()">
          <div i-mdi-play />
        </timer-button>
      </li>
      <li>
        <timer-button id="rest-button" label="Take a short, timed rest." :is-pressed="isResting" @click="if (isResting){ retroAdjustPressToggled = true }; pause()">
          <div i-mdi-pause />
        </timer-button>
      </li>
      <li>
        <timer-button id="stop-button" label="Stop working, no timer limit." :is-pressed="isStopped" @click="if (isStopped){ retroAdjustPressToggled = true }; stop()">
          <div i-mdi-stop />
        </timer-button>
      </li>
    </ul>
  </div>
</template>

