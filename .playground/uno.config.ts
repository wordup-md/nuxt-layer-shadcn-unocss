import { mergeConfigs } from '@unocss/core'
import config from './.nuxt/uno.config.mjs'

export default mergeConfigs([config, {
  safelist: ['rotate-x-180', 'translate-y-1'],
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
