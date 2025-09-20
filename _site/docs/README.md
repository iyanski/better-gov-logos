# 🇵🇭 Philippine Government Icons - Documentation Site

This directory contains the GitHub Pages documentation site for the Philippine Government Icons library.

## 📁 Structure

```
docs/
├── index.html          # Main documentation page
├── styles.css          # CSS styles for the site
├── script.js           # JavaScript functionality
├── icons.json          # Generated icon data (auto-generated)
└── README.md           # This file
```

## 🚀 Features

- **Responsive Design**: Works on desktop, tablet, and mobile
- **Interactive Icon Gallery**: Filter icons by branch and category
- **Framework Examples**: Code samples for React, Vue, Angular, Svelte, CSS, and Web Components
- **Copy-to-Clipboard**: Easy copying of code examples
- **Search Functionality**: Find icons quickly
- **Auto-Generated Data**: Icon information is automatically generated from the library

## 🛠️ Development

### Local Development

1. **Generate icon data**:
   ```bash
   npm run website:generate
   ```

2. **Serve locally**:
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js
   npx serve docs
   
   # Using PHP
   php -S localhost:8000 -t docs
   ```

3. **Open in browser**:
   ```
   http://localhost:8000
   ```

### Adding New Icons

When you add new icons using the CLI tool, the website data is automatically updated:

```bash
# Add a new icon
bettergovicon process new-icon.svg

# Generate updated website data
npm run website:generate
```

## 📊 Data Generation

The `icons.json` file is automatically generated from the icon library and contains:

- **Icon Metadata**: Name, acronym, description, keywords
- **Branch/Category Info**: Government branch and category
- **Statistics**: Total count, breakdown by branch/category
- **Author Info**: Creator and version information

## 🎨 Customization

### Styling

Edit `styles.css` to customize the appearance:

- **Colors**: Update CSS variables for brand colors
- **Typography**: Modify font families and sizes
- **Layout**: Adjust grid layouts and spacing
- **Components**: Customize button styles, cards, etc.

### Content

Edit `index.html` to update:

- **Hero Section**: Main headline and description
- **Features**: Key benefits and features
- **Installation**: Framework-specific examples
- **Contributing**: How to contribute to the project

### Functionality

Edit `script.js` to add:

- **New Interactions**: Additional JavaScript functionality
- **API Integration**: Connect to external services
- **Analytics**: Add tracking and analytics
- **Search**: Enhanced search capabilities

## 🌐 Deployment

The site is automatically deployed to GitHub Pages when changes are pushed to the main branch.

### Manual Deployment

1. **Generate data**:
   ```bash
   npm run website:build
   ```

2. **Commit changes**:
   ```bash
   git add docs/
   git commit -m "Update documentation site"
   git push origin main
   ```

3. **GitHub Pages will automatically deploy** the changes

### Custom Domain

To use a custom domain:

1. Create a `CNAME` file in the `docs/` directory
2. Add your domain name to the file
3. Configure DNS settings to point to GitHub Pages

## 📱 Mobile Optimization

The site is fully responsive and optimized for mobile devices:

- **Touch-friendly**: Large buttons and touch targets
- **Fast Loading**: Optimized images and minimal JavaScript
- **Readable**: Appropriate font sizes and spacing
- **Navigation**: Mobile-friendly menu and navigation

## 🔍 SEO Optimization

The site includes:

- **Meta Tags**: Open Graph and Twitter Card support
- **Structured Data**: JSON-LD for search engines
- **Semantic HTML**: Proper heading hierarchy and structure
- **Performance**: Optimized loading and rendering

## 🛡️ Security

- **HTTPS Only**: All content served over HTTPS
- **No External Dependencies**: Self-contained CSS and JavaScript
- **Content Security Policy**: Configured for security
- **No Tracking**: Privacy-focused, no analytics by default

## 📈 Analytics

To add analytics, update `script.js`:

```javascript
// Google Analytics
gtag('config', 'GA_MEASUREMENT_ID');

// Or other analytics providers
```

## 🤝 Contributing

To improve the documentation site:

1. **Fork the repository**
2. **Make your changes** to the docs folder
3. **Test locally** using the development setup
4. **Submit a pull request** with your improvements

## 📄 License

The documentation site is part of the Philippine Government Icons project and follows the same MIT license.
