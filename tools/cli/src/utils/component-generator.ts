import fs from 'fs-extra';
import path from 'path';
import { IconMetadata } from '../types';
import { generateReactComponent } from './templates/react-template';
import { generateVueComponent } from './templates/vue-template';
import { generateAngularComponent } from './templates/angular-template';
import { generateWebComponent } from './templates/web-component-template';
import { generateCssClass } from './templates/css-template';

export async function generateComponents(
  iconName: string, 
  svgContent: string, 
  metadata: IconMetadata
): Promise<void> {
  const frameworks = ['react', 'vue', 'angular', 'web-components', 'css'];
  
  for (const framework of frameworks) {
    await generateFrameworkComponent(framework, iconName, svgContent, metadata);
  }
}

async function generateFrameworkComponent(
  framework: string,
  iconName: string,
  svgContent: string,
  metadata: IconMetadata
): Promise<void> {
  const packageDir = path.join(process.cwd(), 'packages', framework);
  const iconsDir = path.join(packageDir, 'src', 'icons');
  
  // Ensure icons directory exists
  await fs.ensureDir(iconsDir);
  
  let componentContent: string;
  let fileName: string;
  
  switch (framework) {
    case 'react':
      componentContent = generateReactComponent(iconName, svgContent, metadata);
      fileName = `${iconName}.tsx`;
      break;
    case 'vue':
      componentContent = generateVueComponent(iconName, svgContent, metadata);
      fileName = `${iconName}.vue`;
      break;
    case 'angular':
      componentContent = generateAngularComponent(iconName, svgContent, metadata);
      fileName = `${iconName}.ts`;
      break;
    case 'web-components':
      componentContent = generateWebComponent(iconName, svgContent, metadata);
      fileName = `${iconName}.ts`;
      break;
    case 'css':
      componentContent = generateCssClass(iconName, svgContent, metadata);
      fileName = `${iconName}.css`;
      break;
    default:
      throw new Error(`Unsupported framework: ${framework}`);
  }
  
  const filePath = path.join(iconsDir, fileName);
  await fs.writeFile(filePath, componentContent);
  
  // Update index file
  await updatePackageIndex(framework, iconName, metadata);
}

async function updatePackageIndex(
  framework: string,
  iconName: string,
  metadata: IconMetadata
): Promise<void> {
  const packageDir = path.join(process.cwd(), 'packages', framework);
  const indexPath = path.join(packageDir, 'src', 'index.ts');
  
  if (!await fs.pathExists(indexPath)) {
    await fs.ensureDir(path.dirname(indexPath));
    await fs.writeFile(indexPath, '');
  }
  
  const content = await fs.readFile(indexPath, 'utf8');
  const exportLine = `export { ${metadata.acronym} } from './icons/${iconName}';`;
  
  if (!content.includes(exportLine)) {
    await fs.writeFile(indexPath, content + '\n' + exportLine);
  }
}
