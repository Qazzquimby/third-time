<script setup lang="ts">
import { backgroundClass, storage } from '~/composables/state'

const audio = new Audio(
  'https://cdn.videvo.net/videvo_files/audio/premium/audio0151/watermarked/Ringtone-Alarm-Smart-Phone-Vibe-Chime-Alarm-or-Alert_COMM-1450_preview.mp3',
)
watch(storedRestSeconds, (newSeconds, oldSeconds) => {
  if (oldSeconds >= 0 && newSeconds < 0) {
    audio.play()
  }
})

watch([storage.value.timerMode, storedRestSeconds, currentSessionDurationSeconds], () => {
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
  <div
    p="x-4 t-4" text-white
    h-screen
    flex="~ col" justify-between
    transition-1000
    :class="[backgroundClass]"
    overflow-clip
  >
    <timer-header />
    <bar-box />
    <div self-center>
      <footer-controls />
    </div>
  </div>
  <p text-center h-100>
    More content here later!
  </p>
</template>

<style scoped>

</style>
