import { IconMetadata } from '../../types';

export function generateReactComponent(
  iconName: string,
  svgContent: string,
  metadata: IconMetadata
): string {
  const componentName = `${metadata.acronym}Logo`;
  const displayName = metadata.displayName;
  const description = metadata.description;
  
  // Extract SVG content without the outer <svg> tag
  const svgInner = svgContent
    .replace(/<svg[^>]*>/, '')
    .replace(/<\/svg>/, '')
    .trim();
  
  return `import React from 'react';
import { IconProps } from '../types';

/**
 * ${displayName} Icon
 * 
 * ${description}
 * 
 * @param props - Icon properties
 * @returns React component
 */
export const ${componentName}: React.FC<IconProps> = ({
  size = 24,
  color = 'currentColor',
  className = '',
  style = {},
  ...props
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={\`ph-icon ph-icon-${iconName} \${className}\`}
      style={style}
      role="img"
      aria-label="${displayName}"
      {...props}
    >
      ${svgInner}
    </svg>
  );
};

${componentName}.displayName = '${componentName}';

export default ${componentName};
`;
}
