import { definePreset } from 'unocss'
import { builtinColors, presetShadcn } from 'unocss-preset-shadcn'

type MyPresetOptions = {
  colors?: typeof builtinColors
}

export default definePreset((options?: MyPresetOptions) => {
  const colors = options?.colors ?? builtinColors

  const shadcn = presetShadcn(colors.map(c => ({ color: c })), { componentLibrary: 'reka' })

  return {
    name: 'nuxt-layer-unocss-preset-shadcn',
    theme: {
      container: {
        center: true,
        maxWidth: {
          '2xl': 'var(--breakpoint-container)',
        },
      },
      colors: {
        ...shadcn.theme?.colors,
        info: {
          DEFAULT: 'hsl(var(--info))',
          foreground: 'hsl(var(--info-foreground))',
        },
        warning: {
          DEFAULT: 'hsl(var(--warning))',
          foreground: 'hsl(var(--warning-foreground))',
        },
        success: {
          DEFAULT: 'hsl(var(--success))',
          foreground: 'hsl(var(--success-foreground))',
        },
        danger: {
          DEFAULT: 'hsl(var(--danger))',
          foreground: 'hsl(var(--danger-foreground))',
        },
        new: {
          DEFAULT: 'hsl(var(--new))',
          foreground: 'hsl(var(--new-foreground))',
        },
      },
      borderRadius: {
        ...shadcn.theme?.borderRadius,
      },
      // animation: {
      //   keyframes: {
      //     'collapsible-down': '{from{height: 0}to{height:var(--reka-collapsible-content-height)}}',
      //     'collapsible-up': '{from{height:var(--reka-collapsible-content-height)}to{height: 0}}',
      //     'fadeIn': '{from{ opacity: 0 }to{ opacity: 1 }}',
      //     'fadeOut': '{from{ opacity: 1 }to{ opacity: 0 }}',
      //   },
      //   durations: {
      //     'collapsible-down': '0.2s',
      //     'collapsible-up': '0.2s',
      //     'fadeIn': '0.2s',
      //     'fadeOut': '0.2s',
      //   },
      //   timingFns: {
      //     'collapsible-down': 'ease-in-out',
      //     'collapsible-up': 'ease-in-out',
      //     'fadeIn': 'ease-out',
      //     'fadeOut': 'ease-out',
      //   },
      // },
    },
    rules: [
      ...(shadcn.rules ?? []),
    ],
    // variants: [
    // ],
    shortcuts: [
      [/^step$/, () => {
        return `
          [counter-increment:step]
          before:[content:counter(step)] before:absolute before:w-9 before:h-9 before:bg-muted before:rounded-full before:font-mono before:font-medium before:text-center before:text-base before:inline-flex before:items-center before:justify-center before:-indent-px before:border-4 before:border-background
          before:-ml-[50px] before:-mt-1
        `
      }],
    ],
    preflights: [
      {
        getCSS: () => addForceLightAndDark((shadcn.preflights?.[0] as unknown as { getCSS: () => string }).getCSS() ?? ''),
      },
      {
        getCSS: ({ theme }) => {
          const breakpoints = generateBreakpointsCSSVars(theme.breakpoints!)

          return `
          :root {
            ${breakpoints}
            --breakpoint-container: 1200px;

            --info: 200 90% 50%;
            --info-foreground: 200 90% 50%;
            --warning: 42.4 100% 50%;
            --warning-foreground: 42.4 100% 50%;
            --success: 94.5 100% 39.6%;
            --success-foreground: 94.5 100% 39.6%;
            --danger: 358.3 100% 64.9%;
            --danger-foreground: 358.3 100% 64.9%;
            --new: 81 96% 55%;
            --new-foreground: 81 96% 15%;
          }
        `
        },
      },
    ],
  }
})

function addForceLightAndDark(css: string) {
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

function generateBreakpointsCSSVars(breakpoints: Record<string, string>) {
  return Object.entries(breakpoints)
    .map(([key, value]) => {
      return `  --breakpoint-${key}: ${value};`
    })
    .filter(Boolean)
    .join('\n')
}
