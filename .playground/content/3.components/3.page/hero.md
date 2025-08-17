---
title: Hero
icon: i-lucide:layout-panel-top
badges:
  - value: Source
    icon: lucide:code
    to: https://github.com/wordup-md/nuxt-layer-shadcn-unocss/blob/main/components/content/Hero.vue
    target: _blank
---

## Usage

::stack
  ::div{class="p-4"}
    ::hero
    ---
    announcement:
      title: 'Release v1.0.0'
      icon: 'lucide:party-popper'
      to: /getting-started
    actions:
      - name: Get Started
        to: /getting-started
      - name: GitHub
        variant: outline
        to: https://github.com/wordup-md/nuxt-layer-shadcn-unocss
        leftIcon: 'lucide:github'
    ---

    #title
    Effortless and Beautiful :br Docs Template.

    #description
    Beautifully designed Nuxt Content template with shadcn-vue. :br Customizable. Compatible. Open Source.
    ::
  ::
  ```mdc
  ::hero
  ---
  announcement:
    title: 'Release v1.0.0'
    icon: 'lucide:party-popper'
    to: /getting-started
  actions:
    - name: Get Started
      to: /getting-started
    - name: GitHub
      variant: outline
      to: https://github.com/wordup-md/nuxt-layer-shadcn-unocss
      leftIcon: 'lucide:github'
  ---

  #title
  Effortless and Beautiful :br Docs Template.

  #description
  Beautifully designed Nuxt Content template with shadcn-vue. :br Customizable. Compatible. Open Source.
  ::
  ```
::
