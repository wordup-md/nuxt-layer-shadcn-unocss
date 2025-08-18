---
title: Button Link
icon: lucide:external-link
badges:
  - value: Docus
    to: https://docus.dev/api/components#buttonlink
    target: _blank
  - value: Source
    icon: lucide:code
    to: https://github.com/wordup-md/nuxt-layer-shadcn-unocss/blob/main/components/content/ButtonLink.vue
    target: _blank
  - value: 0.6.5
---

## Usage

::stack
  ::div{class="p-3 flex gap-4"}
  ::button-link{icon="lucide:github" variant="outline" to="https://github.com/wordup-md/nuxt-layer-shadcn-unocss" target="_blank"}
    GitHub
  ::
  ::button-link{icon="lucide:ghost" variant="ghost" href="https://github.com/wordup-md/nuxt-layer-shadcn-unocss" blank}
    Ghost
  ::
  ::button-link{trailing-icon="lucide:arrow-up-right" to="/getting-started" target="_blank"}
    Get Started
  ::
  ::
  ```mdc
  ::button-link{icon="lucide:github" variant="outline" to="https://github.com/wordup-md/nuxt-layer-shadcn-unocss" target="_blank"}
    GitHub
  ::
  ::button-link{icon="lucide:ghost" variant="ghost" href="https://github.com/wordup-md/nuxt-layer-shadcn-unocss" blank}
    Ghost
  ::
  ::button-link{trailing-icon="lucide:arrow-up-right" to="/getting-started" target="_blank"}
    Get Started
  ::
  ```
::

## Props

::field-group
  :field{name="variant" type="'default' | 'secondary' | 'link' | 'destructive' | 'outline' | 'ghost'" default-value="'default'"}
  :field{name="size" type="'default' | 'icon' | 'sm' | 'xs' | 'lg'" default-value="'default'"}
  :field{name="icon" type="string"}[Icon on the left]
  :field{name="trailingIcon" type="string"}[Icon on the right]
  :field{name="to" type="string"}[Link URL]
  :field{name="href" type="string"}[Alias to `to`]
  :field{name="target" type="Target"}[A `target` attribute value to apply on the link]
  :field{name="blank" type="boolean"}[Alias to `target='_blank'`]
::
