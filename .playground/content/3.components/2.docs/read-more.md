---
title: Read More
icon: lucide:bookmark
badges:
  - value: undocs
    to: https://undocs.pages.dev/guide/components#read-more
    target: _blank
  - value: Source
    icon: lucide:code
    to: https://github.com/ZTL-UwU/shadcn-docs-nuxt/blob/main/components/content/ReadMore.vue
    target: _blank
---

## Usage

::stack
  :::div{.p-5}
  :read-more{to="/getting-started/writing/markdown"}
  
  :read-more{title="Nuxt website" to="https://nuxt.com/"}
  
  :read-more{icon="lucide:link" prefix="More information on" to="https://nuxt.com/"}
  :::

```mdc
:read-more{to="/getting-started/writing/markdown"}
:read-more{title="Nuxt website" to="https://nuxt.com/"}
:read-more{icon="lucide:link" prefix="More information on" to="https://nuxt.com/"}
```
::

## Props

::field-group
:field[Read More icon]{name="icon" type="string"}

:field[Prefix text]{default-value="Read more at" name="prefix" type="string"}

:field[Link URL]{name="to" type="string"}

:field[Read More title]{name="title" type="string"}

:field[A `target` attribute value to apply on the link]{name="target" type="Target"}
::
