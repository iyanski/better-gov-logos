# Philippine Government Icons CLI

A command-line tool for managing Philippine government icons in the library.

## Installation

```bash
npm install -g @ph-gov-icons/cli
```

## Usage

### Add a New Icon

```bash
bettergovicon add path/to/icon.svg
```

This will:
1. Validate the SVG file
2. Ask interactive questions about the icon
3. Optimize the SVG
4. Generate components for all frameworks
5. Update index files

### Validate an Icon

```bash
bettergovicon validate path/to/icon.svg
```

### List All Icons

```bash
bettergovicon list
```

### Generate Components

```bash
bettergovicon generate
```

## Interactive Questions

When adding an icon, the CLI will ask:

1. **Government Branch**: Executive, Legislative, Judicial, Constitutional, Local, GOCC, or Other
2. **Agency Name**: Short name of the agency
3. **Official Name**: Full official name
4. **Acronym**: Official acronym
5. **Category**: Specific category within the branch
6. **Description**: Brief description
7. **Keywords**: Comma-separated keywords
8. **Official Website**: Optional URL
9. **Author**: Your name for attribution
10. **Permission**: Confirmation of usage rights

## Examples

### Adding DepEd Icon

```bash
bettergovicon add ./deped-logo.svg
```

### Validating Icon

```bash
bettergovicon validate ./icon.svg --verbose
```

### Listing Icons by Category

```bash
bettergovicon list --category executive
```

## Options

### Add Command
- `--interactive`: Run in interactive mode (default)
- `--yes`: Skip confirmation prompts
- `--dry-run`: Show what would be created without making changes

### Validate Command
- `--verbose`: Show detailed validation results

### List Command
- `--category <category>`: Filter by category
- `--tags <tags>`: Filter by tags (comma-separated)
- `--format <format>`: Output format (table, json, csv)

### Generate Command
- `--frameworks <frameworks>`: Frameworks to generate (react,vue,angular,web-components)
- `--force`: Force regeneration of existing components

## Development

```bash
# Install dependencies
npm install

# Build the CLI
npm run build

# Run in development
npm run dev

# Test
npm test
```
