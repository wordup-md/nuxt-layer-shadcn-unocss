# @wordup-md/nuxt-layer-shadcn-unocss

> A beautiful, accessible, and feature-rich Nuxt layer for building documentation sites and content-driven applications with shadcn-vue and UnoCSS.

[![npm version](https://img.shields.io/npm/v/@wordup-md/nuxt-layer-shadcn-unocss)](https://www.npmjs.com/package/@wordup-md/nuxt-layer-shadcn-unocss)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Fork of [shadcn-docs-nuxt](https://github.com/shadcn/shadcn-docs-nuxt) at v0.8.13\
`git diff --name-status 54b80e2e96bbc7249170150fb72e20078629a170`

## ✨ Features

- 🎨 **shadcn-vue Components** - Beautiful, accessible UI components built with Radix Vue
- ⚡ **UnoCSS** - Utility-first CSS framework with instant on-demand compilation
- 📝 **Nuxt Content** - File-based CMS with MDC (Markdown Components) support
- 🌍 **i18n Ready** - Built-in internationalization with `@nuxtjs/i18n`
- 🎭 **Color Mode** - Dark/light mode support with `@nuxtjs/color-mode`
- ♿ **Accessibility** - WCAG compliant components and utilities
- 🔍 **Search** - Full-text search powered by Nuxt Content
- 📱 **Responsive** - Mobile-first design with UnoCSS utilities
- 🎯 **TypeScript** - Full TypeScript support with auto-imports
- 🚀 **Performance** - Optimized for SSR, code-splitting, and fast load times

## 📦 Installation

### Quick Start

1. **Create a new Nuxt project** (if you don't have one):
```bash
npx nuxi@latest init my-docs
cd my-docs
```

2. **Install the layer**:
```bash
pnpm add @wordup-md/nuxt-layer-shadcn-unocss
```

3. **Extend the layer** in your `nuxt.config.ts`:
```ts
export default defineNuxtConfig({
  extends: '@wordup-md/nuxt-layer-shadcn-unocss'
})
```

4. **Start developing**:
```bash
pnpm dev
```

## 🏗️ What's Included

### Modules
- `@nuxt/content` - Content management
- `@nuxt/image` - Image optimization
- `@nuxt/icon` - Icon component
- `@nuxtjs/color-mode` - Color mode switching
- `@nuxtjs/i18n` - Internationalization
- `@unocss/nuxt` - UnoCSS integration
- `shadcn-nuxt` - shadcn-vue components
- `@vueuse/nuxt` - VueUse composables
- `@unpress/nuxt-module` - Content editing capabilities

### Components

#### UI Components (shadcn-vue)
- Accordion, Alert, Avatar, Badge, Breadcrumb
- Button, Card, Checkbox, Collapsible, Combobox
- Command, Dialog, Dropdown Menu, Input, Label
- Navigation Menu, Popover, Scroll Area, Separator
- Sheet, Slider, Table, Tabs, Textarea, Toast

#### Content Components
- Hero, Alert, Badge, Card, Code blocks
- File Tree, Icon, Keyboard shortcuts
- Menu, Steps, Tabs, and more

#### Layout Components
- Header with navigation
- Sidebar with tree navigation
- Footer, Breadcrumb, Table of Contents
- Search dialog, Language switcher
- Dark mode toggle

### Layouts
- **Default** - Standard documentation layout with sidebar and TOC
- **Editorial** - Content-rich layout for articles and marketing pages
- **Blank** - Minimal layout for custom structures

### Composables
- `useConfig()` - Access site configuration
- `useBreadcrumb()` - Breadcrumb navigation
- `useI18nDocs()` - i18n utilities for docs
- `useScrollspy()` - Scroll spy for TOC
- `useThemes()` - Theme management
- `useToast()` - Toast notifications
- And more...

## 🛠️ Development

### Setup

Install dependencies:
```bash
pnpm install
```

### Working on the Layer

The layer is structured like a regular Nuxt project at the root of this repository. The `.playground` directory is used for local development and testing.

**Start development server**:
```bash
pnpm dev
```

This will start the playground at `http://localhost:3000`, which imports and uses the layer.

**Development commands**:
```bash
# Start dev server (playground)
pnpm dev

# Start dev server (root layer)
pnpm dev:root

# Build playground
pnpm build

# Generate static site
pnpm generate

# Preview production build
pnpm preview

# Lint code
pnpm lint

# Build content documentation JSON
pnpm build:json-doc
```

### Manual Publishing

1. **Verify `files` field** in `package.json` (if present) includes all necessary files
2. **Build content documentation** (if needed):
```bash
pnpm build:json-doc
```
3. **Publish to npm**:
```bash
npm publish --access public
```

### After Publishing

Users can install and use your layer:

```bash
npm install @wordup-md/nuxt-layer-shadcn-unocss
```

Then extend it in their `nuxt.config.ts`:
```ts
export default defineNuxtConfig({
  extends: '@wordup-md/nuxt-layer-shadcn-unocss'
})
```

## 🎨 Customization

### Overriding Components

You can override any component by creating a component with the same path in your project. For example, to override the Footer:

```vue
<!-- components/layout/Footer.vue -->
<template>
  <footer class="py-6">
    <div class="container">
      Your custom footer content
    </div>
  </footer>
</template>
```

### Configuration

The layer uses Nuxt's configuration system. You can override module configurations in your `nuxt.config.ts`:

```ts
export default defineNuxtConfig({
  extends: '@wordup-md/nuxt-layer-shadcn-unocss',
  
  // Override i18n config
  i18n: {
    defaultLocale: 'fr',
    locales: ['fr', 'en']
  },
  
  // Override color mode
  colorMode: {
    preference: 'dark'
  }
})
```

## 📚 Documentation

- [Nuxt Documentation](https://nuxt.com)
- [Nuxt Content](https://content.nuxtjs.org)
- [shadcn-vue](https://www.shadcn-vue.com)
- [UnoCSS](https://unocss.dev)
- [VueUse](https://vueuse.org)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- [shadcn-docs-nuxt](https://github.com/shadcn/shadcn-docs-nuxt) - Original inspiration
- [shadcn-vue](https://www.shadcn-vue.com) - UI components
- [Nuxt](https://nuxt.com) - The framework

---

Made with ❤️ by [Emmanuel Salomon](https://github.com/ManUtopiK/) with [WordUp.md](https://wordup.md)
