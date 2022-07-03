// https://github.com/valgeirb/vue3-popper/blob/main/src/composables/useEventListener.js

import { isRef, onBeforeUnmount, onMounted, unref, watch } from 'vue'

export default function useEventListener(target, event, handler) {
  if (isRef(target)) {
    watch(target, (value, oldValue) => {
      oldValue?.removeEventListener(event, handler)
      value?.addEventListener(event, handler)
    })
  }
  else {
    onMounted(() => {
      target.addEventListener(event, handler)
    })
  }

  onBeforeUnmount(() => {
    unref(target)?.removeEventListener(event, handler)
  })
}
