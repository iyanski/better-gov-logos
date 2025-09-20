import { IconMetadata } from '../../types';

export function generateSvelteComponent(
  iconName: string,
  svgContent: string,
  metadata: IconMetadata
): string {
  const componentName = metadata.acronym;
  
  return `<script lang="ts">
  export let size: number = 24;
  export let color: string = 'currentColor';
  export let className: string = '';
  export let title: string = '${metadata.displayName}';
  export let ariaLabel: string = '${metadata.displayName} icon';
  export let role: string = 'img';
  export let tabindex: number | undefined = undefined;
  export let onclick: (() => void) | undefined = undefined;
  export let onkeydown: ((event: KeyboardEvent) => void) | undefined = undefined;
  
  // Computed styles
  $: styles = \`width: \${size}px; height: \${size}px; color: \${color};\`;
  $: classes = \`ph-icon ph-icon-\${iconName} \${className}\`.trim();
</script>

<!-- ${metadata.displayName} Icon -->
<svg
  class={classes}
  style={styles}
  width={size}
  height={size}
  viewBox="0 0 24 24"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
  {title}
  aria-label={ariaLabel}
  {role}
  {tabindex}
  on:click={onclick}
  on:keydown={onkeydown}
  on:mouseenter
  on:mouseleave
  on:focus
  on:blur
>
  ${svgContent.replace(/<svg[^>]*>/, '').replace('</svg>', '')}
</svg>

<style>
  .ph-icon {
    display: inline-block;
    vertical-align: middle;
    transition: all 0.2s ease;
  }
  
  .ph-icon:hover {
    opacity: 0.8;
    transform: scale(1.05);
  }
  
  .ph-icon:focus {
    outline: 2px solid currentColor;
    outline-offset: 2px;
    border-radius: 2px;
  }
  
  .ph-icon:active {
    transform: scale(0.95);
  }
  
  /* Size variants */
  .ph-icon-sm {
    width: 16px;
    height: 16px;
  }
  
  .ph-icon-md {
    width: 24px;
    height: 24px;
  }
  
  .ph-icon-lg {
    width: 32px;
    height: 32px;
  }
  
  .ph-icon-xl {
    width: 48px;
    height: 48px;
  }
  
  /* Color variants */
  .ph-icon-primary {
    color: #0033A0;
  }
  
  .ph-icon-secondary {
    color: #1B5E20;
  }
  
  .ph-icon-accent {
    color: #FF6B35;
  }
  
  .ph-icon-success {
    color: #28a745;
  }
  
  .ph-icon-warning {
    color: #ffc107;
  }
  
  .ph-icon-danger {
    color: #dc3545;
  }
  
  .ph-icon-info {
    color: #17a2b8;
  }
  
  .ph-icon-light {
    color: #f8f9fa;
  }
  
  .ph-icon-dark {
    color: #343a40;
  }
  
  /* Accessibility */
  .ph-icon:focus-visible {
    outline: 2px solid currentColor;
    outline-offset: 2px;
  }
  
  /* Animation utilities */
  .ph-icon-spin {
    animation: spin 1s linear infinite;
  }
  
  .ph-icon-pulse {
    animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  }
  
  .ph-icon-bounce {
    animation: bounce 1s infinite;
  }
  
  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
  
  @keyframes pulse {
    0%, 100% {
      opacity: 1;
    }
    50% {
      opacity: 0.5;
    }
  }
  
  @keyframes bounce {
    0%, 100% {
      transform: translateY(-25%);
      animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
    }
    50% {
      transform: none;
      animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
    }
  }
</style>`;
}
