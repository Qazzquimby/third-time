<script setup lang="ts">
import { backgroundClass } from '~/composables/state'

const barDividerClasses = computed(() => {
  if (isResting.value) {
    return ['top--15 h-30']
  }
  return ['top-0 h-5px']
})
</script>

<template>
  <div w-full>
    <work-bar />
    <div transition-all-1000 :class="[backgroundClass]" relative z-2>
      <div
        max-w-100 mx-auto
        my-4
        bg-gradient-to-b from-white:25 to bg-white:10
        border="rd-10 solid 1px" border-white:30
        grid style="grid-template-rows: 1fr 5px 1fr" items-center
      >
        <rest-bar z-3 />
        <div
          transition-all-1000
          relative left--2px
          :class="[backgroundClass, barDividerClasses]"
          style="width: 110%"
          z-2
        />
        <goal-bar py-2 />
      </div>
    </div>
  </div>
</template>
