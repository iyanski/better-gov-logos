import inquirer from 'inquirer';
import chalk from 'chalk';
import ora from 'ora';
import fs from 'fs-extra';
import path from 'path';
import { optimizeSvg } from '../utils/svg-optimizer';
// import { generateMetadata } from '../utils/metadata-generator';
import { generateComponents } from '../utils/component-generator';
import { validateSvg } from '../utils/svg-validator';
import { IconMetadata, GovernmentBranch, IconCategory } from '../types';

export async function addIcon(svgPath: string, options: any) {
  const spinner = ora('Processing icon...').start();

  try {
    // Validate SVG file exists
    if (!await fs.pathExists(svgPath)) {
      throw new Error(`SVG file not found: ${svgPath}`);
    }

    // Validate SVG format
    const validationResult = await validateSvg(svgPath);
    if (!validationResult.isValid) {
      throw new Error(`Invalid SVG: ${validationResult.errors.join(', ')}`);
    }

    spinner.succeed('SVG file validated');

    // Interactive questionnaire
    const answers = await inquirer.prompt([
      {
        type: 'list',
        name: 'branch',
        message: 'What branch of government is this?',
        choices: [
          { name: 'Executive Branch', value: 'executive' },
          { name: 'Legislative Branch', value: 'legislative' },
          { name: 'Judicial Branch', value: 'judicial' },
          { name: 'Constitutional Bodies', value: 'constitutional' },
          { name: 'Local Government Units', value: 'local' },
          { name: 'Government-Owned Corporations', value: 'gocc' },
          { name: 'Other', value: 'other' }
        ]
      },
      {
        type: 'input',
        name: 'agencyName',
        message: 'What is the name of the agency/department?',
        validate: (input: string) => {
          if (!input.trim()) {
            return 'Agency name is required';
          }
          return true;
        }
      },
      {
        type: 'input',
        name: 'officialName',
        message: 'What is the official full name? (e.g., Department of Education)',
        validate: (input: string) => {
          if (!input.trim()) {
            return 'Official name is required';
          }
          return true;
        }
      },
      {
        type: 'input',
        name: 'acronym',
        message: 'What is the acronym? (e.g., DepEd)',
        validate: (input: string) => {
          if (!input.trim()) {
            return 'Acronym is required';
          }
          return true;
        }
      },
      {
        type: 'list',
        name: 'category',
        message: 'What category does this belong to?',
        choices: (answers: any) => {
          const categories = getCategoriesForBranch(answers.branch);
          return categories.map(cat => ({ name: cat.displayName, value: cat.value }));
        }
      },
      {
        type: 'input',
        name: 'description',
        message: 'Brief description of the icon:',
        default: (answers: any) => `Official logo of ${answers.agencyName}`
      },
      {
        type: 'input',
        name: 'keywords',
        message: 'Keywords (comma-separated):',
        default: (answers: any) => `${answers.acronym.toLowerCase()}, ${answers.agencyName.toLowerCase()}, government, philippines`
      },
      {
        type: 'input',
        name: 'officialWebsite',
        message: 'Official website URL (optional):',
        validate: (input: string) => {
          if (input && !isValidUrl(input)) {
            return 'Please enter a valid URL';
          }
          return true;
        }
      },
      {
        type: 'input',
        name: 'author',
        message: 'Your name (for attribution):',
        default: 'Contributor'
      },
      {
        type: 'confirm',
        name: 'isOfficial',
        message: 'Is this an official government logo/symbol?',
        default: true
      },
      {
        type: 'confirm',
        name: 'hasPermission',
        message: 'Do you have permission to use this logo?',
        default: false
      }
    ]);

    // Validate permission
    if (answers.isOfficial && !answers.hasPermission) {
      console.log(chalk.yellow('⚠️  Warning: You should have official permission to use government logos.'));
      const proceed = await inquirer.prompt([{
        type: 'confirm',
        name: 'proceed',
        message: 'Do you want to proceed anyway?',
        default: false
      }]);
      
      if (!proceed.proceed) {
        console.log(chalk.red('Operation cancelled. Please obtain proper permission first.'));
        return;
      }
    }

    // Generate icon name
    const iconName = generateIconName(answers.agencyName, answers.acronym);
    
    // Create metadata
    const metadata: IconMetadata = {
      name: iconName,
      displayName: answers.agencyName,
      officialName: answers.officialName,
      acronym: answers.acronym,
      branch: answers.branch,
      category: answers.category,
      description: answers.description,
      keywords: answers.keywords.split(',').map((k: string) => k.trim()),
      author: answers.author,
      version: '1.0.0',
      license: 'MIT',
      isOfficial: answers.isOfficial,
      hasPermission: answers.hasPermission,
      officialWebsite: answers.officialWebsite,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    // Show preview
    console.log(chalk.blue('\n📋 Icon Preview:'));
    console.log(chalk.gray('Name:'), iconName);
    console.log(chalk.gray('Display Name:'), answers.agencyName);
    console.log(chalk.gray('Official Name:'), answers.officialName);
    console.log(chalk.gray('Acronym:'), answers.acronym);
    console.log(chalk.gray('Branch:'), answers.branch);
    console.log(chalk.gray('Category:'), answers.category);
    console.log(chalk.gray('Description:'), answers.description);

    if (options.dryRun) {
      console.log(chalk.yellow('\n🔍 Dry run - no files will be created'));
      return;
    }

    // Confirm creation
    if (!options.yes) {
      const confirm = await inquirer.prompt([{
        type: 'confirm',
        name: 'proceed',
        message: 'Create this icon?',
        default: true
      }]);
      
      if (!confirm.proceed) {
        console.log(chalk.red('Operation cancelled.'));
        return;
      }
    }

    // Process SVG
    spinner.start('Optimizing SVG...');
    const optimizedSvg = await optimizeSvg(svgPath);
    spinner.succeed('SVG optimized');

    // Create all necessary directories
    const iconDir = path.join(process.cwd(), 'packages/core/icons', answers.branch, answers.category);
    const reactIconsDir = path.join(process.cwd(), 'packages/react/src/icons');
    const vueIconsDir = path.join(process.cwd(), 'packages/vue/src/icons');
    const cssIconsDir = path.join(process.cwd(), 'packages/css/src/icons');
    const angularIconsDir = path.join(process.cwd(), 'packages/angular/src/icons');
    const webComponentsIconsDir = path.join(process.cwd(), 'packages/web-components/src/icons');
    
    await fs.ensureDir(iconDir);
    await fs.ensureDir(reactIconsDir);
    await fs.ensureDir(vueIconsDir);
    await fs.ensureDir(cssIconsDir);
    await fs.ensureDir(angularIconsDir);
    await fs.ensureDir(webComponentsIconsDir);

    // Save SVG file
    const svgFilePath = path.join(iconDir, `${iconName}.svg`);
    await fs.writeFile(svgFilePath, optimizedSvg);

    // Save metadata
    const metadataPath = path.join(iconDir, `${iconName}.json`);
    await fs.writeFile(metadataPath, JSON.stringify(metadata, null, 2));

    // Generate components
    spinner.start('Generating components...');
    await generateComponents(iconName, optimizedSvg, metadata);
    spinner.succeed('Components generated');

    // Update index files
    spinner.start('Updating index files...');
    await updateIndexFiles(iconName, metadata);
    spinner.succeed('Index files updated');

    console.log(chalk.green('\n✅ Icon added successfully!'));
    console.log(chalk.blue('📁 Files created:'));
    console.log(chalk.gray(`  - ${svgFilePath}`));
    console.log(chalk.gray(`  - ${metadataPath}`));
    console.log(chalk.gray(`  - packages/react/src/icons/${iconName}.tsx`));
    console.log(chalk.gray(`  - packages/vue/src/icons/${iconName}.vue`));
    console.log(chalk.gray(`  - packages/angular/src/icons/${iconName}.ts`));
    console.log(chalk.gray(`  - packages/web-components/src/icons/${iconName}.ts`));
    console.log(chalk.gray(`  - packages/css/src/icons/${iconName}.css`));
    console.log(chalk.gray(`  - test-${iconName}.html`));

    console.log(chalk.blue('\n🎯 Icon Details:'));
    console.log(chalk.gray(`  Name: ${metadata.displayName}`));
    console.log(chalk.gray(`  Acronym: ${metadata.acronym}`));
    console.log(chalk.gray(`  Branch: ${metadata.branch}`));
    console.log(chalk.gray(`  Category: ${metadata.category}`));
    console.log(chalk.gray(`  Description: ${metadata.description}`));

    console.log(chalk.yellow('\n📝 Next steps:'));
    console.log(chalk.gray('1. Open test-' + iconName + '.html to preview the icon'));
    console.log(chalk.gray('2. Review the generated components'));
    console.log(chalk.gray('3. Test the components in your framework'));
    console.log(chalk.gray('4. Update documentation if needed'));
    console.log(chalk.cyan('\n💡 Pro tip: Include the test file in your Pull Request for easy review!'));
    console.log(chalk.gray('5. Submit a pull request'));

    console.log(chalk.cyan('\n🚀 Usage examples:'));
    console.log(chalk.gray('React: import { ' + metadata.acronym + 'Logo } from "@ph-gov-icons/react"'));
    console.log(chalk.gray('Vue: import { ' + metadata.acronym + 'Logo } from "@ph-gov-icons/vue"'));
    console.log(chalk.gray('CSS: <i class="ph-icon-' + iconName + ' ph-icon-lg"></i>'));

  } catch (error) {
    spinner.fail('Failed to add icon');
    throw error;
  }
}

function getCategoriesForBranch(branch: GovernmentBranch): Array<{displayName: string, value: string}> {
  const categories: Record<GovernmentBranch, Array<{displayName: string, value: string}>> = {
    executive: [
      { displayName: 'Office of the President', value: 'office-of-the-president' },
      { displayName: 'Cabinet Departments', value: 'cabinet-departments' },
      { displayName: 'Executive Agencies', value: 'executive-agencies' }
    ],
    legislative: [
      { displayName: 'Senate', value: 'senate' },
      { displayName: 'House of Representatives', value: 'house-of-representatives' },
      { displayName: 'Congressional Committees', value: 'congressional-committees' }
    ],
    judicial: [
      { displayName: 'Supreme Court', value: 'supreme-court' },
      { displayName: 'Court of Appeals', value: 'court-of-appeals' },
      { displayName: 'Regional Trial Courts', value: 'regional-trial-courts' },
      { displayName: 'Municipal Trial Courts', value: 'municipal-trial-courts' }
    ],
    constitutional: [
      { displayName: 'Commission on Elections (COMELEC)', value: 'comelec' },
      { displayName: 'Commission on Audit (COA)', value: 'coa' },
      { displayName: 'Civil Service Commission (CSC)', value: 'csc' },
      { displayName: 'Commission on Human Rights (CHR)', value: 'chr' }
    ],
    local: [
      { displayName: 'Provinces', value: 'provinces' },
      { displayName: 'Cities', value: 'cities' },
      { displayName: 'Municipalities', value: 'municipalities' },
      { displayName: 'Barangays', value: 'barangays' }
    ],
    gocc: [
      { displayName: 'Transportation', value: 'transportation' },
      { displayName: 'Utilities', value: 'utilities' },
      { displayName: 'Financial', value: 'financial' },
      { displayName: 'Development', value: 'development' }
    ],
    other: [
      { displayName: 'Other', value: 'other' }
    ]
  };

  return categories[branch] || categories.other;
}

function generateIconName(agencyName: string, acronym: string): string {
  // Convert to kebab-case
  const name = agencyName
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, '')
    .replace(/\s+/g, '-')
    .replace(/^-+|-+$/g, '');
  
  return name;
}

function isValidUrl(string: string): boolean {
  try {
    new URL(string);
    return true;
  } catch (_) {
    return false;
  }
}

async function updateIndexFiles(iconName: string, metadata: IconMetadata) {
  // Update package index files
  const packages = ['react', 'vue', 'angular', 'web-components', 'css'];
  
  for (const pkg of packages) {
    const indexPath = path.join(process.cwd(), `packages/${pkg}/src/index.ts`);
    if (await fs.pathExists(indexPath)) {
      const content = await fs.readFile(indexPath, 'utf8');
      const exportLine = `export { ${metadata.acronym}Logo } from './icons/${iconName}';`;
      
      if (!content.includes(exportLine)) {
        await fs.writeFile(indexPath, content + '\n' + exportLine);
      }
    }
  }
}
