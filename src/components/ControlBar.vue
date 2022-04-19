<template>
  <div id="bar" class="q-px-md row">
    <div id="display" class="col" style="height: 100px">
      <q-icon
        id="working-icon"
        :name="icon"
        tag="span"
        size="100px"
        style="position: absolute; left: -12px"
        class="work-highlight"
      />
      <span
        id="working-text"
        class="text-h3 text-black"
        style="position: absolute; padding-top: 24px"
      >
        {{ text }}</span
      >
    </div>
    <div class="col-grow"></div>
    <div
      id="buttons"
      class="col-shrink"
      style="display: flex; flex-direction: column; justify-content: center"
    >
      <div class="row">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  icon: String,
  text: String,
});
</script>

<style lang="scss">
#bar {
  height: 100px;
  width: 500px;
  background: linear-gradient(
      270deg,
      rgba(38, 197, 12, 0.3) 0%,
      rgba(48, 242, 16, 0) 100%
    ),
    #1f9e3b;
}

.work-highlight {
  color: #23d34a;
}
</style>
