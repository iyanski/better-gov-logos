---
layout: default
title: "Installation"
description: "Installation guide for Philippine Government Icons"
permalink: /installation/
---

# 📦 Installation

Choose the package that fits your project:

## React

```bash
npm install @ph-gov-icons/react
```

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

## Vue

```bash
npm install @ph-gov-icons/vue
```

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

## Angular

```bash
npm install @ph-gov-icons/angular
```

```typescript
import { PhFlagComponent, MalacanangComponent, DepEdComponent } from '@ph-gov-icons/angular';

@Component({
  selector: 'app-root',
  template: `
    <ph-flag [size]="24"></ph-flag>
    <ph-malacanang [size]="32"></ph-malacanang>
    <ph-deped [size]="24"></ph-deped>
  `
})
export class AppComponent {}
```

## CSS

```bash
npm install @ph-gov-icons/css
```

```html
<link rel="stylesheet" href="node_modules/@ph-gov-icons/css/ph-gov-icons.css">

<i class="ph-icon ph-icon-flag"></i>
<i class="ph-icon ph-icon-malacanang"></i>
<i class="ph-icon ph-icon-deped"></i>
```

## Web Components

```bash
npm install @ph-gov-icons/web-components
```

```html
<script type="module" src="node_modules/@ph-gov-icons/web-components/ph-flag.js"></script>
<script type="module" src="node_modules/@ph-gov-icons/web-components/ph-malacanang.js"></script>

<ph-flag size="24"></ph-flag>
<ph-malacanang size="32"></ph-malacanang>
```

## Svelte

```bash
npm install @ph-gov-icons/svelte
```

```svelte
<script>
  import { PhFlag, Malacanang, DepEd } from '@ph-gov-icons/svelte';
</script>

<PhFlag size={24} />
<Malacanang size={32} />
<DepEd size={24} />
```
