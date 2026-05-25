# LMS.uz Landing Page - Vue 3

Modern landing page for LMS.uz built with Vue 3 and Vite.

## 🚀 Tech Stack

- **Vue 3** - Progressive JavaScript framework
- **Vite** - Next generation frontend tooling
- **CSS3** - Custom animations and transitions
- **Intersection Observer API** - Scroll-based animations

## 📦 Project Structure

```
lms-landing-new/
├── public/
│   └── images/          # All images and logos
├── src/
│   ├── assets/
│   │   ├── styles.css       # Main stylesheet
│   │   └── animations.css   # Custom animations
│   ├── components/
│   │   ├── NavBar.vue
│   │   ├── Hero.vue
│   │   ├── UniversityCarousel.vue
│   │   ├── AISection.vue
│   │   ├── PlatformSection.vue
│   │   ├── ProctoringSection.vue
│   │   ├── AnalyticsSection.vue
│   │   ├── IntegrationsSection.vue
│   │   ├── MobileSection.vue
│   │   ├── WorkflowsSection.vue
│   │   └── CTASection.vue
│   ├── composables/
│   │   └── useScrollAnimation.js
│   ├── App.vue
│   └── main.js
├── old-html-version/    # Backup of original HTML version
├── index.html
├── netlify.toml         # Netlify deployment config
├── package.json
├── vite.config.js
└── README.md
```

## 🛠️ Development

### Prerequisites

- Node.js 18+ and npm

### Install Dependencies

```bash
npm install
```

### Run Development Server

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The build output will be in the `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

## 🎨 Features

- ✅ Fully responsive design
- ✅ Smooth scroll animations with Intersection Observer
- ✅ Component-based architecture
- ✅ Optimized performance with Vite
- ✅ Custom CSS animations for integrations
- ✅ SEO-friendly structure
- ✅ Ready for Netlify deployment

## 📝 Components Overview

| Component | Description |
|-----------|-------------|
| NavBar | Sticky navigation header |
| Hero | Main hero section with smooth scroll CTA |
| UniversityCarousel | Partner universities carousel |
| AISection | AI features and capabilities |
| PlatformSection | LMS platform modules with vertical carousel |
| ProctoringSection | Proctoring vendors and features |
| AnalyticsSection | Reports and analytics dashboard |
| IntegrationsSection | System integrations with animations |
| MobileSection | Mobile app features |
| WorkflowsSection | Advanced academic workflows |
| CTASection | Final call-to-action with contact |

## 🚢 Deployment

### Netlify (Recommended)

1. Push your code to GitHub
2. Connect your repository to Netlify
3. Netlify will automatically detect build settings from `netlify.toml`
4. Your site will be deployed automatically

### Manual Deployment

```bash
npm run build
# Upload the dist/ folder to your hosting provider
```

## 🔄 Migration from HTML

This Vue version was migrated from the original HTML/CSS version and preserves:
- ✅ All original design and styling
- ✅ All animations and transitions
- ✅ Complete visual appearance
- ✅ All content and structure

The original HTML version is backed up in `old-html-version/` folder.

## 🎯 Key Improvements Over Plain HTML

1. **Component Reusability** - Modular components for easier maintenance
2. **Better Performance** - Vite's hot module replacement and optimized builds
3. **Reactive Data** - Easy to add dynamic content in the future
4. **Developer Experience** - Better tooling, debugging, and IDE support
5. **Scalability** - Easy to add new sections, routing, or state management
6. **Future-Ready** - Can easily add TypeScript, Pinia, Vue Router, etc.

## 📄 License

© 2024 LMS.uz - All rights reserved
