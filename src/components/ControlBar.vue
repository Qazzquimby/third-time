<template>
  <div id="bar" class="bar q-px-md row">
    <div id="display" class="col" style="height: 100px">
      <q-icon
        id="bar-icon"
        class="bar-icon"
        :name="icon"
        tag="span"
        size="100px"
        style="position: absolute; left: -12px"
        :style="'color:' + iconColor"
      />
      <span
        id="bar-text"
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
  iconColor: { type: String, required: true },
});
</script>
