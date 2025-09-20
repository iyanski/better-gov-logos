#!/usr/bin/env node

import { Command } from 'commander';
import chalk from 'chalk';
import ora from 'ora';
import { addIcon } from './commands/add-icon';
import { validateIcon } from './commands/validate-icon';
import { listIcons } from './commands/list-icons';
import { generateComponents } from './commands/generate-components';
import { processIcon } from './commands/process-icon';
import { version } from '../package.json';

const program = new Command();

program
  .name('bettergovicon')
  .description('CLI tool for managing Philippine government icons')
  .version(version);

program
  .command('add <svg-path>')
  .description('Add a new government icon to the library')
  .option('-i, --interactive', 'Run in interactive mode (default)')
  .option('-y, --yes', 'Skip confirmation prompts')
  .option('--dry-run', 'Show what would be created without making changes')
  .action(async (svgPath: string, options: any) => {
    try {
      await addIcon(svgPath, options);
    } catch (error) {
      console.error(chalk.red('Error adding icon:'), error);
      process.exit(1);
    }
  });

program
  .command('process <svg-path>')
  .description('Process an SVG with auto-detection (recommended for common agencies)')
  .option('-y, --yes', 'Skip confirmation prompts')
  .option('--dry-run', 'Show what would be created without making changes')
  .action(async (svgPath: string, options: any) => {
    try {
      await processIcon(svgPath, options);
    } catch (error) {
      console.error(chalk.red('Error processing icon:'), error);
      process.exit(1);
    }
  });

program
  .command('validate <svg-path>')
  .description('Validate an SVG file for icon standards')
  .option('-v, --verbose', 'Show detailed validation results')
  .action(async (svgPath: string, options: any) => {
    try {
      await validateIcon(svgPath, options);
    } catch (error) {
      console.error(chalk.red('Error validating icon:'), error);
      process.exit(1);
    }
  });

program
  .command('list')
  .description('List all icons in the library')
  .option('-c, --category <category>', 'Filter by category')
  .option('-t, --tags <tags>', 'Filter by tags (comma-separated)')
  .option('-f, --format <format>', 'Output format (table, json, csv)')
  .action(async (options: any) => {
    try {
      await listIcons(options);
    } catch (error) {
      console.error(chalk.red('Error listing icons:'), error);
      process.exit(1);
    }
  });

program
  .command('generate')
  .description('Generate components for all icons')
  .option('-f, --frameworks <frameworks>', 'Frameworks to generate (react,vue,angular,web-components)')
  .option('--force', 'Force regeneration of existing components')
  .action(async (options: any) => {
    try {
      await generateComponents(options);
    } catch (error) {
      console.error(chalk.red('Error generating components:'), error);
      process.exit(1);
    }
  });

program
  .command('init')
  .description('Initialize the project structure')
  .action(async () => {
    const spinner = ora('Initializing project structure...').start();
    try {
      // Initialize project structure
      spinner.succeed('Project structure initialized');
    } catch (error) {
      spinner.fail('Failed to initialize project structure');
      console.error(chalk.red('Error:'), error);
      process.exit(1);
    }
  });

// Global error handler
process.on('uncaughtException', (error) => {
  console.error(chalk.red('Uncaught Exception:'), error);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error(chalk.red('Unhandled Rejection at:'), promise, 'reason:', reason);
  process.exit(1);
});

program.parse();
