---
title: Badge
icon: lucide:badge
badges:
  - value: Docus
    to: https://docus.dev/api/components#badge
    target: _blank
  - value: Source
    icon: lucide:code
    to: https://github.com/wordup-md/nuxt-layer-shadcn-unocss/blob/main/components/content/Badge.vue
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

::stack
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

|Default|Fill|Outline|Text|
|---|---|---|---|
|:badge[Default]|:badge[Default]{variant="fill"}|:badge[Default]{variant="outline"}|:badge[Default]{variant="text"}|
|:badge[Primary]{type="primary"}|:badge[Primary]{type="primary" variant="fill"}|:badge[Primary]{type="primary" variant="outline"}|:badge[Primary]{type="primary" variant="text"}|
|:badge[Secondary]{type="secondary"}|:badge[Secondary]{type="secondary" variant="fill"}|:badge[Secondary]{type="secondary" variant="outline"}|:badge[Secondary]{type="secondary" variant="text"}|
|:badge[Info]{type="info"}|:badge[Info]{type="info" variant="fill"}|:badge[Info]{type="info" variant="outline"}|:badge[Info]{type="info" variant="text"}|
|:badge[Warning]{type="warning"}|:badge[Warning]{type="warning" variant="fill"}|:badge[Warning]{type="warning" variant="outline"}|:badge[Warning]{type="warning" variant="text"}|
|:badge[Success]{type="success"}|:badge[Success]{type="success" variant="fill"}|:badge[Success]{type="success" variant="outline"}|:badge[Success]{type="success" variant="text"}|
|:badge[Danger]{type="danger"}|:badge[Danger]{type="danger" variant="fill"}|:badge[Danger]{type="danger" variant="outline"}|:badge[Danger]{type="danger" variant="text"}|
|:badge[New]{type="new"}|:badge[New]{type="new" variant="fill"}|:badge[New]{type="new" variant="outline"}|:badge[New]{type="new" variant="text"}|

**Examples:**

```mdc
:badge[Some text]{type="info" variant="fill"}
:badge[Some text]{type="danger" variant="outline"}
:badge[Some text]{type="new" variant="text"}
```

### Link

::stack
  ::div{class="p-3"}
  ::badge{variant="outline" type="info" to="https://github.com/wordup-md/nuxt-layer-shadcn-unocss" target="_blank"}
  Link
  ::
  ::
  ```mdc
  ::badge{variant="outline" type="info" to="https://github.com/wordup-md/nuxt-layer-shadcn-unocss" target="_blank"}
  Link
  ::
  ```
::

## Props

::field-group
  :field{name="title" type="string"}[Can be used to set the label of the badge instead of the content]
  :field{name="type" type="'default' | 'info' | 'warning' | 'success' | 'danger' | 'lime'" default-value="'default'"}
  :field{name="variant" type="'default' | 'secondary' | 'destructive' | 'outline'" default-value="'default'"}
  :field{name="size" type="'md' | 'sm'" default-value="'md'"}
  :field{name="to" type="string"}[Link URL]
  :field{name="target" type="Target"}[A `target` attribute value to apply on the link]
::
