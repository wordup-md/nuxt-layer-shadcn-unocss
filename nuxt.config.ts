import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import shadcnModule from './shadcn-module'

const currentDir = dirname(fileURLToPath(import.meta.url))

export default defineNuxtConfig({
  devtools: { enabled: true },

  modules: [
    // '@nuxtjs/tailwindcss',
    '@unocss/nuxt',
    shadcnModule,
    '@vueuse/nuxt',
    '@nuxt/content',
    '@nuxt/image',
    '@nuxt/icon',
    '@nuxtjs/color-mode',
    'nuxt-og-image',
  ],

  shadcn: {
    prefix: 'Ui',
    componentDir: join(currentDir, './components/ui'),
  },

  components: {
    dirs: [
      {
        path: './components',
        ignore: ['**/*.ts'],
      },
    ],
  },

  colorMode: {
    classSuffix: '',
    disableTransition: true,
  },

  css: [
    '@unocss/reset/tailwind.css',
    // join(currentDir, './assets/css/themes.css'),
  ],

  content: {
    documentDriven: true,
    highlight: {
      theme: {
        default: 'github-light',
        dark: 'github-dark',
      },
      preload: ['json', 'js', 'ts', 'html', 'css', 'vue', 'diff', 'shell', 'markdown', 'yaml', 'bash', 'ini'],
    },
    navigation: {
      fields: [
        'icon',
        'navBadges',
        'navTruncate',
        'badges',
        'toc',
        'sidebar',
        'collapse',
        'editLink',
        'prevNext',
        'breadcrumb',
      ],
    },
    experimental: {
      search: {
        indexed: true,
      },
    },
  },
})
