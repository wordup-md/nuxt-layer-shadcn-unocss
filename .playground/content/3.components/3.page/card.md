---
title: Card
icon: lucide:square
badges:
  - value: Nuxt UI Pro
    to: https://ui.nuxt.com/pro/prose/card
    target: _blank
  - value: Docus
    to: https://docus.dev/api/components#card
    target: _blank
  - value: Source
    icon: lucide:code
    to: https://github.com/ZTL-UwU/shadcn-docs-nuxt/blob/main/components/content/Card.vue
    target: _blank
---

## Usage

::stack
  ::div{class="p-4"}
  ::card
  ---
  icon: lucide:box
  ---

  #title
  Card Title

  #description
  Description

  #content
  Beautifully designed **Nuxt Content** template with **shadcn-vue**. _Customizable. Compatible. Open Source._

  #footer
  Footer
  ::
  ::
  ```mdc
  ::card
  ---
  icon: lucide:box
  ---

  #title
  Card Title

  #description
  Description

  #content
  Beautifully designed **Nuxt Content** template with **shadcn-vue**. _Customizable. Compatible. Open Source._

  #footer
  Footer
  ::
  ```
::

### Link

::stack
  ::div{class="p-4"}
  ::card
  ---
  to: https://github.com/ZTL-UwU/shadcn-docs-nuxt
  target: _blank
  # showLinkIcon: false
  ---

  #title
  Link Card

  #content
  Beautifully designed **Nuxt Content** template with **shadcn-vue**. _Customizable. Compatible. Open Source._
  ::
  ::
  ```mdc
  ::card
  ---
  to: https://github.com/ZTL-UwU/shadcn-docs-nuxt
  target: _blank
  # showLinkIcon: false
  ---

  #title
  Link Card

  #content
  Beautifully designed **Nuxt Content** template with **shadcn-vue**. _Customizable. Compatible. Open Source._
  ::
  ```
::

### Media

::stack
  ::div{class="p-4"}
  ::card
  ---
  media: /og-nuxt.png
  media-position: left
  ---
  #title
  Image Card

  #content
  Beautifully designed **Nuxt Content** template with **shadcn-vue**. _Customizable. Compatible. Open Source._
  ::
  ::
  ```mdc
  ::card
  ---
  media: /og-nuxt.png
  media-position: left
  ---
  #title
  Media Card

  #content
  Beautifully designed **Nuxt Content** template with **shadcn-vue**. _Customizable. Compatible. Open Source._
  ::
  ```
::

## Props

::field-group
  :field{name="title" type="string"}[Card title]
  :field{name="description" type="string"}[Card description]
  :field{name="content" type="string"}[Card content]
  :field{name="footer" type="string"}[Card footer]
  :field{name="to" type="string"}[Link URL]
  :field{name="target" type="Target"}[A `target` attribute value to apply on the link]
  :field{name="external" type="boolean"}[Alias to `target='_blank'`]
  :field{name="showLinkIcon" type="boolean" default-value="true"}[Whether to show the link indicator :icon{name="lucide:arrow-up-right"}]
  :field{name="icon" type="string"}[Card icon]
  :field{name="iconSize" type="number" default-value="24"}
  :field{name="iconPosition" type="'top' | 'left'" default-value="'top'"}[Icon position]
  :field{name="media" type="string"}[Media URL]
  :field{name="media-position" type="'top' | 'left' | 'right' | 'bottom' | 'cover' | 'center'" default-value="'top'"}[Media position]
::
