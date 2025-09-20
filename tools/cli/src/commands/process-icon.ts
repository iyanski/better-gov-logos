import chalk from 'chalk';
import ora from 'ora';
import fs from 'fs-extra';
import path from 'path';
import { addIcon } from './add-icon';

export async function processIcon(svgPath: string, options: any) {
  console.log(chalk.blue(`🚀 Processing icon: ${svgPath}`));
  
  // Check if file exists
  if (!await fs.pathExists(svgPath)) {
    console.error(chalk.red(`❌ File not found: ${svgPath}`));
    process.exit(1);
  }
  
  // Extract icon name from filename
  const fileName = path.basename(svgPath, '.svg');
  const iconName = fileName.toLowerCase().replace(/[^a-z0-9]/g, '-');
  
  console.log(chalk.gray(`📝 Detected icon name: ${iconName}`));
  
  // Auto-detect government agency from filename
  const agencyInfo = detectAgencyFromFilename(fileName);
  
  if (agencyInfo) {
    console.log(chalk.green(`✅ Auto-detected: ${agencyInfo.displayName} (${agencyInfo.acronym})`));
    console.log(chalk.gray(`   Branch: ${agencyInfo.branch}`));
    console.log(chalk.gray(`   Category: ${agencyInfo.category}`));
  }
  
  // Process with auto-detected information
  const autoAnswers = {
    branch: agencyInfo?.branch || 'executive',
    agencyName: agencyInfo?.displayName || fileName,
    officialName: agencyInfo?.officialName || fileName,
    acronym: agencyInfo?.acronym || fileName.toUpperCase(),
    category: agencyInfo?.category || 'cabinet-departments',
    description: `Official logo of ${agencyInfo?.displayName || fileName}`,
    keywords: agencyInfo?.keywords || [fileName.toLowerCase(), 'government', 'philippines'],
    author: 'Philippine Government Icons Team',
    isOfficial: true,
    hasPermission: true
  };
  
  console.log(chalk.yellow('\n🤖 Using auto-detected information:'));
  console.log(chalk.gray(`   Agency: ${autoAnswers.agencyName}`));
  console.log(chalk.gray(`   Acronym: ${autoAnswers.acronym}`));
  console.log(chalk.gray(`   Branch: ${autoAnswers.branch}`));
  console.log(chalk.gray(`   Category: ${autoAnswers.category}`));
  
  // Process the icon
  await addIcon(svgPath, { ...options, autoAnswers });
}

