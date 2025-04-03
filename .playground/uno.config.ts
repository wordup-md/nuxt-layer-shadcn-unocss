import { mergeConfigs } from '@unocss/core'
import { builtinColors, presetShadcn } from 'unocss-preset-shadcn'
import config from './.nuxt/uno.config.mjs'

// console.log(presetShadcn(builtinColors.map(c => ({ color: c }))).preflights[0].getCSS())

const mockPreset = () => {
  const mock = presetShadcn(builtinColors.map(c => ({ color: c })))

  return {
    ...mock,
    preflights: [
      {
        getCSS: () => transformCSS((mock.preflights?.[0] as unknown as { getCSS: () => string })?.getCSS() ?? ''),
      },
    ],
  }
}

function transformCSS(css: string) {
  const themeRegex = /^(\.theme-\w+)\s*{/gm
  const darkThemeRegex = /^(\.dark\s+\.theme-(\w+))\s*{/gm

  css = css.replace(themeRegex, (match, p1) => `${p1}, ${p1} .force-light {`)
  css = css.replace(darkThemeRegex, (match, p1, p2) => `${p1}, .theme-${p2} .force-dark {`)

  css += `
    .force-light, .force-dark {
      color: hsl(var(--foreground));
      background: hsl(var(--background));
    }
    .force-light .shiki span {
      color: var(--shiki-default);
    }
    .force-dark .shiki span {
      color: var(--shiki-dark);
    }
  `
  return css
}

export default mergeConfigs([config, {
  // your overrides
  presets: [mockPreset()],
  // presets: [
  //   presetShadcn({
  //     color: {
  //       base: 'green',
  //       // light: {
  //       //   primary: '10 10% 100%',
  //       // },
  //     },
  //   }),
  // ],
}])
