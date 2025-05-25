import { mergeConfigs } from '@unocss/core'
import config from './.nuxt/uno.config.mjs'

export default mergeConfigs([config, {
  // your overrides
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
