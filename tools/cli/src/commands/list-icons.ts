import chalk from 'chalk';
import fs from 'fs-extra';
import path from 'path';
import { IconInfo, IconListOptions } from '../types';

export async function listIcons(options: IconListOptions) {
  const iconsDir = path.join(process.cwd(), 'packages/core/icons');
  
  if (!await fs.pathExists(iconsDir)) {
    console.log(chalk.red('Icons directory not found. Run from project root.'));
    return;
  }
  
  const icons: IconInfo[] = [];
  
  // Recursively find all icon metadata files
  const findIcons = async (dir: string) => {
    const entries = await fs.readdir(dir, { withFileTypes: true });
    
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      
      if (entry.isDirectory()) {
        await findIcons(fullPath);
      } else if (entry.name.endsWith('.json')) {
        try {
          const metadata = await fs.readJson(fullPath);
          const iconInfo: IconInfo = {
            name: metadata.name,
            displayName: metadata.displayName,
            acronym: metadata.acronym,
            branch: metadata.branch,
            category: metadata.category,
            description: metadata.description,
            keywords: metadata.keywords,
            author: metadata.author,
            version: metadata.version,
            createdAt: metadata.createdAt,
            path: fullPath
          };
          
          // Apply filters
          if (options.category && iconInfo.category !== options.category) {
            return;
          }
          
          if (options.tags && options.tags.length > 0) {
            const hasMatchingTag = options.tags.some(tag => 
              iconInfo.keywords.some(keyword => 
                keyword.toLowerCase().includes(tag.toLowerCase())
              )
            );
            if (!hasMatchingTag) {
              return;
            }
          }
          
          icons.push(iconInfo);
        } catch (error) {
          console.warn(chalk.yellow(`Warning: Could not parse ${fullPath}`));
        }
      }
    }
  };
  
  await findIcons(iconsDir);
  
  // Sort icons
  icons.sort((a, b) => a.displayName.localeCompare(b.displayName));
  
  // Output based on format
  switch (options.format) {
    case 'json':
      console.log(JSON.stringify(icons, null, 2));
      break;
    case 'csv':
      console.log('Name,Display Name,Acronym,Branch,Category,Author,Version,Created');
      icons.forEach(icon => {
        console.log(`"${icon.name}","${icon.displayName}","${icon.acronym}","${icon.branch}","${icon.category}","${icon.author}","${icon.version}","${icon.createdAt}"`);
      });
      break;
    case 'table':
    default:
      displayTable(icons);
      break;
  }
}

function displayTable(icons: IconInfo[]) {
  if (icons.length === 0) {
    console.log(chalk.yellow('No icons found.'));
    return;
  }
  
  console.log(chalk.blue(`\n📋 Found ${icons.length} icons:\n`));
  
  // Group by branch
  const groupedIcons = icons.reduce((acc, icon) => {
    if (!acc[icon.branch]) {
      acc[icon.branch] = [];
    }
    acc[icon.branch].push(icon);
    return acc;
  }, {} as Record<string, IconInfo[]>);
  
  Object.entries(groupedIcons).forEach(([branch, branchIcons]) => {
    console.log(chalk.cyan(`\n🏛️  ${branch.toUpperCase()} (${branchIcons.length} icons)`));
    console.log(chalk.gray('─'.repeat(80)));
    
    branchIcons.forEach(icon => {
      console.log(chalk.white(`  ${icon.acronym.padEnd(8)} ${icon.displayName}`));
      console.log(chalk.gray(`    ${icon.description}`));
      console.log(chalk.gray(`    Category: ${icon.category} | Author: ${icon.author} | Version: ${icon.version}`));
      
      // Check if test file exists and provide link
      const testFilePath = path.join(process.cwd(), `test-${icon.name}.html`);
      if (fs.existsSync(testFilePath)) {
        console.log(chalk.cyan(`    📄 Test file: test-${icon.name}.html`));
        console.log(chalk.gray(`    💡 Open in browser to see usage examples and visual preview`));
      } else {
        console.log(chalk.yellow(`    ⚠️  Test file not found: test-${icon.name}.html`));
      }
      console.log();
    });
  });
  
  // Summary
  console.log(chalk.blue('\n📊 Summary:'));
  Object.entries(groupedIcons).forEach(([branch, branchIcons]) => {
    console.log(chalk.gray(`  ${branch}: ${branchIcons.length} icons`));
  });
  
  // Test file instructions
  console.log(chalk.cyan('\n🧪 Test Files:'));
  console.log(chalk.gray('  • Test files contain visual previews and usage examples'));
  console.log(chalk.gray('  • Open test-{icon-name}.html in your browser to see:'));
  console.log(chalk.gray('    - Visual preview in different sizes'));
  console.log(chalk.gray('    - CSS icon demonstrations'));
  console.log(chalk.gray('    - Framework code examples (React, Vue, Svelte, CSS, Web Components)'));
  console.log(chalk.gray('    - Copy-to-clipboard functionality'));
  console.log(chalk.gray('  • Use for visual verification and documentation'));
}
