---
title: Test
layout: editorial
header:
  position: over
sidebarRight:
  enable: true
  components:
    - ButtonLink:
        title: GitHub
        variant: outline
        to: https://github.com/wordup-md/nuxt-layer-shadcn-unocss
        icon: lucide:github
        class: w-full
    - Menu:
        title: Menu test
        items:
          - /getting-started
          - title: Menu
            to: /getting-started
            icon: lucide:menu
    - Alert:
        title: New
        to: /getting-started
        icon: lucide:party-popper
navBadges:
  - value: New
    type: new
---

::hero
---
actions:
  - name: Get Started
    to: /getting-started
  - name: GitHub
    variant: outline
    to: https://github.com/wordup-md/nuxt-layer-shadcn-unocss
    leftIcon: lucide:github
announcement:
  title: Release v1.0.0
  icon: lucide:party-popper
  to: /getting-started
class: full-width force-dark
media: https://picsum.photos/id/62/2000/500
mediaPosition: cover
---
#title
Effortless and Beautiful Docs Template.

#description
Beautifully designed Nuxt Content template with shadcn-vue. Customizable. Compatible. Open Source.
::

:read-more{title="Nuxt website" to="/development/composables"}

::steps
### Get Starter Template

  :::code-group
  ```bash [npm]
  npx nuxi@latest init <project-name> -t github:ZTL-UwU/shadcn-docs-nuxt-starter
  ```
  
  ```bash [pnpm]
  pnpm dlx nuxi@latest init <project-name> -t github:ZTL-UwU/shadcn-docs-nuxt-starter
  ```
  
  ```bash [bun]
  bunx nuxi@latest init <project-name> -t github:ZTL-UwU/shadcn-docs-nuxt-starter
  ```
  :::

{{ $doc.title || 'default' }}

  :::alert
  Alternatively, you can clone or download the template from the [GitHub repo](https://github.com/wordup-md/nuxt-layer-shadcn-unocss-starter).
  :::

### Install Dependencies

  :::code-group
  ```bash [npm]
  npm install
  ```
  
  ```bash [pnpm]
  pnpm install
  ```
  
  ```bash [bun]
  bun install
  ```
  :::

### Development Server

  :::code-group
  ```bash [npm]
  npm run dev -- -o
  ```
  
  ```bash [pnpm]
  pnpm dev -o
  ```
  
  ```bash [bun]
  bun run dev -o
  ```
  :::
::
