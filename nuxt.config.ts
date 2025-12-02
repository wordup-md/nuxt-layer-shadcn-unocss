import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const currentDir = dirname(fileURLToPath(import.meta.url))

export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@unocss/nuxt',
    'shadcn-nuxt',
    '@vueuse/nuxt',
    '@nuxt/content',
    '@nuxt/image',
    '@nuxt/icon',
    '@nuxtjs/color-mode',
    '@nuxtjs/i18n',
    '@nuxtjs/robots',
    // 'nuxt-og-image',
  ],

  $env: {
    production: {
      modules: [
        '@unpress/nuxt-module',
      ],
    },

    unpress: {
      modules: [
        '../../../unpress/packages/nuxt-module/src/module',
      ],
      alias: {
        '@unpress/mdc-editor': r('../../unpress/packages/mdc-editor/src/module'),
        '@unpress/nuxt-module': r('../../unpress/packages/nuxt-module/src/module'),
      },
      vite: {
        server: {
          fs: {
            allow: [
            // Allow serving files from the project root
              currentDir,
              // Allow serving files from the monorepo root (parent directories)
              resolve(currentDir, '../../..'),
            ],
          },
        },
      },
    },
  },

  components: {
    dirs: [
      {
        path: join(currentDir, './components'),
        ignore: ['**/*.ts'],
      },
    ],
  },

  devtools: { enabled: true },

  css: [
    '@unocss/reset/tailwind.css',
    join(currentDir, './assets/css/a11y.css'),
    join(currentDir, './assets/css/mdc-editor.css'),
  ],

  colorMode: {
    classSuffix: '',
    disableTransition: true,
  },

  content: {
    documentDriven: true,
    highlight: {
      theme: {
        default: 'one-dark-pro',
        dark: 'one-dark-pro',
      },
      preload: ['json', 'js', 'ts', 'html', 'css', 'vue', 'diff', 'shell', 'markdown', 'yaml', 'bash', 'ini'],
    },
    navigation: {
      fields: [
        'description',
        'icon',
        'media',
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

  build: {
    transpile: ['shiki', 'ohash'],
  },

  routeRules: {
    '/': { prerender: true },
    // Admin dashboard renders only on client-side
    // '/admin/**': { ssr: false },
  },

  sourcemap: {
    server: true,
    client: true,
  },

  compatibilityDate: '2025-01-10',

  nitro: {
    compressPublicAssets: {
      gzip: true,
      brotli: true,
    },
  },

  eslint: {
    config: {
      stylistic: {
        quotes: 'single',
        semi: false,
      },
    },
  },

  i18n: {
    defaultLocale: 'en',
    bundle: {
      optimizeTranslationDirective: false,
    },
    strategy: 'prefix_except_default',
  },

  icon: {
    componentName: 'NuxtIcon',
  },

  shadcn: {
    prefix: 'Ui',
    componentDir: join(currentDir, './components/ui'),
  },
})

function r(p: string) {
  return resolve(__dirname, p)
}
