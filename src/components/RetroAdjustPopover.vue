<script setup lang="ts">
import { setMinutesSinceModeChange } from '~/composables/state'
import useClickAway from '~/composables/useClickAway'

const props = defineProps(['isVisible'])
const emit = defineEmits(['hide'])

const rootNode = ref(null)

useClickAway(rootNode, () => { emit('hide') })

const classes = computed(() => {
  if (props.isVisible) {
    return ['top-12']
  }
  return ['top-50']
})
</script>

<template>
  <div
    ref="rootNode"
    text-center
    transition-all-1000 relative :class="classes"
    @keyup.esc="$emit('hide')"
  >
    <p>
      I should've pressed that
      <little-input
        :target="minutesSinceModeChange" :min="0" :max="999"
        @change="(val: number) => { setMinutesSinceModeChange(val) }"
      />
      minutes ago.
    </p>
  </div>
</template>
