---
title: Test 3
layout: editorial
toc: false
aside: false
breadcrumb: false
---

## Basic

::card
test
::

## With title

::card
---
to: https://shadcn-vue.com
---

### title

Card content
::

::card
---
to: https://shadcn-vue.com
---
#title
Card Title

#content
Card content
::

::card
---
icon: lucide:arrow-up-right
to: https://shadcn-vue.com
---
Card content
::

::card
---
to: https://shadcn-vue.com
---
#title
Card Title
::

## With image

::card
---
icon: lucide:arrow-up-right
media: /og-shadcn-docs-dark.png
to: https://shadcn-vue.com
---
Content
::

::card
---
media: /og-nuxt.png
to: https://shadcn-vue.com
---
#title
Card Title

#description
Description

#content
Beautifully designed **Nuxt Content** template with **shadcn-vue**.\
\_Customizable. Compatible. Open Source.\_

#footer
Footer
::

## Media position

:/\:card-group

::card
---
icon: lucide:sun
media: /og-shadcn-docs-dark.png
mediaPosition: right
to: https://shadcn-vue.com
---
#title
Card Title #test

#descriptionn
Description

#content
test #test lorem ipsum dolor sit **amet** !
Donec vitae orci sed dolor rutrum auctor. Vestibulum fringilla pede sit amet augue. In auctor lobortis lacus. Praesent vestibulum dapibus nibh.
::

::card
---
class: border-none shadow-none
icon: lucide:sun
media: /og-nuxt.png
mediaPosition: left
to: https://shadcn-vue.com
---
#title
Card Title #test uit auiesrt auienrst auie auieeee st auitest anursit ast auirset rst auind pnets a

#description
Description group-hover/card\:scale-105 transition-all group-hover/card\:scale-105 transition-all

#content
test #test uiesrt auienrst auie auieeee st auitest anursit ast auirset rst auind pnets a
uiesrt auienrst auie auieeee st auitest anursit ast auirset rst auind pnets a
uiesrt auienrst auie auieeee st auitest anursit ast auirset rst auind pnets a
uiesrt auienrst auie auieeee st auitest anursit ast auirset rst auind pnets a
uiesrt auienrst auie auieeee st auitest anursit ast auirset rst auind pnets a
::

::card
---
class: h-100
icon: lucide:sun
media: https://static.vecteezy.com/system/resources/thumbnails/002/073/237/small_2x/helix-pattern-on-a-white-background-free-vector.jpg
mediaPosition: cover
to: https://shadcn-vue.com
---
#tsest

#title
Card Title #test uit auiesrt auienrst auie auieeee
::

::card
---
class: h-50 bg-blue-200
icon: lucide:sun
iconPosition: right
mediaPosition: center
title: Title Etiam feugiat lorem non metus.
---
auieaui
::

::card
---
icon: lucide:sun
media: https://static.vecteezy.com/system/resources/thumbnails/002/073/237/small_2x/helix-pattern-on-a-white-background-free-vector.jpg
mediaPosition: centere
---
#tsest

#title
Card Title #test uit auiesrt auienrst auie auieeee

#media
  :::hero
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
  ---
  #title
  Effortless and Beautiful :br Docs Template.
  
  #description
  Beautifully designed Nuxt Content template with shadcn-vue. :br Customizable. Compatible. Open Source.
  :::
::

\::
