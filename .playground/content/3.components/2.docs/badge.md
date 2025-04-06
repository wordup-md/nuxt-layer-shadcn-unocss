---
title: Badge
icon: lucide:badge
badges:
  - value: Docus
    to: https://docus.dev/api/components#badge
    target: _blank
  - value: Source
    icon: lucide:code
    to: https://github.com/ZTL-UwU/shadcn-docs-nuxt/blob/main/components/content/Badge.vue
    target: _blank
---

## Usage

::stack
  ::div{class="p-3"}
  ::badge
    Default
  ::
  ::badge{size="sm"}
    Small
  ::
  ::badge{size="lg"}
    Large
  ::
  ::
  ```mdc
  ::badge
    Default
  ::
  ::badge{size="sm"}
    Small
  ::
  ::badge{size="lg"}
    Large
  ::
  ```
::

### Types

::stack{label="default"}
  ::div{class="p-3"}
    :badge[Default]
    :badge[Primary]{type="primary"}
    :badge[Secondary]{type="secondary"}
    :badge[Info]{type="info"}
    :badge[Warning]{type="warning"}
    :badge[Success]{type="success"}
    :badge[Danger]{type="danger"}
    :badge[New]{type="new"}
  ::

  ```mdc
  :badge[Default]
  :badge[Info]{type="info"}
  :badge[Warning]{type="warning"}
  :badge[Success]{type="success"}
  :badge[Danger]{type="danger"}
  :badge[New]{type="new"}
  ```
::

### Variants

::stack{label="default"}
  ::div{class="p-3"}
    :badge[Default]{variant="fill"}
    :badge[Primary]{type="primary" variant="fill"}
    :badge[Secondary]{type="secondary" variant="fill"}
    :badge[Info]{type="info" variant="fill"}
    :badge[Warning]{type="warning" variant="fill"}
    :badge[Success]{type="success" variant="fill"}
    :badge[Danger]{type="danger" variant="fill"}
    :badge[New]{type="new" variant="fill"}
  ::

  ::div{class="p-3"}
    :badge[Default]{variant="outline"}
    :badge[Primary]{type="primary" variant="outline"}
    :badge[Secondary]{type="secondary" variant="outline"}
    :badge[Info]{type="info" variant="outline"}
    :badge[Warning]{type="warning" variant="outline"}
    :badge[Success]{type="success" variant="outline"}
    :badge[Danger]{type="danger" variant="outline"}
    :badge[New]{type="new" variant="outline"}
  ::

  ::div{class="p-3"}
    :badge[Default]{variant="text"}
    :badge[Primary]{type="primary" variant="text"}
    :badge[Secondary]{type="secondary" variant="text"}
    :badge[Info]{type="info" variant="text"}
    :badge[Warning]{type="warning" variant="text"}
    :badge[Success]{type="success" variant="text"}
    :badge[Danger]{type="danger" variant="text"}
    :badge[New]{type="new" variant="text"}
  ::

  ```mdc
  :badge[...]{type="..." variant="fill"}
  :badge[...]{type="..." variant="outline"}
  :badge[...]{type="..." variant="text"}
  ```
::

### Link

::stack
  ::div{class="p-3"}
  ::badge{variant="outline" type="info" to="https://github.com/ZTL-UwU/shadcn-docs-nuxt" target="_blank"}
  Link
  ::
  ::
  ```mdc
  ::badge{variant="outline" type="info" to="https://github.com/ZTL-UwU/shadcn-docs-nuxt" target="_blank"}
  Link
  ::
  ```
::

## Props

::field-group
  :field{name="type" type="'default' | 'info' | 'warning' | 'success' | 'danger' | 'lime'" default-value="'default'"}
  :field{name="variant" type="'default' | 'secondary' | 'destructive' | 'outline'" default-value="'default'"}
  :field{name="size" type="'md' | 'sm'" default-value="'md'"}
  :field{name="to" type="string"}[Link URL]
  :field{name="target" type="Target"}[A `target` attribute value to apply on the link]
::
