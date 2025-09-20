import chalk from 'chalk';
import fs from 'fs-extra';
import path from 'path';
import inquirer from 'inquirer';
import ora from 'ora';

export interface RemoveIconOptions {
  force?: boolean;
  dryRun?: boolean;
  branch?: string;
  category?: string;
}

export async function removeIcon(iconName: string, options: RemoveIconOptions) {
  console.log(chalk.blue(`🗑️  Removing icon: ${iconName}`));
  
  // Find all matching icon metadata files
  const iconsDir = path.join(process.cwd(), 'packages/core/icons');
  const foundIcons: Array<{metadata: any, path: string, branch: string, category: string}> = [];
  
  // Search for all matching icon metadata files
  const findMetadata = async (dir: string, branch: string = '', category: string = '') => {
    const entries = await fs.readdir(dir, { withFileTypes: true });
    
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      
      if (entry.isDirectory()) {
        const currentBranch = branch || entry.name;
        await findMetadata(fullPath, currentBranch, category);
      } else if (entry.name.endsWith('.json')) {
        try {
          const meta = await fs.readJson(fullPath);
          // Match by name, acronym, or display name (case insensitive)
          const nameMatch = meta.name === iconName || meta.name.toLowerCase() === iconName.toLowerCase();
          const acronymMatch = meta.acronym === iconName || meta.acronym.toLowerCase() === iconName.toLowerCase();
          const displayNameMatch = meta.displayName.toLowerCase().includes(iconName.toLowerCase());
          
          if (nameMatch || acronymMatch || displayNameMatch) {
            const pathParts = fullPath.split(path.sep);
            const branchIndex = pathParts.indexOf('packages') + 3; // packages/core/icons/branch
            const categoryIndex = branchIndex + 1;
            
            foundIcons.push({
              metadata: meta,
              path: fullPath,
              branch: pathParts[branchIndex] || meta.branch,
              category: pathParts[categoryIndex] || meta.category
            });
          }
        } catch (error) {
          // Skip invalid JSON files
        }
      }
    }
  };
  
  await findMetadata(iconsDir);
  
  if (foundIcons.length === 0) {
    console.error(chalk.red(`❌ Icon '${iconName}' not found.`));
    console.log(chalk.yellow('💡 Use "bettergovicon list" to see available icons.'));
    process.exit(1);
  }
  
  // If multiple instances found, let user choose (unless force flag is used)
  let selectedIcon;
  if (foundIcons.length > 1) {
    if (options.force) {
      // With force flag, remove the first instance found
      selectedIcon = foundIcons[0];
      console.log(chalk.yellow(`⚠️  Multiple instances found. Using --force, removing first instance:`));
      console.log(chalk.gray(`   ${selectedIcon.metadata.displayName} from ${selectedIcon.branch}/${selectedIcon.category}`));
    } else {
      console.log(chalk.yellow(`\n🔍 Found ${foundIcons.length} instances of '${iconName}':`));
      
      // Group by branch first
      const branchGroups = foundIcons.reduce((acc, icon) => {
        if (!acc[icon.branch]) {
          acc[icon.branch] = [];
        }
        acc[icon.branch].push(icon);
        return acc;
      }, {} as Record<string, typeof foundIcons>);
      
      // Ask user to select branch first
      const branchChoices = Object.keys(branchGroups).map(branch => ({
        name: `${branch.charAt(0).toUpperCase() + branch.slice(1)} (${branchGroups[branch].length} icons)`,
        value: branch,
        short: branch
      }));
      
      const { selectedBranch } = await inquirer.prompt([
        {
          type: 'list',
          name: 'selectedBranch',
          message: 'Which branch contains the icon you want to remove?',
          choices: branchChoices,
          pageSize: 10
        }
      ]);
      
      const branchIcons = branchGroups[selectedBranch];
      
      // If multiple categories in the selected branch, ask for category
      if (branchIcons.length > 1) {
        const categoryChoices = branchIcons.map((icon, index) => ({
          name: `${icon.metadata.displayName} (${icon.metadata.acronym}) - ${icon.category}`,
          value: index,
          short: icon.category
        }));
        
        const { selectedIndex } = await inquirer.prompt([
          {
            type: 'list',
            name: 'selectedIndex',
            message: 'Which category contains the icon you want to remove?',
            choices: categoryChoices,
            pageSize: 10
          }
        ]);
        
        selectedIcon = branchIcons[selectedIndex];
      } else {
        selectedIcon = branchIcons[0];
      }
      
      console.log(chalk.green(`✅ Selected: ${selectedIcon.metadata.displayName} from ${selectedIcon.branch}/${selectedIcon.category}`));
    }
  } else {
    selectedIcon = foundIcons[0];
  }
  
  const metadata = selectedIcon.metadata;
  const metadataPath = selectedIcon.path;
  
  console.log(chalk.green(`✅ Found icon: ${metadata.displayName} (${metadata.acronym})`));
  
  // List all files that will be removed
  const filesToRemove = [
    // Core files
    path.join(process.cwd(), 'packages/core/icons', metadata.branch, metadata.category, `${metadata.name}.svg`),
    metadataPath!,
    
    // Framework components
    path.join(process.cwd(), 'packages/react/src/icons', `${metadata.name}.tsx`),
    path.join(process.cwd(), 'packages/vue/src/icons', `${metadata.name}.vue`),
    path.join(process.cwd(), 'packages/angular/src/icons', `${metadata.name}.ts`),
    path.join(process.cwd(), 'packages/svelte/src/icons', `${metadata.name}.svelte`),
    path.join(process.cwd(), 'packages/web-components/src/icons', `${metadata.name}.ts`),
    path.join(process.cwd(), 'packages/css/src/icons', `${metadata.name}.css`),
    
    // Test file
    path.join(process.cwd(), `test-${metadata.name}.html`)
  ];
  
  // Check which files actually exist
  const existingFiles = [];
  for (const filePath of filesToRemove) {
    if (await fs.pathExists(filePath)) {
      existingFiles.push(filePath);
    }
  }
  
  if (existingFiles.length === 0) {
    console.log(chalk.yellow('⚠️  No files found to remove.'));
    return;
  }
  
  console.log(chalk.blue('\n📁 Files to be removed:'));
  existingFiles.forEach(file => {
    const relativePath = path.relative(process.cwd(), file);
    console.log(chalk.gray(`  - ${relativePath}`));
  });
  
  // Confirmation prompt
  if (!options.force) {
    const { confirm } = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'confirm',
        message: `Are you sure you want to remove the ${metadata.displayName} icon and all associated files?`,
        default: false
      }
    ]);
    
    if (!confirm) {
      console.log(chalk.yellow('❌ Removal cancelled.'));
      return;
    }
  }
  
  if (options.dryRun) {
    console.log(chalk.blue('\n🔍 Dry run - no files were actually removed.'));
    return;
  }
  
  // Remove files
  const spinner = ora('Removing files...').start();
  
  let removedCount = 0;
  let errorCount = 0;
  
  for (const filePath of existingFiles) {
    try {
      await fs.remove(filePath);
      removedCount++;
    } catch (error) {
      console.error(chalk.red(`❌ Error removing ${filePath}:`), error);
      errorCount++;
    }
  }
  
  // Update index files
  try {
    await updateIndexFiles(metadata.name, metadata.acronym);
    spinner.succeed('Index files updated');
  } catch (error) {
    spinner.fail('Error updating index files');
    console.error(chalk.red('Error updating index files:'), error);
  }
  
  // Summary
  console.log(chalk.green(`\n✅ Icon removal completed!`));
  console.log(chalk.blue('📊 Summary:'));
  console.log(chalk.gray(`  Files removed: ${removedCount}`));
  if (errorCount > 0) {
    console.log(chalk.red(`  Errors: ${errorCount}`));
  }
  
  console.log(chalk.yellow('\n💡 Next steps:'));
  console.log(chalk.gray('1. Review your project to ensure no references to the removed icon'));
  console.log(chalk.gray('2. Update any documentation that mentioned this icon'));
  console.log(chalk.gray('3. Test your application to ensure nothing is broken'));
}

async function updateIndexFiles(iconName: string, acronym: string) {
  const packages = ['react', 'vue', 'angular', 'svelte', 'web-components', 'css'];
  
  for (const pkg of packages) {
    const indexPath = path.join(process.cwd(), `packages/${pkg}/src/index.ts`);
    if (await fs.pathExists(indexPath)) {
      const content = await fs.readFile(indexPath, 'utf8');
      const exportLine = `export { ${acronym} } from './icons/${iconName}';`;
      const exportLineWithNewline = `\n${exportLine}`;
      
      // Remove the export line
      const updatedContent = content
        .replace(exportLineWithNewline, '')
        .replace(exportLine, '')
        .replace(/\n\n+/g, '\n') // Clean up multiple newlines
        .trim();
      
      await fs.writeFile(indexPath, updatedContent + '\n');
    }
  }
}
