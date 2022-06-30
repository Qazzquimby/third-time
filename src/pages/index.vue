<script setup lang="ts">
import { REST_MODE, STOP_MODE } from '~/composables/constants'
import { storage, storedRestSeconds } from '~/composables/state'

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
</script>

<template>
  <div
    p="x-4 y-4" text-white
    h-screen
    flex="~ col" justify-between
  >
    <timer-header />
    <div w-full>
      <work-bar />
      <rest-bar />
      <goal-bar />
    </div>
    <div self-center>
      Footer
    </div>
  </div>
</template>
