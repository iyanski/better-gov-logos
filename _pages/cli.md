---
layout: default
title: "CLI Tool"
description: "Command-line interface for managing Philippine government icons"
permalink: /cli/
---

# 🛠️ CLI Tool

The `bettergovicon` CLI tool helps you manage Philippine government icons with ease.

## Installation

### Global Installation (Recommended)

```bash
# Install globally
npm install -g bettergovicon

# Verify installation
bettergovicon --version
```

### Local Installation

```bash
# Install in your project
npm install --save-dev bettergovicon

# Use with npx
npx bettergovicon --help
```

## Commands

### `bettergovicon process <svg-file>`

Automatically detect and process an SVG file for common agencies.

```bash
# Process a DA.svg file
bettergovicon process DA.svg

# The tool will automatically:
# - Detect it's the Department of Agriculture
# - Ask for confirmation
# - Generate all components
# - Create test file
```

### `bettergovicon add <svg-file>`

Add a new icon with interactive prompts.

```bash
# Add a new icon
bettergovicon add new-icon.svg

# You'll be prompted for:
# - Branch of government
# - Agency name
# - Description
# - Keywords
```

### `bettergovicon list`

List all available icons.

```bash
# List all icons
bettergovicon list

# Shows:
# - Icon name and acronym
# - Branch and category
# - Test file links
# - Usage examples
```

### `bettergovicon validate <svg-file>`

Validate an SVG file against standards.

```bash
# Validate SVG
bettergovicon validate my-icon.svg

# Checks:
# - SVG structure
# - Accessibility
# - Optimization
# - Standards compliance
```

### `bettergovicon generate`

Regenerate all components from existing metadata.

```bash
# Regenerate all components
bettergovicon generate

# Useful for:
# - After updating templates
# - Fixing component issues
# - Updating all icons
```

### `bettergovicon remove <icon-name>`

Remove an icon and all associated files.

```bash
# Remove an icon
bettergovicon remove da

# Options:
# --force: Skip confirmation
# --dry-run: Show what would be deleted
```

## Auto-Detection

The CLI automatically detects common Philippine government agencies:

- **DA**: Department of Agriculture
- **DepEd**: Department of Education
- **DOH**: Department of Health
- **DILG**: Department of the Interior and Local Government
- **DSWD**: Department of Social Welfare and Development
- **DOT**: Department of Tourism
- **DOST**: Department of Science and Technology
- **DND**: Department of National Defense
- **DOF**: Department of Finance
- **DOLE**: Department of Labor and Employment

## Workflow

1. **Prepare your SVG**: Ensure it's a clean, vector format
2. **Run the CLI**: Use `bettergovicon process` or `bettergovicon add`
3. **Review generated files**: Check components and test file
4. **Test locally**: Verify the icon works in your project
5. **Submit PR**: Include the test file for easy review

## Tips

- **Use descriptive filenames**: `DA.svg`, `DepEd.svg`, etc.
- **Include test files**: Always include the generated test file in PRs
- **Check generated components**: Verify they work in your framework
- **Use the list command**: See all available icons and their details
