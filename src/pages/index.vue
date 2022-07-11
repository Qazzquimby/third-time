<script setup lang="ts">
import Shepherd from 'shepherd.js'
import { backgroundClass, pause, start, stop, storage } from '~/composables/state'

const audio = new Audio(
  'https://cdn.videvo.net/videvo_files/audio/premium/audio0151/watermarked/Ringtone-Alarm-Smart-Phone-Vibe-Chime-Alarm-or-Alert_COMM-1450_preview.mp3',
)
watch(storedRestSeconds, (newSeconds, oldSeconds) => {
  if (oldSeconds >= 0 && newSeconds < 0) {
    audio.play()
  }
})

watch([storedRestSeconds, currentSessionDurationSeconds], () => {
  if (isWorking.value) {
    document.title = `Working: ${formatTime(currentSessionDurationSeconds.value)}`
  }
  else if (isResting.value) {
    document.title = `Resting: ${formatTime(storedRestSeconds.value)}`
  }
  else {
    document.title = 'ThirdTime Stopped'
  }
})

function onUnload(event: BeforeUnloadEvent) {
  if (storage.value.timerMode === REST_MODE) {
    // Cancel the event as stated by the standard.
    event.preventDefault()
    // Chrome requires returnValue to be set.
    event.returnValue = ''
  }
}
onBeforeMount(() => {
  window.addEventListener('beforeunload', (event) => {
    onUnload(event)
  })
})

const tour = new Shepherd.Tour({
  useModalOverlay: true,
  defaultStepOptions: {
    classes: 'shadow-md bg-slate-800 z-10 p-8 border-rd-10 text-xl max-w-120 mb-8',
    highlightClass: 'shepherd-highlight',
    scrollTo: false,
  },
})
const shepherdButtons = [{
  text: 'Next',
  action: tour.next,
  classes: 'shepherd-btn',
}]

onMounted(() => {
  tour.addStep({
    id: 'introduction',
    text: 'ThirdTime is a productivity timer, for managing work and rest time.',
    buttons: shepherdButtons,
  })
  tour.addStep({
    id: 'work time',
    text: 'While working, your session length is displayed here.',
    arrow: true,
    attachTo: {
      element: '#work-timer',
      on: 'top',
    },
    when: {
      show: () => start(),
    },
    buttons: shepherdButtons,
  })
  tour.addStep({
    id: 'rest calculation',
    text: '1/3rd of your work time (changeable) is earned as rest time.',
    arrow: true,
    attachTo: {
      element: '#work-ratio',
      on: 'top',
    },
    buttons: shepherdButtons,
  })
  tour.addStep({
    id: 'rest button',
    text: 'The pause button starts a short break, no longer than your stored rest.',
    attachTo: {
      element: '#rest-button',
      on: 'bottom',
    },
    when: {
      show: () => pause(),
    },
    buttons: shepherdButtons,
  })
  tour.addStep({
    id: 'stop button',
    text: 'The stop button is for when you stop working or take a long, untimed break. It still spends rest time, but there\s no limit.',
    attachTo: {
      element: '#stop-button',
      on: 'bottom',
    },
    when: {
      show: () => stop(),
    },
    buttons: shepherdButtons,
  })
  tour.addStep({
    id: 'reset button',
    text: 'When stopped, you can press the reset button to restart, maybe at the beginning of the work day.',
    attachTo: {
      element: '#reset-button',
      on: 'top',
    },
    buttons: shepherdButtons,
  })
  tour.addStep({
    id: 'button adjustment',
    text: 'If you forget to change the timer, you can click an already pressed button to rewrite history and press the button in the past.',
    attachTo: {
      element: '#button-bar',
      on: 'bottom',
    },
    when: {
      hide: () => start(),
    },
    buttons: shepherdButtons,
  })
})

function runTour() {
  tour.start()
}
</script>

<template>
  <div h-screen overflow-y-scroll style="scroll-snap-type: y mandatory">
    <div
      p="x-4 t-4" text-white
      h-screen
      flex="~ col" justify-between
      transition-1000
      :class="[backgroundClass]"
      overflow-clip
      style="scroll-snap-align: start"
    >
      <timer-header @run-tour="runTour" />
      <bar-box />
      <footer-controls self-center />
    </div>
    <div h-screen style="scroll-snap-align: start">
      <about-page />
    </div>
  </div>
</template>

<style scoped>

</style>
