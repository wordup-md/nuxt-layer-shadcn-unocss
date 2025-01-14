---
title: test
---


::hero
---
actions:
  - name: Get Started
    to: /getting-started
  - name: GitHub
    variant: outline
    to: https://github.com/ZTL-UwU/shadcn-docs-nuxt
    leftIcon: lucide:github
announcement:
  title: Release v1.0.0
  icon: lucide:party-popper
  to: /getting-started
---
#title
Effortless and Beautiful Docs Template.

#description
Beautifully designed Nuxt Content template with shadcn-vue. Customizable. Compatible. Open Source.
::

:read-more{title="Nuxt website" to="/api/composables"}

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

  :::alert
  Alternatively, you can clone or download the template from the [GitHub repo](https://github.com/ZTL-UwU/shadcn-docs-nuxt-starter).
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
