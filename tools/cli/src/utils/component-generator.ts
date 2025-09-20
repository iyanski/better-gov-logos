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
  
  // Generate test file
  await generateTestFile(iconName, metadata);
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

async function generateTestFile(iconName: string, metadata: IconMetadata): Promise<void> {
  const testContent = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${metadata.displayName} Icon Test</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            padding: 20px;
            background-color: #f5f5f5;
        }
        .icon-test {
            background: white;
            padding: 20px;
            border-radius: 8px;
            margin: 10px 0;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        .icon-container {
            display: flex;
            align-items: center;
            gap: 20px;
            margin: 10px 0;
        }
        .icon-label {
            font-weight: bold;
            min-width: 120px;
        }
    </style>
</head>
<body>
    <h1>🇵🇭 ${metadata.displayName} (${metadata.acronym}) Icon Test</h1>
    
    <div class="icon-test">
        <h3>SVG Icon (Original)</h3>
        <div class="icon-container">
            <span class="icon-label">24px:</span>
            <img src="packages/core/icons/${metadata.branch}/${metadata.category}/${iconName}.svg" width="24" height="24" alt="${metadata.displayName} Icon 24px">
        </div>
        <div class="icon-container">
            <span class="icon-label">48px:</span>
            <img src="packages/core/icons/${metadata.branch}/${metadata.category}/${iconName}.svg" width="48" height="48" alt="${metadata.displayName} Icon 48px">
        </div>
        <div class="icon-container">
            <span class="icon-label">96px:</span>
            <img src="packages/core/icons/${metadata.branch}/${metadata.category}/${iconName}.svg" width="96" height="96" alt="${metadata.displayName} Icon 96px">
        </div>
    </div>

    <div class="icon-test">
        <h3>CSS Icon (Font-based)</h3>
        <div class="icon-container">
            <span class="icon-label">Small:</span>
            <i class="ph-icon-${iconName} ph-icon-sm"></i>
        </div>
        <div class="icon-container">
            <span class="icon-label">Medium:</span>
            <i class="ph-icon-${iconName} ph-icon-md"></i>
        </div>
        <div class="icon-container">
            <span class="icon-label">Large:</span>
            <i class="ph-icon-${iconName} ph-icon-lg"></i>
        </div>
        <div class="icon-container">
            <span class="icon-label">Extra Large:</span>
            <i class="ph-icon-${iconName} ph-icon-xl"></i>
        </div>
    </div>

    <div class="icon-test">
        <h3>Color Variants</h3>
        <div class="icon-container">
            <span class="icon-label">Primary:</span>
            <i class="ph-icon-${iconName} ph-icon-primary ph-icon-lg"></i>
        </div>
        <div class="icon-container">
            <span class="icon-label">Secondary:</span>
            <i class="ph-icon-${iconName} ph-icon-secondary ph-icon-lg"></i>
        </div>
        <div class="icon-container">
            <span class="icon-label">Accent:</span>
            <i class="ph-icon-${iconName} ph-icon-accent ph-icon-lg"></i>
        </div>
    </div>

    <div class="icon-test">
        <h3>Metadata</h3>
        <pre id="metadata"></pre>
    </div>

    <script>
        // Load and display metadata
        fetch('packages/core/icons/${metadata.branch}/${metadata.category}/${iconName}.json')
            .then(response => response.json())
            .then(data => {
                document.getElementById('metadata').textContent = JSON.stringify(data, null, 2);
            })
            .catch(error => {
                document.getElementById('metadata').textContent = 'Error loading metadata: ' + error;
            });
    </script>
</body>
</html>`;

  const testFilePath = path.join(process.cwd(), `test-${iconName}.html`);
  await fs.writeFile(testFilePath, testContent);
}
