import fs from 'fs-extra';
import { parseString } from 'xml2js';
import { SvgValidationResult } from '../types';

export async function validateSvg(svgPath: string): Promise<SvgValidationResult> {
  const errors: string[] = [];
  const warnings: string[] = [];

  try {
    const svgContent = await fs.readFile(svgPath, 'utf8');
    
    // Parse SVG
    const result = await new Promise<any>((resolve, reject) => {
      parseString(svgContent, (err, result) => {
        if (err) reject(err);
        else resolve(result);
      });
    });

    const svg = result.svg;
    if (!svg) {
      errors.push('Invalid SVG structure');
      return { isValid: false, errors, warnings };
    }

    // Check viewBox
    const viewBox = svg.$.viewBox;
    if (!viewBox) {
      errors.push('SVG must have a viewBox attribute');
    } else {
      const viewBoxValues = viewBox.split(' ');
      if (viewBoxValues.length !== 4) {
        errors.push('ViewBox must have 4 values (x, y, width, height)');
      } else {
        const [, , width, height] = viewBoxValues.map(Number);
        if (width !== height) {
          warnings.push('ViewBox should be square for consistent icon sizing');
        }
        if (width < 16 || width > 512) {
          warnings.push('ViewBox size should be between 16 and 512 for optimal performance');
        }
      }
    }

    // Check for required attributes
    if (!svg.$.xmlns) {
      errors.push('SVG must have xmlns attribute');
    }

    // Check for stroke width consistency
    const strokeWidths = findStrokeWidths(svg);
    if (strokeWidths.length > 0) {
      const uniqueWidths = [...new Set(strokeWidths)];
      if (uniqueWidths.length > 1) {
        warnings.push('Inconsistent stroke widths found. Consider using 2px for consistency');
      }
      if (uniqueWidths.some(width => width < 1 || width > 4)) {
        warnings.push('Stroke width should be between 1px and 4px for optimal display');
      }
    }

    // Check for fill vs stroke
    const hasFill = hasAttribute(svg, 'fill');
    const hasStroke = hasAttribute(svg, 'stroke');
    
    if (!hasFill && !hasStroke) {
      warnings.push('SVG should have either fill or stroke attributes');
    }

    // Check for accessibility
    if (!svg.$.role && !svg.$.ariaLabel) {
      warnings.push('Consider adding role="img" and aria-label for accessibility');
    }

    // Check for unnecessary elements
    if (svg.script) {
      errors.push('SVG should not contain script elements for security');
    }

    if (svg.style) {
      warnings.push('Consider using attributes instead of style elements for better performance');
    }

    // Check for embedded images
    if (svg.image) {
      warnings.push('Consider converting embedded images to SVG paths for better scalability');
    }

    // Check for text elements
    if (svg.text || svg.tspan) {
      warnings.push('Text elements may not scale well. Consider converting to paths');
    }

    return {
      isValid: errors.length === 0,
      errors,
      warnings,
      viewBox: svg.$.viewBox,
      width: viewBox ? Number(viewBox.split(' ')[2]) : undefined,
      height: viewBox ? Number(viewBox.split(' ')[3]) : undefined,
      strokeWidth: strokeWidths.length > 0 ? strokeWidths[0] : undefined
    };

  } catch (error) {
    errors.push(`Failed to parse SVG: ${error}`);
    return { isValid: false, errors, warnings };
  }
}

function findStrokeWidths(element: any): number[] {
  const widths: number[] = [];
  
  function traverse(obj: any) {
    if (typeof obj === 'object' && obj !== null) {
      if (obj.$ && obj.$.strokeWidth) {
        widths.push(Number(obj.$.strokeWidth));
      }
      if (obj.$ && obj.$.stroke-width) {
        widths.push(Number(obj.$['stroke-width']));
      }
      
      for (const key in obj) {
        if (key !== '$' && typeof obj[key] === 'object') {
          traverse(obj[key]);
        }
      }
    }
  }
  
  traverse(element);
  return widths;
}

function hasAttribute(element: any, attribute: string): boolean {
  if (element.$ && element.$[attribute]) {
    return true;
  }
  
  for (const key in element) {
    if (key !== '$' && typeof element[key] === 'object') {
      if (hasAttribute(element[key], attribute)) {
        return true;
      }
    }
  }
  
  return false;
}
