<script setup lang="ts">
import { backgroundClass } from '~/composables/state'

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
  isPressed: {
    type: Boolean,
    required: true,
  },
})

const classes = computed(() => {
  if (props.isPressed) {
    return [backgroundClass.value]
  }
  return ['']
})
</script>

<template>
  <div transition-all-1000 :aria="props.label">
    <button :id="props.id" h-15 w-15 border-rd-100 color-white :class="classes" :title="label">
      <div text-5xl>
        <slot />
      </div>
    </button>
  </div>
</template>
