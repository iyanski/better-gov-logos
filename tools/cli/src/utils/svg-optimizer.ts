import { optimize } from 'svgo';
import fs from 'fs-extra';

export async function optimizeSvg(svgPath: string): Promise<string> {
  const svgContent = await fs.readFile(svgPath, 'utf8');
  
  // First, normalize the SVG to 24x24 viewBox
  const normalizedSvg = await normalizeSvgViewBox(svgContent);
  
  const result = optimize(normalizedSvg, {
    plugins: [
      'preset-default',
      'removeDimensions'
    ]
  });

  if (!result.data) {
    throw new Error('SVG optimization failed: No output data');
  }

  return result.data;
}

async function normalizeSvgViewBox(svgContent: string): Promise<string> {
  // Parse the SVG to extract viewBox
  const viewBoxMatch = svgContent.match(/viewBox="([^"]+)"/);
  if (!viewBoxMatch) {
    throw new Error('SVG must have a viewBox attribute');
  }
  
  const [, viewBox] = viewBoxMatch;
  const [x, y, width, height] = viewBox.split(' ').map(Number);
  
  // Calculate scale factor to fit into 24x24
  const scale = Math.min(24 / width, 24 / height);
  const newWidth = width * scale;
  const newHeight = height * scale;
  const offsetX = (24 - newWidth) / 2;
  const offsetY = (24 - newHeight) / 2;
  
  // Create a new SVG with 24x24 viewBox and transform
  const normalizedSvg = svgContent
    .replace(/viewBox="[^"]+"/, 'viewBox="0 0 24 24"')
    .replace(/width="[^"]+"/, 'width="24"')
    .replace(/height="[^"]+"/, 'height="24"')
    .replace(/<svg([^>]*)>/, `<svg$1><g transform="translate(${offsetX}, ${offsetY}) scale(${scale})">`)
    .replace(/<\/svg>/, '</g></svg>');
  
  return normalizedSvg;
}
