import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

import extractorMdc from '@unocss/extractor-mdc'
import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetUno,
  transformerDirectives,
} from 'unocss'
import presetAnimations from 'unocss-preset-animations'
import { builtinColors, presetShadcn } from 'unocss-preset-shadcn'

import mdcEditorPreset from '@unpress/mdc-editor/unocss-preset'

const currentDir = dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  theme: {
    container: {
      center: true,
      padding: '2rem',
      maxWidth: {
        '2xl': '1400px',
      },
    },
  },
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      scale: 1.2,
      cdn: 'https://esm.sh/',
    }),
    presetTypography(),
    presetAnimations(),
    presetShadcn(builtinColors.map(c => ({ color: c }))),
    mdcEditorPreset(),
  ],
  shortcuts: [
    [/^step$/, () => {
      return `
        [counter-increment:step]
        before:[content:counter(step)] before:absolute before:w-9 before:h-9 before:bg-muted before:rounded-full before:font-mono before:font-medium before:text-center before:text-base before:inline-flex before:items-center before:justify-center before:-indent-px before:border-4 before:border-background
        before:-ml-[50px] before:-mt-1
      `
    }],
  ],
  extractors: [
    extractorMdc(),
  ],
  transformers: [
    transformerDirectives(),
  ],
  content: {
    filesystem: ['content/**/*.md'],
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
  preflights: [
    {
      getCSS: ({ theme }) => {
        const breakpoints = generateBreakpointsCSSVars(theme.breakpoints)

        return `
        :root {
          ${breakpoints}
        }
      `},
    },
  ],
})

type Breakpoints = Record<string, string>
function generateBreakpointsCSSVars(breakpoints: Breakpoints) {
  return Object.entries(breakpoints)
    .map(([key, value]) => {
      return `  --breakpoint-${key}: ${value};`
    })
    .filter(Boolean)
    .join('\n')
}
