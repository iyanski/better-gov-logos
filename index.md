---
layout: default
title: "Home"
description: "A comprehensive library of Philippine government icons and symbols for developers"
---

# 🇵🇭 Philippine Government Icons

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
      <PhFlag size={24} />
      <Malacanang size={32} />
      <DepEd size={24} />
    </div>
  );
}
```

#### Vue
```vue
<template>
  <div>
    <PhFlag :size="24" />
    <Malacanang :size="32" />
    <DepEd :size="24" />
  </div>
</template>

<script>
import { PhFlag, Malacanang, DepEd } from '@ph-gov-icons/vue';
</script>
```

#### CSS
```html
<link rel="stylesheet" href="node_modules/@ph-gov-icons/css/ph-gov-icons.css">

<i class="ph-icon ph-icon-flag"></i>
<i class="ph-icon ph-icon-malacanang"></i>
<i class="ph-icon ph-icon-deped"></i>
```

#### Web Components
```html
<script type="module" src="node_modules/@ph-gov-icons/web-components/ph-flag.js"></script>
<script type="module" src="node_modules/@ph-gov-icons/web-components/ph-malacanang.js"></script>

<ph-flag size="24"></ph-flag>
<ph-malacanang size="32"></ph-malacanang>
```

## 🏛️ Icon Categories

### Executive Branch
- **Office of the President**: Malacañang Palace, Presidential Seal
- **Cabinet Departments**: DA, DepEd, DOH, DILG, DSWD, etc.
- **Constitutional Bodies**: COMELEC, COA, CSC, etc.

### Legislative Branch
- **Congress**: Senate, House of Representatives
- **Committees**: Various committee symbols

### Judicial Branch
- **Supreme Court**: SC Seal, Justice symbols
- **Lower Courts**: RTC, MTC, CA symbols

### Local Government
- **Provinces**: Provincial seals and symbols
- **Cities**: City logos and emblems
- **Municipalities**: Municipal symbols

## 📚 Documentation

- 📖 [Full Documentation]({{ '/installation/' | relative_url }})
- 🎨 [Icon Gallery]({{ '/icons/' | relative_url }})
- 💻 [Examples]({{ '/examples/' | relative_url }})
- 🚀 [Getting Started Guide]({{ '/getting-started/' | relative_url }})

## 🤝 Contributing

We welcome contributions! See our [Contributing Guide]({{ '/contributing/' | relative_url }}) for details.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](https://github.com/iyanski/better-gov-logos/blob/main/LICENSE) file for details.
