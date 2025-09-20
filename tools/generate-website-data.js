#!/usr/bin/env node

const fs = require('fs-extra');
const path = require('path');

async function generateWebsiteData() {
    console.log('🌐 Generating website data...');

    const iconsDir = path.join(process.cwd(), 'packages/core/icons');
    const outputPath = path.join(process.cwd(), 'docs/icons.json');

    if (!await fs.pathExists(iconsDir)) {
        console.log('❌ Icons directory not found. Run from project root.');
        return;
    }

    const icons = [];

    // Recursively find all icon metadata files
    const findIcons = async (dir, branch = '', category = '') => {
        const entries = await fs.readdir(dir, {
            withFileTypes: true
        });

        for (const entry of entries) {
            const fullPath = path.join(dir, entry.name);

            if (entry.isDirectory()) {
                const currentBranch = branch || entry.name;
                await findIcons(fullPath, currentBranch, category);
            } else if (entry.name.endsWith('.json')) {
                try {
                    const metadata = await fs.readJson(fullPath);
                    const pathParts = fullPath.split(path.sep);
                    const branchIndex = pathParts.indexOf('packages') + 3; // packages/core/icons/branch
                    const categoryIndex = branchIndex + 1;

                    icons.push({
                        name: metadata.name,
                        displayName: metadata.displayName,
                        acronym: metadata.acronym,
                        branch: pathParts[branchIndex] || metadata.branch,
                        category: pathParts[categoryIndex] || metadata.category,
                        description: metadata.description,
                        keywords: metadata.keywords,
                        author: metadata.author,
                        version: metadata.version,
                        createdAt: metadata.createdAt,
                        officialWebsite: metadata.officialWebsite,
                        hasPermission: metadata.hasPermission,
                        isOfficial: metadata.isOfficial
                    });
                } catch (error) {
                    console.warn(`⚠️  Warning: Could not parse ${fullPath}`);
                }
            }
        }
    };

    await findIcons(iconsDir);

    // Sort icons by display name
    icons.sort((a, b) => a.displayName.localeCompare(b.displayName));

    // Generate statistics
    const stats = {
        total: icons.length,
        byBranch: {},
        byCategory: {},
        latestUpdate: new Date().toISOString()
    };

    icons.forEach(icon => {
        // Count by branch
        if (!stats.byBranch[icon.branch]) {
            stats.byBranch[icon.branch] = 0;
        }
        stats.byBranch[icon.branch]++;

        // Count by category
        if (!stats.byCategory[icon.category]) {
            stats.byCategory[icon.category] = 0;
        }
        stats.byCategory[icon.category]++;
    });

    const websiteData = {
        icons,
        stats,
        generatedAt: new Date().toISOString(),
        version: '1.0.0'
    };

    // Write the data file
    await fs.writeJson(outputPath, websiteData, {
        spaces: 2
    });

    console.log(`✅ Generated website data with ${icons.length} icons`);
    console.log(`📊 Statistics:`);
    console.log(`   Total icons: ${stats.total}`);
    Object.entries(stats.byBranch).forEach(([branch, count]) => {
        console.log(`   ${branch}: ${count} icons`);
    });
    console.log(`📁 Output: ${outputPath}`);
}

// Run if called directly
if (require.main === module) {
    generateWebsiteData().catch(console.error);
}

module.exports = {
    generateWebsiteData
};