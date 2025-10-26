<template>
  <button :class="[{ 'rounded': rounded }]">
    <component :is="isIcon" class="me-1"></component>
    <span :class="{ 'strong-btn-label-color': strongLabel }">{{ props.label }}</span>
  </button>
</template>

<script setup lang="ts">
const props = defineProps({
  rounded: {
    type: Boolean,
    default: false,
    required: false
  },
  label: {
    type: String,
    required: false
  },
  strongLabel: {
    type: Boolean,
    required: false,
    default: false
  },
  isIcon: {
    type: Object,
    required: false
  }
})
</script>
<style scoped lang="scss">
button,
button:active {
  background-color: var(--tertiary-bg);
}

button {
  border: 2px solid var(--border-color);
  transition: transform .3s ease-in-out;
  padding: 5px 20px;

  span {
    color: var(--text-color-2);
    font-weight: bold;
    text-wrap: nowrap;
    font-size: .8em;
  }
}

.strong-btn-label-color {
  color: var(--text-color-1) !important;
}

button:active {
  transform: scale(0.96);
}

.rounded {
  border-radius: 4px !important;
}
</style>