function detectAgencyFromFilename(filename: string): any {
  const filenameLower = filename.toLowerCase();
  
  // Common Philippine government agencies
  const agencies = {
    'da': {
      displayName: 'Department of Agriculture',
      officialName: 'Department of Agriculture',
      acronym: 'DA',
      branch: 'executive',
      category: 'cabinet-departments',
      keywords: ['da', 'agriculture', 'farming', 'food']
    },
    'deped': {
      displayName: 'Department of Education',
      officialName: 'Department of Education',
      acronym: 'DepEd',
      branch: 'executive',
      category: 'cabinet-departments',
      keywords: ['deped', 'education', 'school', 'learning']
    },
    'doh': {
      displayName: 'Department of Health',
      officialName: 'Department of Health',
      acronym: 'DOH',
      branch: 'executive',
      category: 'cabinet-departments',
      keywords: ['doh', 'health', 'medical', 'hospital']
    },
    'dotr': {
      displayName: 'Department of Transportation',
      officialName: 'Department of Transportation',
      acronym: 'DOTr',
      branch: 'executive',
      category: 'cabinet-departments',
      keywords: ['dotr', 'transportation', 'transport', 'mobility']
    },
    'dpwh': {
      displayName: 'Department of Public Works and Highways',
      officialName: 'Department of Public Works and Highways',
      acronym: 'DPWH',
      branch: 'executive',
      category: 'cabinet-departments',
      keywords: ['dpwh', 'public works', 'infrastructure', 'highways']
    },
    'dti': {
      displayName: 'Department of Trade and Industry',
      officialName: 'Department of Trade and Industry',
      acronym: 'DTI',
      branch: 'executive',
      category: 'cabinet-departments',
      keywords: ['dti', 'trade', 'industry', 'business']
    },
    'dole': {
      displayName: 'Department of Labor and Employment',
      officialName: 'Department of Labor and Employment',
      acronym: 'DOLE',
      branch: 'executive',
      category: 'cabinet-departments',
      keywords: ['dole', 'labor', 'employment', 'work']
    },
    'dswd': {
      displayName: 'Department of Social Welfare and Development',
      officialName: 'Department of Social Welfare and Development',
      acronym: 'DSWD',
      branch: 'executive',
      category: 'cabinet-departments',
      keywords: ['dswd', 'social welfare', 'development', 'social']
    },
    'dilg': {
      displayName: 'Department of Interior and Local Government',
      officialName: 'Department of Interior and Local Government',
      acronym: 'DILG',
      branch: 'executive',
      category: 'cabinet-departments',
      keywords: ['dilg', 'interior', 'local government', 'lgus']
    },
    'dnd': {
      displayName: 'Department of National Defense',
      officialName: 'Department of National Defense',
      acronym: 'DND',
      branch: 'executive',
      category: 'cabinet-departments',
      keywords: ['dnd', 'defense', 'military', 'security']
    },
    'dof': {
      displayName: 'Department of Finance',
      officialName: 'Department of Finance',
      acronym: 'DOF',
      branch: 'executive',
      category: 'cabinet-departments',
      keywords: ['dof', 'finance', 'fiscal', 'budget']
    },
    'doj': {
      displayName: 'Department of Justice',
      officialName: 'Department of Justice',
      acronym: 'DOJ',
      branch: 'executive',
      category: 'cabinet-departments',
      keywords: ['doj', 'justice', 'legal', 'law']
    },
    'denr': {
      displayName: 'Department of Environment and Natural Resources',
      officialName: 'Department of Environment and Natural Resources',
      acronym: 'DENR',
      branch: 'executive',
      category: 'cabinet-departments',
      keywords: ['denr', 'environment', 'natural resources', 'ecology']
    },
    'doe': {
      displayName: 'Department of Energy',
      officialName: 'Department of Energy',
      acronym: 'DOE',
      branch: 'executive',
      category: 'cabinet-departments',
      keywords: ['doe', 'energy', 'power', 'electricity']
    },
    'dot': {
      displayName: 'Department of Tourism',
      officialName: 'Department of Tourism',
      acronym: 'DOT',
      branch: 'executive',
      category: 'cabinet-departments',
      keywords: ['dot', 'tourism', 'travel', 'visitor']
    },
    'dost': {
      displayName: 'Department of Science and Technology',
      officialName: 'Department of Science and Technology',
      acronym: 'DOST',
      branch: 'executive',
      category: 'cabinet-departments',
      keywords: ['dost', 'science', 'technology', 'research']
    },
    'dict': {
      displayName: 'Department of Information and Communications Technology',
      officialName: 'Department of Information and Communications Technology',
      acronym: 'DICT',
      branch: 'executive',
      category: 'cabinet-departments',
      keywords: ['dict', 'information', 'communications', 'technology']
    },
    'dfa': {
      displayName: 'Department of Foreign Affairs',
      officialName: 'Department of Foreign Affairs',
      acronym: 'DFA',
      branch: 'executive',
      category: 'cabinet-departments',
      keywords: ['dfa', 'foreign affairs', 'diplomacy', 'international']
    },
    'dbm': {
      displayName: 'Department of Budget and Management',
      officialName: 'Department of Budget and Management',
      acronym: 'DBM',
      branch: 'executive',
      category: 'cabinet-departments',
      keywords: ['dbm', 'budget', 'management', 'fiscal']
    },
    'dar': {
      displayName: 'Department of Agrarian Reform',
      officialName: 'Department of Agrarian Reform',
      acronym: 'DAR',
      branch: 'executive',
      category: 'cabinet-departments',
      keywords: ['dar', 'agrarian reform', 'land', 'agriculture']
    }
  };
  
  // Check for exact matches first
  if (agencies[filenameLower as keyof typeof agencies]) {
    return agencies[filenameLower as keyof typeof agencies];
  }
  
  // Check for partial matches
  for (const [key, agency] of Object.entries(agencies)) {
    if (filenameLower.includes(key)) {
      return agency;
    }
  }
  
  return null;
}
