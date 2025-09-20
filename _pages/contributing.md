---
layout: default
title: "Contributing"
description: "How to contribute to Philippine Government Icons"
permalink: /contributing/
---

# 🤝 Contributing

We welcome contributions to the Philippine Government Icons library! Here's how you can help.

## Ways to Contribute

### 🎨 Add New Icons
- Submit SVG files of government agencies
- Follow our design guidelines
- Include proper metadata

### 🐛 Report Issues
- Bug reports
- Feature requests
- Documentation improvements

### 📝 Improve Documentation
- Fix typos
- Add examples
- Improve clarity

### 🔧 Code Contributions
- Fix bugs
- Add features
- Improve performance

## Getting Started

### Prerequisites
- Node.js 18+ and npm
- Git
- Basic knowledge of SVG

### Setup
```bash
# Fork and clone the repository
git clone https://github.com/your-username/better-gov-logos.git
cd better-gov-logos

# Install dependencies
npm install

# Install CLI tool
npm run cli:install
```

## Adding New Icons

### Option 1: Using CLI Tool (Recommended)

```bash
# Process an SVG file
bettergovicon process your-icon.svg

# Or add with prompts
bettergovicon add your-icon.svg
```

### Option 2: Manual Process

1. **Prepare your SVG**:
   - Clean, vector format
   - 24x24px viewBox
   - Optimized paths
   - No embedded images

2. **Add to appropriate directory**:
   ```
   packages/core/icons/
   ├── executive/
   │   ├── office-of-the-president/
   │   └── cabinet-departments/
   ├── legislative/
   ├── judicial/
   └── local-government/
   ```

3. **Create metadata file**:
   ```json
   {
     "name": "icon-name",
     "acronym": "ABC",
     "displayName": "Agency Name",
     "branch": "executive",
     "category": "cabinet-departments",
     "description": "Description of the agency",
     "keywords": ["keyword1", "keyword2"]
   }
   ```

4. **Generate components**:
   ```bash
   bettergovicon generate
   ```

## Design Guidelines

### SVG Requirements
- **Format**: SVG with clean paths
- **Size**: 24x24px viewBox
- **Colors**: Monochrome (black fill)
- **Optimization**: Remove unnecessary elements
- **Accessibility**: Include proper metadata

### Naming Conventions
- **Files**: `agency-name.svg` (kebab-case)
- **Components**: `AgencyName` (PascalCase)
- **CSS Classes**: `ph-icon-agency-name` (kebab-case)
- **Web Components**: `ph-agency-name` (kebab-case)

### Quality Standards
- **Vector format**: No raster images
- **Clean paths**: Optimized and minimal
- **Consistent style**: Match existing icons
- **Accessibility**: WCAG 2.1 AA compliant

## Pull Request Process

### Before Submitting
1. **Test your changes**:
   ```bash
   # Validate SVG
   bettergovicon validate your-icon.svg
   
   # Test components
   bettergovicon generate
   ```

2. **Include test file**: The CLI generates a test file - include it in your PR

3. **Update documentation**: Add your icon to the appropriate category

### PR Template
```markdown
## Description
Brief description of changes

## Type of Change
- [ ] New icon
- [ ] Bug fix
- [ ] Documentation
- [ ] Feature

## Testing
- [ ] SVG validates
- [ ] Components generate correctly
- [ ] Test file included
- [ ] All frameworks work

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Documentation updated
- [ ] No breaking changes
```

## Code of Conduct

### Our Pledge
We are committed to providing a welcoming and inclusive environment for all contributors.

### Expected Behavior
- Use welcoming and inclusive language
- Respect different viewpoints and experiences
- Accept constructive criticism gracefully
- Focus on what's best for the community

### Unacceptable Behavior
- Harassment or discrimination
- Trolling or inflammatory comments
- Personal attacks
- Inappropriate language or imagery

## Getting Help

### Resources
- **Documentation**: [Full docs]({{ '/' | relative_url }})
- **Issues**: [GitHub Issues](https://github.com/iyanski/better-gov-logos/issues)
- **Discussions**: [GitHub Discussions](https://github.com/iyanski/better-gov-logos/discussions)

### Contact
- **Email**: support@ph-gov-icons.dev
- **GitHub**: [@iyanski](https://github.com/iyanski)

## Recognition

Contributors will be recognized in:
- **README**: Listed as contributors
- **Release notes**: Mentioned in releases
- **Documentation**: Credited for their work

Thank you for contributing to the Philippine Government Icons library! 🇵🇭
