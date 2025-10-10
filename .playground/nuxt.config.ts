import { fileURLToPath } from 'node:url'

export default defineNuxtConfig({
  extends: ['..'],
  modules: [
    '@nuxt/eslint',
    '@unpress/nuxt-module',
    // '../../../unpress/packages/nuxt-module/src/module',
  ],

  css: [
    '~/assets/style.css',
  ],

  compatibilityDate: '2025-01-10',

  // vite: {
  //   server: {
  //     fs: {
  //       allow: [
  //         // Always allow the project root
  //         fileURLToPath(new URL('.', import.meta.url)),
  //         // Allow the parent directory (for monorepos)
  //         fileURLToPath(new URL('../../..', import.meta.url)),
  //         // Add any other custom paths you need
  //       ],
  //     },
  //   },
  //   optimizeDeps: {
  //     include: ['extend', 'debug'],
  //   },
  // },

  eslint: {
    config: {
      // Use the generated ESLint config for lint root project as well
      rootDir: fileURLToPath(new URL('..', import.meta.url)),
    },
  },

  i18n: {
    defaultLocale: 'fr',
  },

  unocss: {
    nuxtLayers: true,
  },

  unpress: {
    autoMountIfDevMode: false,
    allowMountWithoutLogin: true,
  },
})
