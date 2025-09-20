import chalk from 'chalk';
import ora from 'ora';
import fs from 'fs-extra';
import path from 'path';
import { generateComponents } from '../utils/component-generator';

export async function generateComponents(options: any) {
  const spinner = ora('Generating components...').start();
  
  try {
    const iconsDir = path.join(process.cwd(), 'packages/core/icons');
    
    if (!await fs.pathExists(iconsDir)) {
      throw new Error('Icons directory not found. Run from project root.');
    }
    
    // Find all icon metadata files
    const iconFiles = await findIconFiles(iconsDir);
    
    if (iconFiles.length === 0) {
      spinner.warn('No icons found to generate components for.');
      return;
    }
    
    spinner.text = `Generating components for ${iconFiles.length} icons...`;
    
    let processed = 0;
    for (const iconFile of iconFiles) {
      try {
        const metadata = await fs.readJson(iconFile);
        const svgPath = iconFile.replace('.json', '.svg');
        
        if (await fs.pathExists(svgPath)) {
          const svgContent = await fs.readFile(svgPath, 'utf8');
          await generateComponents(metadata.name, svgContent, metadata);
          processed++;
        } else {
          console.warn(chalk.yellow(`Warning: SVG file not found for ${metadata.name}`));
        }
      } catch (error) {
        console.warn(chalk.yellow(`Warning: Could not process ${iconFile}: ${error}`));
      }
    }
    
    spinner.succeed(`Generated components for ${processed} icons`);
    
    console.log(chalk.green('\n✅ Component generation completed!'));
    console.log(chalk.blue('📁 Components generated in:'));
    console.log(chalk.gray('  - packages/react/src/icons/'));
    console.log(chalk.gray('  - packages/vue/src/icons/'));
    console.log(chalk.gray('  - packages/angular/src/icons/'));
    console.log(chalk.gray('  - packages/web-components/src/icons/'));
    console.log(chalk.gray('  - packages/css/src/icons/'));
    
  } catch (error) {
    spinner.fail('Failed to generate components');
    throw error;
  }
}

async function findIconFiles(dir: string): Promise<string[]> {
  const files: string[] = [];
  
  const findFiles = async (currentDir: string) => {
    const entries = await fs.readdir(currentDir, { withFileTypes: true });
    
    for (const entry of entries) {
      const fullPath = path.join(currentDir, entry.name);
      
      if (entry.isDirectory()) {
        await findFiles(fullPath);
      } else if (entry.name.endsWith('.json')) {
        files.push(fullPath);
      }
    }
  };
  
  await findFiles(dir);
  return files;
}
