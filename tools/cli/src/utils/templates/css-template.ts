import { IconMetadata } from '../../types';

export function generateCssClass(
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
  
  return `/* ${displayName} Icon */
/* ${description} */

.ph-${componentName.toLowerCase()}-icon::before {
  content: '';
  display: inline-block;
  width: 1em;
  height: 1em;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none'%3E${encodeURIComponent(svgInner)}%3C/svg%3E");
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  vertical-align: middle;
}

.ph-${componentName.toLowerCase()}-icon {
  font-family: 'Philippine Government Icons';
  font-style: normal;
  font-weight: normal;
  font-variant: normal;
  text-transform: none;
  line-height: 1;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* Size variants */
.ph-${componentName.toLowerCase()}-icon.ph-icon-sm {
  font-size: 16px;
}

.ph-${componentName.toLowerCase()}-icon.ph-icon-md {
  font-size: 24px;
}

.ph-${componentName.toLowerCase()}-icon.ph-icon-lg {
  font-size: 32px;
}

.ph-${componentName.toLowerCase()}-icon.ph-icon-xl {
  font-size: 48px;
}


/* Hover effects */
.ph-${componentName.toLowerCase()}-icon:hover {
  opacity: 0.8;
  transition: opacity 0.2s ease;
}

/* Focus styles for accessibility */
.ph-${componentName.toLowerCase()}-icon:focus {
  outline: 2px solid #0033A0;
  outline-offset: 2px;
}
`;
}
