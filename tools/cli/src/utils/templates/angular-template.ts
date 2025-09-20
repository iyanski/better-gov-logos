import { IconMetadata } from '../../types';

export function generateAngularComponent(
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
  
  return `import { Component, Input, OnInit } from '@angular/core';

/**
 * ${displayName} Icon
 * 
 * ${description}
 */
@Component({
  selector: 'ph-icon-${iconName}',
  template: \`
    <svg
      [attr.width]="size"
      [attr.height]="size"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      [class]="'ph-icon ph-icon-${iconName} ' + className"
      [style]="style"
      role="img"
      [attr.aria-label]="ariaLabel || '${displayName}'"
    >
      ${svgInner}
    </svg>
  \`,
  styles: [\`
    .ph-icon {
      display: inline-block;
      vertical-align: middle;
    }
  \`]
})
export class ${componentName}Component implements OnInit {
  @Input() size: number | string = 24;
  @Input() color: string = 'currentColor';
  @Input() className: string = '';
  @Input() style: Record<string, any> = {};
  @Input() ariaLabel: string = '${displayName}';

  ngOnInit(): void {
    // Component initialization
  }
}
`;
}
