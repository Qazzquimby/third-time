<template>
  <div
    p="x-4 t-4" text-white
    h-screen
    flex="~ col" justify-between
    transition-1000
    :class="[backgroundClass]"
    overflow-clip
    style="scroll-snap-align: start"
  >
    <timer-header />
    <bar-box />
    <footer-controls self-center />
  </div>
</template>
