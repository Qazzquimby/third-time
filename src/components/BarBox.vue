<script setup lang="ts">
import { getBackgroundClass } from '~/composables/state'

const barDividerClasses = computed(() => {
  if (isResting()) {
    return ['top--15 h-30']
  }
  return ['top-0 h-5px']
})
// const barDividerStyles = computed(() => {
//   if (isResting()) {
//     return ['grid-rows: 1/2']
//   }
//   return ['grid-row: 2']
// })
</script>

<template>
  <div w-full>
    <work-bar z-0 />
    <div transition-all-1000 :class="[getBackgroundClass()]" relative z-2>
      <div
        max-w-80 mx-auto py-3
        bg-gradient-to-b from-white:25 to bg-white:10
        border="rd-10 solid 1px" border-white:30
        grid style="grid-template-rows: 1fr 5px 1fr" items-center
      >
        <rest-bar style="grid-row: 1" z-3 />
        <div
          transition-all-1000
          relative left--2px
          :class="[getBackgroundClass(), barDividerClasses]"
          style="grid-row: 2; width: 110%"
          z-2
        />
        <goal-bar style="grid-row: 3" />
      </div>
    </div>
  </div>
</template>
