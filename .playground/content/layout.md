---
title: Layout
navigation: false
layout: editorial
header:
  position: floating
---

::hero
---
actions:
  - name: Get Started
    to: /getting-started/introduction
  - name: GitHub
    variant: outline
    to: https://github.com/wordup-md/nuxt-layer-shadcn-unocss
    leftIcon: lucide:github
announcement:
  title: Release v0.8.13
  icon: 🎉
  to: https://github.com/wordup-md/nuxt-layer-shadcn-unocss/releases/latest
  target: _blank
class: bg-gradient-to-b from-primary/20 to-transparent full-width full-content
---
#title
Effortless and Beautiful Template.

#description
Beautifully designed Nuxt Content template built with :br
[shadcn-vue](https://www.shadcn-vue.com) and [unocss](https://unocss.dev).
::

::div{.bg-gray-100}
test div
::

::section{.bg-gray-100}
test section
::

::prose-section{.bg-gray-100}
  :::card
  lorem ipsum
  :::

  :::card
  auiea
  :::
::

latuinerst nrst auiea Quisque rutrum. Praesent congue erat at massa. Vestibulum purus quam, scelerisque ut, mollis sed, nonummy id, metus. Duis vel nibh at velit scelerisque suscipit. Praesent nec nisl a purus blandit viverra.

::prose-section{.wide-content.bg-gray-100}
section wide-content
::

::prose-section{.full-width.bg-gray-100}
section full-width
::

::prose-section{.bg-gray-100.full-width.wide-content}
section full-width wide-content
::

::prose-section{.bg-gray-100.full-width.full-content}
section full-width full-content
::
