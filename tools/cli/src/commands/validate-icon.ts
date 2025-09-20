import chalk from 'chalk';
import { validateSvg } from '../utils/svg-validator';

export async function validateIcon(svgPath: string, options: any) {
  console.log(chalk.blue(`🔍 Validating SVG: ${svgPath}`));
  
  try {
    const result = await validateSvg(svgPath);
    
    if (result.isValid) {
      console.log(chalk.green('✅ SVG is valid!'));
    } else {
      console.log(chalk.red('❌ SVG validation failed:'));
      result.errors.forEach(error => {
        console.log(chalk.red(`  • ${error}`));
      });
    }
    
    if (result.warnings.length > 0) {
      console.log(chalk.yellow('\n⚠️  Warnings:'));
      result.warnings.forEach(warning => {
        console.log(chalk.yellow(`  • ${warning}`));
      });
    }
    
    if (options.verbose) {
      console.log(chalk.blue('\n📊 Validation Details:'));
      if (result.viewBox) {
        console.log(chalk.gray(`  ViewBox: ${result.viewBox}`));
      }
      if (result.width && result.height) {
        console.log(chalk.gray(`  Dimensions: ${result.width}x${result.height}`));
      }
      if (result.strokeWidth) {
        console.log(chalk.gray(`  Stroke Width: ${result.strokeWidth}px`));
      }
    }
    
    if (!result.isValid) {
      process.exit(1);
    }
    
  } catch (error) {
    console.error(chalk.red('Error validating SVG:'), error);
    process.exit(1);
  }
}
