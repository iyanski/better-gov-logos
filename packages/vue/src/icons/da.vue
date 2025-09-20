<template>
  <svg
    :width="size"
    :height="size"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    :class="`ph-icon ph-icon-da ${className}`"
    :style="style"
    role="img"
    :aria-label="ariaLabel || 'Department of Agriculture (DA)'"
    v-bind="$attrs"
  >
    <title>Department of Agriculture (DA)</title>
    <desc>Official logo of the Department of Agriculture of the Philippines</desc>
    
    <circle cx="12" cy="12" r="10" fill="#1B5E20" stroke="#0033A0" stroke-width="2"/>
    <path d="M8 12h8M12 8v8" stroke="white" stroke-width="2" stroke-linecap="round"/>
    <circle cx="12" cy="12" r="3" fill="white"/>
    
    <path d="M6 6l2 2M18 6l-2 2M6 18l2-2M18 18l-2-2" stroke="#1B5E20" stroke-width="1.5" stroke-linecap="round"/>
  </svg>
</template>

<script setup lang="ts">
import { computed } from 'vue';

/**
 * Department of Agriculture (DA) Icon
 * 
 * Official logo of the Department of Agriculture of the Philippines
 */

interface Props {
  size?: number | string;
  color?: string;
  className?: string;
  style?: Record<string, any>;
  ariaLabel?: string;
}

const props = withDefaults(defineProps<Props>(), {
  size: 24,
  color: 'currentColor',
  className: '',
  style: () => ({}),
  ariaLabel: 'Department of Agriculture (DA)'
});

const size = computed(() => {
  if (typeof props.size === 'number') {
    return `${props.size}px`;
  }
  return props.size;
});
</script>

<style scoped>
.ph-icon {
  display: inline-block;
  vertical-align: middle;
}
</style>
