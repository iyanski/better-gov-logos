# 🇵🇭 Philippine Government Icons

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com)
[![Build Status](https://github.com/iyanski/better-gov-logos/workflows/CI/badge.svg)](https://github.com/iyanski/better-gov-logos/actions)

> **🚧 Development Status**: This project is currently in active development. The initial release will include packages for React, Vue, Angular, CSS, and Web Components.

A comprehensive library of Philippine government icons and symbols, designed for developers who need to represent government agencies, departments, and official symbols in their applications.

## ✨ Features

- 🏛️ **Complete Coverage**: Icons for all major Philippine government agencies
- 🎨 **Multiple Formats**: CSS, React, Vue, Angular, and Web Components
- 📦 **Tree-shaking**: Import only the icons you need
- 🎯 **Accessibility**: WCAG 2.1 AA compliant
- 📱 **Responsive**: Optimized for all screen sizes
- 🚀 **Performance**: Lightweight and fast
- 📚 **Well Documented**: Comprehensive documentation with examples

## 🚀 Quick Start

### Installation

**Note**: This project is currently in development. The packages will be available on npm once the initial release is ready.

For now, you can use the icons directly from the source:

```bash
# Clone the repository
git clone https://github.com/iyanski/better-gov-logos.git
cd better-gov-logos

# Install dependencies
npm install
```

### Usage Examples

#### React
```tsx
// Import from local source (during development)
import { DepartmentOfAgriculturalReform } from './packages/react/src/icons/department-of-agricultural-reform';

function App() {
  return (
    <div>
      <DepartmentOfAgriculturalReform size={24} color="#0033A0" />
    </div>
  );
}
```

#### Vue
```vue
<template>
  <div>
    <DepartmentOfAgriculturalReform :size="24" color="#0033A0" />
  </div>
</template>

<script setup>
// Import from local source (during development)
import DepartmentOfAgriculturalReform from './packages/vue/src/icons/department-of-agricultural-reform.vue';
</script>
```

#### CSS
```html
<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" href="./packages/css/src/index.css">
</head>
<body>
  <i class="ph-icon ph-icon-department-of-agricultural-reform"></i>
</body>
</html>
```

#### Web Components
```html
<!-- Import the web component -->
<script type="module" src="./packages/web-components/src/index.ts"></script>

<!-- Use the component -->
<ph-icon name="department-of-agricultural-reform" size="24" color="#0033A0"></ph-icon>
```

## 🛠️ CLI Tool Installation

### Install the `bettergovicon` Command

The `bettergovicon` CLI tool makes it incredibly easy to add new Philippine government icons to the library.

#### **Global Installation**

**Option 1: Using npm script (Recommended)**
```bash
# Install the CLI tool using the project's npm script
npm run cli:install

# Verify installation
bettergovicon --version
```

**Option 2: Manual installation**
```bash
# Install globally from the project
cd tools/cli
npm install -g .

# Or use npm link
npm link

# Verify installation
bettergovicon --version
```

**Uninstall the CLI tool**
```bash
# Remove the global CLI tool
npm run cli:uninstall

# Or manually
npm unlink -g bettergovicon
```

#### **Using the CLI Tool**

**Option 1: Direct CLI Commands**
```bash
# Process with auto-detection (recommended for common agencies)
bettergovicon process DA.svg

# Interactive mode for any agency
bettergovicon add path/to/your-icon.svg

# Validate an SVG before processing
bettergovicon validate path/to/your-icon.svg

# List all icons in the library (includes test file links)
bettergovicon list

# Generate components for all icons
bettergovicon generate

# Remove an icon and all associated files
bettergovicon remove icon-name

# Remove with dry run (preview only)
bettergovicon remove icon-name --dry-run

# Remove without confirmation prompts
bettergovicon remove icon-name --force

# Get help
bettergovicon --help
```

**Option 2: Using npm Scripts**
```bash
# Process with auto-detection
npm run icon:process path/to/DA.svg

# Interactive mode
npm run icon:add path/to/your-icon.svg

# Validate an SVG
npm run icon:validate path/to/your-icon.svg

# List all icons
npm run icon:list

# Generate components
npm run icon:generate

# Remove an icon
npm run icon:remove icon-name

# Remove with dry run
npm run icon:remove icon-name -- --dry-run

# Remove without confirmation
npm run icon:remove icon-name -- --force

# Initialize project
npm run icon:init
```

#### **Auto-Detection Support**
The CLI automatically recognizes these Philippine government agencies:
- **DA** - Department of Agriculture
- **DepEd** - Department of Education
- **DOH** - Department of Health
- **DOTr** - Department of Transportation
- **DPWH** - Department of Public Works and Highways
- **DTI** - Department of Trade and Industry
- **DOLE** - Department of Labor and Employment
- **DSWD** - Department of Social Welfare and Development
- **DILG** - Department of Interior and Local Government
- **DND** - Department of National Defense
- **DOF** - Department of Finance
- **DOJ** - Department of Justice
- **DENR** - Department of Environment and Natural Resources
- **DOE** - Department of Energy
- **DOT** - Department of Tourism
- **DOST** - Department of Science and Technology
- **DICT** - Department of Information and Communications Technology
- **DFA** - Department of Foreign Affairs
- **DBM** - Department of Budget and Management
- **DAR** - Department of Agrarian Reform

#### **What the CLI Does Automatically**
1. **SVG Processing**: Normalizes viewBox to 24x24, optimizes for performance
2. **Component Generation**: Creates React, Vue, Angular, Web Components, and CSS
3. **File Organization**: Creates proper directory structure and updates index files
4. **Test Page**: Generates visual test page with all size and color variants
5. **Metadata**: Creates comprehensive icon metadata and documentation

#### **Choosing Between Options**

**Use `bettergovicon` CLI when:**
- ✅ You want to use the tool from anywhere on your system
- ✅ You're working on multiple projects
- ✅ You prefer a standalone command-line tool
- ✅ You want the latest features and updates

**Use npm Scripts when:**
- ✅ You're working within the project directory
- ✅ You want to use the project's local dependencies
- ✅ You're contributing to the project development
- ✅ You prefer npm workflow integration

## 📚 Documentation

- 📖 [Full Documentation](https://iyanski.github.io/better-gov-logos/)
- 💻 [Examples](https://iyanski.github.io/better-gov-logos/#examples)
- 🚀 [Getting Started Guide](https://iyanski.github.io/better-gov-logos/#installation)

## 🏛️ Icon Categories

### Executive Branch
- **Office of the President**: Malacañang Palace, Presidential Seal
- **Cabinet Departments**: DepEd, DOH, DOTr, DPWH, DA, DTI, DOLE, DSWD, DILG, DND, DOF, DOJ, DENR, DOE, DOT, DOST, DICT, DFA, DBM, DAR

### Legislative Branch
- **Congress**: Senate, House of Representatives
- **Committees**: Various legislative committee logos

### Judicial Branch
- **Courts**: Supreme Court, Court of Appeals, Regional Trial Courts

### Constitutional Bodies
- **Independent Commissions**: COMELEC, COA, CSC, CHR

### Local Government
- **Provinces**: All 81 provinces
- **Cities**: Major cities and municipalities
- **Barangays**: Local government symbols

### Government-Owned Corporations
- **GOCCs**: PAL, MMDA, PNP, AFP, and more

## 🎨 Styling and Theming

### CSS Custom Properties
```css
:root {
  --ph-icon-size: 24px;
  --ph-icon-color: #0033A0;
  --ph-icon-hover-color: #1B5E20;
}
```

### Size Variants
```css
.ph-icon-sm { font-size: 16px; }
.ph-icon-md { font-size: 24px; }
.ph-icon-lg { font-size: 32px; }
.ph-icon-xl { font-size: 48px; }
```

## 🔧 Advanced Usage

### Tree-shaking (React/Vue)
```tsx
// ✅ Good - imports only what you need
import { DepartmentOfAgriculturalReform } from './packages/react/src/icons/department-of-agricultural-reform';

// ❌ Avoid - imports entire library
import * as PhIcons from './packages/react/src';
```

### Custom Styling
```tsx
<DepartmentOfAgriculturalReform 
  size={24} 
  color="#0033A0" 
  className="custom-icon"
  style={{ filter: 'drop-shadow(2px 2px 4px rgba(0,0,0,0.3))' }}
/>
```

### Dynamic Icons
```tsx
const iconMap = {
  'department-of-agricultural-reform': DepartmentOfAgriculturalReform,
  // Add more icons as they become available
};

const IconComponent = iconMap[iconName];
return <IconComponent size={24} />;
```

## 🤝 Contributing

We welcome contributions from the community! Here's how you can help:

### 🐛 Reporting Issues
- Use our [issue template](https://github.com/iyanski/better-gov-logos/issues/new?template=bug_report.md)
- Include screenshots and steps to reproduce
- Check existing issues before creating new ones

### 💡 Suggesting New Icons
- Use our [icon request template](https://github.com/iyanski/better-gov-logos/issues/new?template=icon_request.md)
- Provide official government sources
- Include context about the agency/department

### 🔧 Development Setup

1. **Fork and Clone**
   ```bash
   git clone https://github.com/iyanski/better-gov-logos.git
   cd better-gov-logos
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Start Development Server**
   ```bash
   npm run dev
   ```

4. **Run Tests**
   ```bash
   npm test
   ```

### 🧪 Test File Generation

When you add a new icon using the CLI tool, it automatically generates a test file (`test-{icon-name}.html`) that includes:

- **Visual Preview**: Shows the icon in different sizes (24px, 48px, 96px)
- **CSS Icons**: Demonstrates font-based icon usage with size variants
- **Color Variants**: Shows primary, secondary, and accent color options
- **Framework Examples**: Code samples for React, Vue, Svelte, CSS, and Web Components
- **Copy-to-Clipboard**: Easy copying of code examples
- **Metadata Display**: Complete icon information and usage details

**Include the test file in your Pull Request** - it helps reviewers verify the icon looks correct and provides examples for documentation.

### 📝 Adding New Icons

We've made it super easy to add new government icons using our `bettergovicon` CLI tool! Here are two ways to contribute:

#### 🚀 **Easy Way: Using the CLI Tool (Recommended)**

1. **Prepare Your SVG**
   - Ensure your SVG follows our [design guidelines](#design-guidelines)
   - Make sure you have permission to use the government logo

2. **Add the Icon**

   **Option A: Using `bettergovicon` CLI (Recommended)**
   ```bash
   # Process with auto-detection (recommended for common agencies)
   bettergovicon process path/to/DA.svg
   
   # Interactive mode for any agency
   bettergovicon add path/to/your-icon.svg
   ```

   **Option B: Using npm Scripts**
   ```bash
   # Process with auto-detection
   npm run icon:process path/to/DA.svg
   
   # Interactive mode
   npm run icon:add path/to/your-icon.svg
   ```

   **Option C: Using npm Scripts**
   ```bash
   # Process with auto-detection
   npm run icon:process path/to/DA.svg
   
   # Interactive mode
   npm run icon:add path/to/your-icon.svg
   ```

3. **Follow the Interactive Guide**
   The CLI will ask you questions like:
   - What branch of government is this?
   - What is the name of the agency?
   - What is the official full name?
   - What is the acronym?
   - Brief description
   - Keywords
   - Your name for attribution
   - Permission confirmation

4. **That's it!** The CLI will automatically:
   - ✅ Validate your SVG
   - 🔧 Optimize it for performance
   - ⚡ Generate components for all frameworks
   - 📝 Create metadata
   - 🔄 Update index files
   - 🧪 Generate test file (`test-{icon-name}.html`) for visual verification

#### 📋 **Manual Way: Step-by-Step**

1. **Create SVG File**
   - Place in `packages/core/icons/[branch]/[category]/[icon-name].svg`
   - Follow our [design guidelines](#design-guidelines)

2. **Add Metadata**
   ```json
   {
     "name": "icon-name",
     "displayName": "Agency Name",
     "officialName": "Full Official Name",
     "acronym": "ACRONYM",
     "branch": "executive",
     "category": "cabinet-departments",
     "description": "Brief description",
     "keywords": ["keyword1", "keyword2"],
     "version": "1.0.0",
     "author": "Your Name",
     "license": "MIT",
     "isOfficial": true,
     "hasPermission": true,
     "createdAt": "2024-01-01T00:00:00.000Z"
   }
   ```

3. **Generate Components**
   ```bash
   npm run icon:generate
   ```

4. **Update Documentation**
   - Add to icon gallery
   - Include usage examples

#### 🔧 **CLI Tool Commands**

Our CLI tool provides several helpful commands:

**Option A: Using `bettergovicon` CLI (Recommended)**
```bash
# Process with auto-detection (recommended for common agencies)
bettergovicon process path/to/DA.svg

# Interactive mode for any agency
bettergovicon add path/to/icon.svg

# Validate an SVG before adding
bettergovicon validate path/to/icon.svg

# List all existing icons (includes test file links)
bettergovicon list

# Generate components for all icons
bettergovicon generate

# Remove an icon and all associated files
bettergovicon remove icon-name

# Remove with dry run (preview only)
bettergovicon remove icon-name --dry-run

# Remove without confirmation prompts
bettergovicon remove icon-name --force

# Get help
bettergovicon --help
```

**Option B: Using npm Scripts**
```bash
# Process with auto-detection
npm run icon:process path/to/DA.svg

# Interactive mode
npm run icon:add path/to/icon.svg

# Validate an SVG before adding
npm run icon:validate path/to/icon.svg

# List all existing icons
npm run icon:list

# Generate components for all icons
npm run icon:generate

# Initialize project structure
npm run icon:init
```

#### ✅ **SVG Validation**

Before adding an icon, you can validate it:

**Option A: Using `bettergovicon` CLI**
```bash
# Basic validation
bettergovicon validate ./my-icon.svg

# Verbose validation with details
bettergovicon validate ./my-icon.svg --verbose
```

**Option B: Using npm Scripts**
```bash
# Basic validation
npm run icon:validate ./my-icon.svg

# Verbose validation with details
npm run icon:validate ./my-icon.svg --verbose
```

The validator checks for:
- ✅ Proper SVG structure
- ✅ Consistent stroke width (2px recommended)
- ✅ Square viewBox (24x24 recommended)
- ✅ Accessibility attributes
- ✅ Security (no scripts)
- ✅ Performance optimization

#### 📋 **Icon Requirements**

- **Format**: SVG only
- **Size**: 24x24px viewBox (square)
- **Stroke**: 2px consistent stroke width
- **Style**: Clean, minimal, government-appropriate
- **Colors**: Use official government brand colors
- **Accessibility**: Include role="img" and aria-label
- **Permission**: Must have official permission to use government logos

#### 💡 **Example: Adding a DepEd Icon**

Here's a complete example of adding a Department of Education icon:

**Option A: Using `bettergovicon` CLI**
```bash
# 1. Validate your SVG first
bettergovicon validate ./deped-logo.svg

# 2. Add the icon
bettergovicon process ./deped-logo.svg
```

**Option B: Using npm Scripts**
```bash
# 1. Validate your SVG first
npm run icon:validate ./deped-logo.svg

# 2. Add the icon
npm run icon:process ./deped-logo.svg
```

The CLI will ask:
```
? What branch of government is this? Executive Branch
? What is the name of the agency? Department of Education
? What is the official full name? Department of Education
? What is the acronym? DepEd
? What category does this belong to? Cabinet Departments
? Brief description of the icon: Official logo of the Department of Education
? Keywords (comma-separated): deped, education, government, philippines
? Your name (for attribution): Your Name
? Is this an official government logo/symbol? Yes
? Do you have permission to use this logo? Yes
```

The CLI will then:
- ✅ Validate and optimize your SVG
- 🔧 Generate React, Vue, Angular, Web Components, and CSS
- 📝 Create metadata and documentation
- 🔄 Update all index files

### 🎨 Design Guidelines

- **Size**: 24x24px viewBox
- **Stroke**: 2px consistent stroke width
- **Style**: Clean, minimal, government-appropriate
- **Colors**: Use official government brand colors
- **Accessibility**: Ensure good contrast and clarity

### 📋 Pull Request Process

1. **Create Feature Branch**
   ```bash
   git checkout -b feature/new-icon
   ```

2. **Make Changes**
   - Follow coding standards
   - Add tests for new features
   - Update documentation
   - **Include test file**: The CLI automatically generates `test-{icon-name}.html` - include this in your PR for visual verification

3. **Test Your Changes**
   ```bash
   npm run test
   npm run lint
   npm run build
   ```

4. **Submit Pull Request**
   - Use our [PR template](https://github.com/iyanski/better-gov-logos/pull/new?template=feature_request.md)
   - Link related issues
   - Include screenshots for visual changes

### 🏷️ Commit Convention

We use [Conventional Commits](https://conventionalcommits.org/):

```bash
feat: add DepEd icon
fix: correct Supreme Court icon stroke
docs: update installation guide
style: format icon metadata
refactor: optimize SVG files
test: add icon accessibility tests
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Philippine Government**: For official logos and symbols
- **Contributors**: All developers who help improve this library
- **Community**: Users who provide feedback and suggestions

## 📞 Support

- 📧 **Email**: iyanski@github.com
- 💬 **GitHub Discussions**: [Join our community](https://github.com/iyanski/better-gov-logos/discussions)
- 🐛 **Issues**: [GitHub Issues](https://github.com/iyanski/better-gov-logos/issues)
- 📖 **Documentation**: [https://iyanski.github.io/better-gov-logos](https://iyanski.github.io/better-gov-logos/)

## 🌟 Show Your Support

If this project helps you, please give it a ⭐ on GitHub!

---

**Made with ❤️ for the Philippine developer community**
