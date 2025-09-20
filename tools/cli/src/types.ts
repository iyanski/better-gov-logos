export type GovernmentBranch = 
  | 'executive'
  | 'legislative'
  | 'judicial'
  | 'constitutional'
  | 'local'
  | 'gocc'
  | 'other';

export type IconCategory = 
  | 'office-of-the-president'
  | 'cabinet-departments'
  | 'executive-agencies'
  | 'senate'
  | 'house-of-representatives'
  | 'congressional-committees'
  | 'supreme-court'
  | 'court-of-appeals'
  | 'regional-trial-courts'
  | 'municipal-trial-courts'
  | 'comelec'
  | 'coa'
  | 'csc'
  | 'chr'
  | 'provinces'
  | 'cities'
  | 'municipalities'
  | 'barangays'
  | 'transportation'
  | 'utilities'
  | 'financial'
  | 'development'
  | 'other';

export interface IconMetadata {
  name: string;
  displayName: string;
  officialName: string;
  acronym: string;
  branch: GovernmentBranch;
  category: IconCategory;
  description: string;
  keywords: string[];
  author: string;
  version: string;
  license: string;
  isOfficial: boolean;
  hasPermission: boolean;
  officialWebsite?: string;
  createdAt: string;
  updatedAt: string;
}

export interface SvgValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
  viewBox?: string;
  width?: number;
  height?: number;
  strokeWidth?: number;
}

export interface ComponentGenerationOptions {
  frameworks: string[];
  force: boolean;
  outputDir: string;
}

export interface IconListOptions {
  category?: string;
  tags?: string[];
  format: 'table' | 'json' | 'csv';
}

export interface IconInfo {
  name: string;
  displayName: string;
  acronym: string;
  branch: GovernmentBranch;
  category: IconCategory;
  description: string;
  keywords: string[];
  author: string;
  version: string;
  createdAt: string;
  path: string;
}
