# 🇵🇭 Philippine Government Icons

[![npm version](https://badge.fury.io/js/%40ph-gov-icons%2Fcore.svg)](https://badge.fury.io/js/%40ph-gov-icons%2Fcore)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com)
[![Build Status](https://github.com/your-org/better-gov-logos/workflows/CI/badge.svg)](https://github.com/your-org/better-gov-logos/actions)

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

Choose the package that fits your project:

```bash
# For React projects
npm install @ph-gov-icons/react

# For Vue projects
npm install @ph-gov-icons/vue

# For CSS/HTML projects
npm install @ph-gov-icons/css

# For Angular projects
npm install @ph-gov-icons/angular

# For Web Components
npm install @ph-gov-icons/web-components
```

### Usage Examples

#### React
```tsx
import { PhFlag, Malacanang, DepEd } from '@ph-gov-icons/react';

function App() {
  return (
    <div>
      <PhFlag size={24} color="#0033A0" />
      <Malacanang size={32} />
      <DepEd size={24} color="#1B5E20" />
    </div>
  );
}
```

#### Vue
```vue
<template>
  <div>
    <PhFlag :size="24" color="#0033A0" />
    <Malacanang :size="32" />
    <DepEd :size="24" color="#1B5E20" />
  </div>
</template>

<script setup>
import { PhFlag, Malacanang, DepEd } from '@ph-gov-icons/vue';
</script>
```

#### CSS
```html
<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@ph-gov-icons/css@latest/ph-gov-icons.css">
</head>
<body>
  <i class="ph-icon ph-icon-ph-flag"></i>
  <i class="ph-icon ph-icon-malacanang"></i>
  <i class="ph-icon ph-icon-deped"></i>
</body>
</html>
```

#### Web Components
```html
<ph-icon name="ph-flag" size="24" color="#0033A0"></ph-icon>
<ph-icon name="malacanang" size="32"></ph-icon>
<ph-icon name="deped" size="24" color="#1B5E20"></ph-icon>
```

## 📚 Documentation

- 📖 [Full Documentation](https://ph-gov-icons.dev/docs)
- 🎨 [Icon Gallery](https://ph-gov-icons.dev/icons)
- 💻 [Examples](https://ph-gov-icons.dev/examples)
- 🚀 [Getting Started Guide](https://ph-gov-icons.dev/docs/getting-started)

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
import { PhFlag } from '@ph-gov-icons/react';

// ❌ Avoid - imports entire library
import * as PhIcons from '@ph-gov-icons/react';
```

### Custom Styling
```tsx
<PhFlag 
  size={24} 
  color="#0033A0" 
  className="custom-icon"
  style={{ filter: 'drop-shadow(2px 2px 4px rgba(0,0,0,0.3))' }}
/>
```

### Dynamic Icons
```tsx
const iconMap = {
  'ph-flag': PhFlag,
  'malacanang': Malacanang,
  'deped': DepEd
};

const IconComponent = iconMap[iconName];
return <IconComponent size={24} />;
```

## 🤝 Contributing

We welcome contributions from the community! Here's how you can help:

### 🐛 Reporting Issues
- Use our [issue template](https://github.com/your-org/better-gov-logos/issues/new?template=bug_report.md)
- Include screenshots and steps to reproduce
- Check existing issues before creating new ones

### 💡 Suggesting New Icons
- Use our [icon request template](https://github.com/your-org/better-gov-logos/issues/new?template=icon_request.md)
- Provide official government sources
- Include context about the agency/department

### 🔧 Development Setup

1. **Fork and Clone**
   ```bash
   git clone https://github.com/your-username/better-gov-logos.git
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

### 📝 Adding New Icons

We've made it super easy to add new government icons using our CLI tool! Here are two ways to contribute:

#### 🚀 **Easy Way: Using the CLI Tool (Recommended)**

1. **Prepare Your SVG**
   - Ensure your SVG follows our [design guidelines](#design-guidelines)
   - Make sure you have permission to use the government logo

2. **Add the Icon**
   ```bash
   # Using yarn (recommended)
   yarn icon:add path/to/your-icon.svg
   
   # Or using npm
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
   yarn icon:generate
   ```

4. **Update Documentation**
   - Add to icon gallery
   - Include usage examples

#### 🔧 **CLI Tool Commands**

Our CLI tool provides several helpful commands:

```bash
# Add a new icon (interactive)
yarn icon:add path/to/icon.svg

# Validate an SVG before adding
yarn icon:validate path/to/icon.svg

# List all existing icons
yarn icon:list

# Generate components for all icons
yarn icon:generate

# Initialize project structure
yarn icon:init
```

#### ✅ **SVG Validation**

Before adding an icon, you can validate it:

```bash
# Basic validation
yarn icon:validate ./my-icon.svg

# Verbose validation with details
yarn icon:validate ./my-icon.svg --verbose
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

```bash
# 1. Validate your SVG first
yarn icon:validate ./deped-logo.svg

# 2. Add the icon
yarn icon:add ./deped-logo.svg
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

3. **Test Your Changes**
   ```bash
   npm run test
   npm run lint
   npm run build
   ```

4. **Submit Pull Request**
   - Use our [PR template](https://github.com/your-org/better-gov-logos/pull/new?template=feature_request.md)
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

- 📧 **Email**: support@ph-gov-icons.dev
- 💬 **Discord**: [Join our community](https://discord.gg/ph-gov-icons)
- 🐛 **Issues**: [GitHub Issues](https://github.com/your-org/better-gov-logos/issues)
- 📖 **Documentation**: [ph-gov-icons.dev](https://ph-gov-icons.dev)

## 🌟 Show Your Support

If this project helps you, please give it a ⭐ on GitHub!

---

**Made with ❤️ for the Philippine developer community**
