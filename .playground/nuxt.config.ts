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

  eslint: {
    config: {
      // Use the generated ESLint config for lint root project as well
      rootDir: fileURLToPath(new URL('..', import.meta.url)),
    },
  },

  unocss: {
    nuxtLayers: true,
  },

  unpress: {
    // autoMountIfDevMode: false,
  },
})
