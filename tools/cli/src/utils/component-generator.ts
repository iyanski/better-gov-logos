import fs from 'fs-extra';
import path from 'path';
import { IconMetadata } from '../types';
import { generateReactComponent } from './templates/react-template';
import { generateVueComponent } from './templates/vue-template';
import { generateAngularComponent } from './templates/angular-template';
import { generateWebComponent } from './templates/web-component-template';
import { generateSvelteComponent } from './templates/svelte-template';
import { generateCssClass } from './templates/css-template';

export async function generateComponents(
  iconName: string, 
  svgContent: string, 
  metadata: IconMetadata
): Promise<void> {
  const frameworks = ['react', 'vue', 'angular', 'svelte', 'web-components', 'css'];
  
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
    case 'svelte':
      componentContent = generateSvelteComponent(iconName, svgContent, metadata);
      fileName = `${iconName}.svelte`;
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
        
        /* CSS Icon Styles */
        .ph-icon-${iconName} {
            display: inline-block;
            width: 1em;
            height: 1em;
            background-image: url("packages/core/icons/${metadata.branch}/${metadata.category}/${iconName}.svg");
            background-repeat: no-repeat;
            background-size: contain;
            background-position: center;
            vertical-align: middle;
        }
        
        .ph-icon-${iconName}.ph-icon-sm { font-size: 16px; }
        .ph-icon-${iconName}.ph-icon-md { font-size: 24px; }
        .ph-icon-${iconName}.ph-icon-lg { font-size: 32px; }
        .ph-icon-${iconName}.ph-icon-xl { font-size: 48px; }
        
        .ph-icon-${iconName}.ph-icon-primary { color: #0033A0; }
        .ph-icon-${iconName}.ph-icon-secondary { color: #1B5E20; }
        .ph-icon-${iconName}.ph-icon-accent { color: #FF6B35; }
        
        .ph-icon-${iconName}:hover {
            opacity: 0.8;
            transition: opacity 0.2s ease;
        }
        
        .ph-icon-${iconName}:focus {
            outline: 2px solid #0033A0;
            outline-offset: 2px;
        }
        
        /* Code Sample Styles */
        .code-sample {
            position: relative;
            background: #f8f9fa;
            border: 1px solid #e9ecef;
            border-radius: 4px;
            padding: 16px;
            margin: 8px 0;
            font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
            font-size: 14px;
            line-height: 1.4;
            overflow-x: auto;
        }
        
        .code-sample .copy-btn {
            position: absolute;
            top: 8px;
            right: 8px;
            background: #007bff;
            color: white;
            border: none;
            padding: 4px 8px;
            border-radius: 3px;
            font-size: 12px;
            cursor: pointer;
            opacity: 0.8;
            transition: opacity 0.2s;
        }
        
        .code-sample .copy-btn:hover {
            opacity: 1;
        }
        
        .code-sample .copy-btn.copied {
            background: #28a745;
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
        <pre id="metadata">${JSON.stringify(metadata, null, 2)}</pre>
    </div>

    <div class="icon-test">
        <h3>Usage Examples</h3>
        
        <h4>React</h4>
        <div class="code-sample">
            <button class="copy-btn" onclick="copyCode(this, 'react-code')">Copy</button>
            <pre id="react-code">import { ${metadata.acronym} } from '@ph-gov-icons/react';

// Basic usage
&lt;${metadata.acronym} size={24} color="#1B5E20" /&gt;

// With custom props
&lt;${metadata.acronym} 
  size={32} 
  color="#0033A0" 
  className="my-icon"
  onClick={() => console.log('Icon clicked')}
/&gt;</pre>
        </div>
        
        <h4>Vue</h4>
        <div class="code-sample">
            <button class="copy-btn" onclick="copyCode(this, 'vue-code')">Copy</button>
            <pre id="vue-code">&lt;template&gt;
  &lt;${metadata.acronym} :size="24" color="#1B5E20" /&gt;
&lt;/template&gt;

&lt;script setup&gt;
import { ${metadata.acronym} } from '@ph-gov-icons/vue'
&lt;/script&gt;</pre>
        </div>
        
        <h4>Svelte</h4>
        <div class="code-sample">
            <button class="copy-btn" onclick="copyCode(this, 'svelte-code')">Copy</button>
            <pre id="svelte-code">&lt;script&gt;
  import { ${metadata.acronym} } from '@ph-gov-icons/svelte';
&lt;/script&gt;

&lt;!-- Basic usage --&gt;
&lt;${metadata.acronym} size={24} color="#1B5E20" /&gt;

&lt;!-- With event handlers --&gt;
&lt;${metadata.acronym} 
  size={32} 
  color="#0033A0" 
  className="my-icon"
  onclick={() => console.log('Icon clicked')}
  onkeydown={(e) => e.key === 'Enter' && console.log('Enter pressed')}
/&gt;</pre>
        </div>
        
        <h4>CSS</h4>
        <div class="code-sample">
            <button class="copy-btn" onclick="copyCode(this, 'css-code')">Copy</button>
            <pre id="css-code">&lt;!-- Basic usage --&gt;
&lt;i class="ph-icon-${iconName} ph-icon-lg ph-icon-primary"&gt;&lt;/i&gt;

&lt;!-- Different sizes --&gt;
&lt;i class="ph-icon-${iconName} ph-icon-sm"&gt;&lt;/i&gt;
&lt;i class="ph-icon-${iconName} ph-icon-md"&gt;&lt;/i&gt;
&lt;i class="ph-icon-${iconName} ph-icon-xl"&gt;&lt;/i&gt;

&lt;!-- Color variants --&gt;
&lt;i class="ph-icon-${iconName} ph-icon-secondary"&gt;&lt;/i&gt;
&lt;i class="ph-icon-${iconName} ph-icon-accent"&gt;&lt;/i&gt;</pre>
        </div>
        
        <h4>Web Components</h4>
        <div class="code-sample">
            <button class="copy-btn" onclick="copyCode(this, 'wc-code')">Copy</button>
            <pre id="wc-code">&lt;!-- Import the component --&gt;
&lt;script type="module" src="@ph-gov-icons/web-components/${iconName}.js"&gt;&lt;/script&gt;

&lt;!-- Use the component --&gt;
&lt;ph-icon-${iconName} size="24" color="#1B5E20"&gt;&lt;/ph-icon-${iconName}&gt;</pre>
        </div>
    </div>

    <script>
        function copyCode(button, codeId) {
            const codeElement = document.getElementById(codeId);
            const text = codeElement.textContent;
            
            // Use the modern Clipboard API if available
            if (navigator.clipboard && window.isSecureContext) {
                navigator.clipboard.writeText(text).then(() => {
                    showCopySuccess(button);
                }).catch(() => {
                    fallbackCopyTextToClipboard(text, button);
                });
            } else {
                fallbackCopyTextToClipboard(text, button);
            }
        }
        
        function fallbackCopyTextToClipboard(text, button) {
            const textArea = document.createElement("textarea");
            textArea.value = text;
            textArea.style.top = "0";
            textArea.style.left = "0";
            textArea.style.position = "fixed";
            textArea.style.opacity = "0";
            
            document.body.appendChild(textArea);
            textArea.focus();
            textArea.select();
            
            try {
                const successful = document.execCommand('copy');
                if (successful) {
                    showCopySuccess(button);
                } else {
                    showCopyError(button);
                }
            } catch (err) {
                showCopyError(button);
            }
            
            document.body.removeChild(textArea);
        }
        
        function showCopySuccess(button) {
            const originalText = button.textContent;
            button.textContent = 'Copied!';
            button.classList.add('copied');
            
            setTimeout(() => {
                button.textContent = originalText;
                button.classList.remove('copied');
            }, 2000);
        }
        
        function showCopyError(button) {
            const originalText = button.textContent;
            button.textContent = 'Failed';
            button.style.background = '#dc3545';
            
            setTimeout(() => {
                button.textContent = originalText;
                button.style.background = '#007bff';
            }, 2000);
        }
    </script>
</body>
</html>`;

  const testFilePath = path.join(process.cwd(), `test-${iconName}.html`);
  await fs.writeFile(testFilePath, testContent);
}
