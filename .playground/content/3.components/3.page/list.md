---
title: Dynamic List
icon: i-lucide:layout-list
badges:
  - value: Source
    icon: lucide:code
    to: https://github.com/wordup-md/nuxt-layer-shadcn-unocss/blob/main/components/content/List.vue
    target: _blank
---

## Usage

::stack
  ::div{class="p-4"}
  ::list
  ---
  path: /components/
  query:
    limit: 3
  component: card
  ---
  ::
  ::
  ```mdc
  ::list
  ---
  path: /components/
  query:
    limit: 3
  component: card
  ---
  ::
  ```
::

## Props

::field-group
  :field{name="path" type="string"}[Path to the list]
  :field{name="query" type="object"}[Query parameters]
  :field{name="component" type="string"}[Component to use for each item]
::
