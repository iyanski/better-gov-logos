import { IconMetadata } from '../../types';

export function generateVueComponent(
  iconName: string,
  svgContent: string,
  metadata: IconMetadata
): string {
  const componentName = metadata.acronym;
  const displayName = metadata.displayName;
  const description = metadata.description;
  
  // Extract SVG content without the outer <svg> tag
  const svgInner = svgContent
    .replace(/<svg[^>]*>/, '')
    .replace(/<\/svg>/, '')
    .trim();
  
  return `<template>
  <svg
    :width="size"
    :height="size"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    :class="\`ph-icon ph-icon-${iconName} \${className}\`"
    :style="style"
    role="img"
    :aria-label="ariaLabel || '${displayName}'"
    v-bind="$attrs"
  >
    ${svgInner}
  </svg>
</template>

<script setup lang="ts">
import { computed } from 'vue';

/**
 * ${displayName} Icon
 * 
 * ${description}
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
  ariaLabel: '${displayName}'
});

const size = computed(() => {
  if (typeof props.size === 'number') {
    return \`\${props.size}px\`;
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
`;
}
