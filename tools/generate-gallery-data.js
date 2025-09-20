#!/usr/bin/env node

/**
 * Gallery Data Generator
 * 
 * This script generates a comprehensive JSON file containing all icons
 * organized by branch and category for use in the Gallery section of the docs.
 */

const fs = require('fs-extra');
const path = require('path');
const {
    execSync
} = require('child_process');

async function generateGalleryData() {
    console.log('🎨 Generating Gallery data...');

    try {
        // Run the CLI list command to get all icons
        const cliOutput = execSync('npm run icon:list -- --format json', {
            cwd: process.cwd(),
            encoding: 'utf8'
        });

        // Extract JSON from the output (remove npm command output)
        const jsonMatch = cliOutput.match(/\[[\s\S]*\]/);
        const icons = jsonMatch ? JSON.parse(jsonMatch[0]) : [];

        // Organize icons by branch and category
        const organizedData = {
            icons: icons,
            stats: {
                total: icons.length,
                byBranch: {},
                byCategory: {},
                latestUpdate: new Date().toISOString()
            },
            generatedAt: new Date().toISOString(),
            version: '1.0.0'
        };

        // Calculate statistics
        icons.forEach(icon => {
            // Count by branch
            if (!organizedData.stats.byBranch[icon.branch]) {
                organizedData.stats.byBranch[icon.branch] = 0;
            }
            organizedData.stats.byBranch[icon.branch]++;

            // Count by category
            if (!organizedData.stats.byCategory[icon.category]) {
                organizedData.stats.byCategory[icon.category] = 0;
            }
            organizedData.stats.byCategory[icon.category]++;
        });

        // Group icons by branch for easier navigation
        const groupedIcons = icons.reduce((acc, icon) => {
            if (!acc[icon.branch]) {
                acc[icon.branch] = [];
            }
            acc[icon.branch].push(icon);
            return acc;
        }, {});

        // Add grouped data
        organizedData.groupedIcons = groupedIcons;

        // Write to docs directory
        const outputPath = path.join(process.cwd(), 'docs', 'gallery-data.json');
        await fs.writeJson(outputPath, organizedData, {
            spaces: 2
        });

        console.log(`✅ Gallery data generated successfully!`);
        console.log(`📊 Total icons: ${organizedData.stats.total}`);
        console.log(`📁 Output: ${outputPath}`);

        // Log branch statistics
        Object.entries(organizedData.stats.byBranch).forEach(([branch, count]) => {
            console.log(`   ${branch}: ${count} icons`);
        });

    } catch (error) {
        console.error('❌ Error generating gallery data:', error.message);
        process.exit(1);
    }
}

// Run if called directly
if (require.main === module) {
    generateGalleryData();
}

module.exports = {
    generateGalleryData
};