#!/usr/bin/env node

/**
 * Sample Icon Creator
 * 
 * Creates a sample icon for testing the Gallery functionality
 */

const fs = require('fs-extra');
const path = require('path');

async function createSampleIcon() {
    console.log('🎨 Creating sample icon for Gallery testing...');

    try {
        const iconsDir = path.join(process.cwd(), 'packages/core/icons/executive/cabinet-departments');

        // Ensure directory exists
        await fs.ensureDir(iconsDir);

        // Create sample icon metadata
        const sampleIcon = {
            name: 'deped',
            displayName: 'Department of Education',
            acronym: 'DepEd',
            branch: 'executive',
            category: 'cabinet-departments',
            description: 'Official logo of the Department of Education of the Philippines',
            keywords: ['education', 'school', 'learning', 'deped', 'philippines'],
            author: 'Philippine Government Icons Team',
            version: '1.0.0',
            createdAt: new Date().toISOString(),
            path: path.join(iconsDir, 'deped.json')
        };

        // Write metadata file
        await fs.writeJson(path.join(iconsDir, 'deped.json'), sampleIcon, {
            spaces: 2
        });

        // Create a simple SVG file
        const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <rect width="100" height="100" fill="#0033A0"/>
  <text x="50" y="60" text-anchor="middle" fill="white" font-family="Arial, sans-serif" font-size="12" font-weight="bold">DepEd</text>
</svg>`;

        await fs.writeFile(path.join(iconsDir, 'deped.svg'), svgContent);

        console.log('✅ Sample icon created successfully!');
        console.log(`📁 Location: ${path.join(iconsDir, 'deped.json')}`);
        console.log('🔄 Now run: npm run gallery:generate');

    } catch (error) {
        console.error('❌ Error creating sample icon:', error.message);
        process.exit(1);
    }
}

// Run if called directly
if (require.main === module) {
    createSampleIcon();
}

module.exports = {
    createSampleIcon
};