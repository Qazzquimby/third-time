<template>
  <div id="bar">
    <div>
      <span id="icon">
        <q-icon
          id="icon-image"
          :name="icon"
          tag="span"
          size="100px"
          :style="'color:' + iconColor"
        />
        <span id="icon-text">
          {{ optionalPrefix }}
        </span>
      </span>
      <span id="bar-text"> {{ text }}</span>
    </div>
    <div id="buttons-row">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  icon: String,
  optionalPrefix: { type: String, required: true },
  text: String,
  iconColor: { type: String, required: true },
});
</script>

<style scoped>
#bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

@media (max-width: 400px) {
  #icon {
    display: none;
  }
}
#icon-text {
  font-size: 1em;
  margin-left: -50%;
  position: relative;
}

#bar-text {
  font-size: 3em;
}

@media (max-width: 400px) {
  #bar-text {
    font-size: 2em;
  }
}
</style>
