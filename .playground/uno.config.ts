import { mergeConfigs } from '@unocss/core'
import { builtinColors, presetShadcn } from 'unocss-preset-shadcn'
import config from './.nuxt/uno.config.mjs'

export default mergeConfigs([config, {
  // your overrides
  presets: [presetShadcn(builtinColors.map(c => ({ color: c })))],
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
