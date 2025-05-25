import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

import extractorMdc from '@unocss/extractor-mdc'
import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetWind3,
  transformerDirectives,
} from 'unocss'
import presetAnimations from 'unocss-preset-animations'

import mdcEditorPreset from '@unpress/mdc-editor/unocss-preset'
import nuxtLayerPreset from './lib/uno-preset.ts'

const currentDir = dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  presets: [
    presetWind3(),
    presetAttributify(),
    presetIcons({
      scale: 1.2,
      cdn: 'https://esm.sh/',
    }),
    presetTypography(),
    presetAnimations(),
    nuxtLayerPreset(),
    mdcEditorPreset(),
  ],
  extractors: [
    extractorMdc(),
  ],
  transformers: [
    transformerDirectives(),
  ],
  content: {
    filesystem: [
      'content/**/*.md',
      `${join(currentDir, 'content')}/**/*.{md,yaml,yml}`,
    ],
    pipeline: {
      include: [
        // the default
        /\.(vue|svelte|[jt]sx|mdx?|astro|elm|php|phtml|html)($|\?)/,
        // include js/ts files
        'components/ui/**/*.{js,ts}',
        // include css files
        'assets/**/*.css',
        // Need this for layer
        `${join(currentDir, 'components/ui')}/**/*.{js,ts}`,
        `${join(currentDir, 'assets')}/**/*.css`,
      ],
    },
  },
})
