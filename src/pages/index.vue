<script setup lang="ts">
import { isResting, isStopped, isWorking } from '~/composables/state'

const audio = new Audio(
  'https://cdn.videvo.net/videvo_files/audio/premium/audio0151/watermarked/Ringtone-Alarm-Smart-Phone-Vibe-Chime-Alarm-or-Alert_COMM-1450_preview.mp3',
)
watch(storedRestSeconds, (newSeconds, oldSeconds) => {
  if (oldSeconds >= 0 && newSeconds < 0) {
    audio.play()
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

function getBackgroundClass() {
  if (isWorking()) {
    return 'bg-work'
  }
  else if (isResting()) {
    return 'bg-rest'
  }
  else if (isStopped()) {
    return 'bg-stop'
  }
}
</script>

<template>
  <div
    p="x-4 y-4" text-white
    h-screen
    flex="~ col" justify-between
    transition-1000
    :class="[getBackgroundClass()]"
  >
    <timer-header />
    <div w-full>
      <work-bar />
      <rest-bar />
      <goal-bar />
    </div>
    <div self-center>
      <footer-controls />
    </div>
  </div>
</template>

<style scoped>
.bg-work {
  background-color: hsl(130, 60%, 40%);
  transition: 1.0;
}
.bg-rest {
  background-color: hsl(35, 100%, 50%);
}
.bg-stop {
  background-color: hsl(230, 40%, 45%);
}
</style>
