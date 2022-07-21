<script setup lang="ts">
import { storage } from '~/composables/state'

const audio = new Audio(
  'https://cdn.videvo.net/videvo_files/audio/premium/audio0151/watermarked/Ringtone-Alarm-Smart-Phone-Vibe-Chime-Alarm-or-Alert_COMM-1450_preview.mp3',
)
watch(storedRestSeconds, (newSeconds, oldSeconds) => {
  if (oldSeconds >= 0 && newSeconds < 0) {
    console.log(`previous rest ${oldSeconds} seconds. Current rest ${newSeconds} seconds.`)
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
</script>

<template>
  <div h-screen overflow-y-scroll style="scroll-snap-type: y proximity">
    <the-timer />
    <div h-screen style="scroll-snap-align: start">
      <about-page />
    </div>
  </div>
</template>
