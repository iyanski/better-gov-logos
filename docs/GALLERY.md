# Gallery Documentation

## Overview

The Gallery feature provides a comprehensive, interactive view of all Philippine government icons in the library. It's automatically generated from the CLI's list functionality and provides search, filtering, and copy-to-clipboard capabilities.

## Features

### 🎨 Visual Gallery
- **Organized by Branch**: Icons are grouped by government branch (Executive, Legislative, Judicial)
- **Category Filtering**: Filter icons by category (departments, agencies, etc.)
- **Search Functionality**: Search by name, acronym, or description
- **Responsive Design**: Works on all device sizes

### 📊 Statistics Dashboard
- **Total Icons**: Shows the complete count of available icons
- **Branch Count**: Number of government branches covered
- **Category Count**: Number of different categories

### 🔧 Interactive Features
- **Copy to Clipboard**: One-click copying of import statements
- **Icon Details**: View detailed information about each icon
- **Real-time Filtering**: Instant search and filter results
- **Hover Effects**: Visual feedback for better UX

## Data Generation

The Gallery is powered by the `gallery-data.json` file, which is automatically generated using:

```bash
npm run gallery:generate
```

This command:
1. Runs the CLI's `list-icons` command with JSON output
2. Organizes the data by branch and category
3. Calculates statistics
4. Generates the `docs/gallery-data.json` file

## File Structure

```
docs/
├── index.html              # Main documentation page with Gallery
├── gallery-data.json       # Generated icon data (auto-generated)
├── GALLERY.md             # This documentation
└── ...
```

## Integration with CLI

The Gallery seamlessly integrates with the existing CLI workflow:

1. **Add Icons**: Use `npm run icon:add` to add new icons
2. **Generate Gallery**: Run `npm run gallery:generate` to update the Gallery
3. **View Results**: The Gallery automatically reflects new icons

## Customization

### Styling
The Gallery uses inline styles for easy customization. Key classes:
- `.icon-card`: Individual icon containers
- `.gallery-branch`: Branch grouping sections
- `.icon-grid`: Grid layout for icons

### Functionality
The Gallery JavaScript is self-contained in `index.html` and includes:
- `initializeGallery()`: Loads and displays icon data
- `displayIcons()`: Renders the icon grid
- `setupSearchAndFilters()`: Handles search and filtering
- `copyIconCode()`: Copy functionality

## Future Enhancements

- **Visual Previews**: Display actual SVG icons instead of placeholders
- **Usage Examples**: Show code examples for each framework
- **Download Options**: Allow downloading individual icons
- **Advanced Filtering**: Filter by tags, author, or version
- **Sorting Options**: Sort by name, date, or popularity

## Troubleshooting

### No Icons Displayed
- Ensure icons exist in `packages/core/icons/`
- Run `npm run gallery:generate` to update the data
- Check browser console for JavaScript errors

### Gallery Not Loading
- Verify `gallery-data.json` exists in the `docs/` directory
- Check that the file contains valid JSON
- Ensure the web server can serve the JSON file

### Search/Filter Issues
- Clear browser cache and reload
- Check that the JavaScript is loading correctly
- Verify the JSON data structure matches expectations
