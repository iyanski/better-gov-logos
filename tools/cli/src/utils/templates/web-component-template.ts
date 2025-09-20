import { IconMetadata } from '../../types';

export function generateWebComponent(
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
  
  return `import { LitElement, html, css, customElement, property } from 'lit';

/**
 * ${displayName} Icon
 * 
 * ${description}
 */
@customElement('ph-icon-${iconName}')
export class ${componentName}Icon extends LitElement {
  static styles = css\`
    :host {
      display: inline-block;
      vertical-align: middle;
    }
    
    svg {
      display: block;
    }
  \`;

  @property({ type: Number }) size = 24;
  @property({ type: String }) color = 'currentColor';
  @property({ type: String }) className = '';
  @property({ type: String }) ariaLabel = '${displayName}';

  render() {
    return html\`
      <svg
        width="\${this.size}"
        height="\${this.size}"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        class="ph-icon ph-icon-${iconName} \${this.className}"
        role="img"
        aria-label="\${this.ariaLabel}"
      >
        ${svgInner}
      </svg>
    \`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ph-icon-${iconName}': ${componentName}Icon;
  }
}
`;
}
