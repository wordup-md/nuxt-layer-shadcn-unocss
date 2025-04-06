---
title: Icon
icon: /iconesjs.svg
badges:
  - value: Docus
    to: https://docus.dev/api/components#icon
    target: _blank
  - value: Source
    icon: lucide:code
    to: https://github.com/ZTL-UwU/shadcn-docs-nuxt/blob/main/components/content/Icon.vue
    target: _blank
---

## Usage

::stack
  ::div{class="p-4 space-x-2"}
    :icon{name="lucide:box"}
    :icon{name="vscode-icons:file-type-js-official"}
    :icon{name="vscode-icons:file-type-vue"}
    :icon{name="vscode-icons:file-type-nuxt" size="30"}
  ::

  ```mdc
  :icon{name="lucide:box"}
  :icon{name="vscode-icons:file-type-js-official"}
  :icon{name="vscode-icons:file-type-vue"}
  :icon{name="vscode-icons:file-type-nuxt" size="30"}
  ```
::

If you want to use other icons, it is highly recommended to install them locally, which is faster and more reliable on both SSR and client-side.

```bash [Terminal]
npm i -D @iconify-json/collection-name
```

`@iconify-json/lucide` and `@iconify-json/vscode-icons` are installed by default.

### Smart Icon

:badge[0.5.3]{variant="outline"}

You can put iconify icons, emojis and urls in `icon`. Smart icon will render them automatically.

::stack
  ::div{class="p-4"}
    **Iconify**
    <div class="space-x-2">

    :icon{name="lucide:box"}
    :icon{name="vscode-icons:file-type-js-official"}
    :icon{name="vscode-icons:file-type-vue" size=30}

    </div>

    **Emojis**
    <div class="space-x-2">

    :icon{name="😍"}
    :icon{name="🚀"}
    :icon{name="🎉" size=30}

    </div>

    **URL**
    <div class="space-x-2">

    :icon{name="/logo.svg"}
    :icon{name="https://vueuse.org/favicon.svg" size=40}

    </div>
  ::

  ```mdc
  **Iconify**
  :icon{name="lucide:box"}
  :icon{name="vscode-icons:file-type-js-official"}
  :icon{name="vscode-icons:file-type-vue"}

  **Emojis**
  :icon{name="😍"}
  :icon{name="🚀"}
  :icon{name="🎉" size=30}

  **URL**
  :icon{name="/logo.svg"}
  :icon{name="https://vueuse.org/favicon.svg" size=40}
  ```
::

::alert{to="https://github.com/nuxt-modules/icon" target="_blank"}
The icon component uses **Nuxt Icon** under the hood. Check out the usage guide from Nuxt Icon.
::