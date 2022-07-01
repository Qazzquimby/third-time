<script setup lang="ts">
const props = defineProps({
  target: {
    type: Number,
    default: 0,
  },
  min: {
    type: Number,
    default: 0,
  },
  max: {
    type: Number,
    default: 60,
  },
  onChange: {
    type: Function,
    default: () => {},
  },
})

const emit = defineEmits(['change'])

const target = toRef(props, 'target')

function setValue(event: Event) {
  if (event.target instanceof HTMLInputElement) {
    const newValue = parseInt(event.target.value)
    if (!isNaN(newValue)) {
      emit('change', newValue)
    }
  }
}

const inputRem = computed(() => {
  const numDigits = target.value.toString().length
  return [`width: ${numDigits + 1}rem`]
})
</script>

<template>
  <input
    :placeholder="target.toString()"
    type="number"
    :style="inputRem"
    color-black
    border-rd-2
    text-center
    @change="setValue"
  >
</template>
