export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hook('mdc-editor:config', ({ config, editor }: { config: any, editor: any }) => {
    config.components.push({
      displayName: 'Callout',
      description: 'Insert a customizable callout',
      group: 'Docs Components',
      icon: 'i-lucide-megaphone',
      previewHTML: `
        <p class="text-skeleton pt2 px2.5">x xxx xxxx xxx xxx xx x xxx</p>
        <p class="text-skeleton bg-teal-500 px2.5 py2">x xx xxx xx xxxx xx xx</p>
        <p class="text-skeleton px2.5">xx x xxx xxx x xx xxx</p>
      `,
      handleMenu: true,
      slashMenu: true,
      transformable: true,
      transform() {
        return { type: 'containerComponent', attrs: { componentName: 'callout' } }
      },
      onSelect: () => editor.commands.insertContainerComponent({
        name: 'callout',
      }),
    })

    config.components.push({
      displayName: 'Read More',
      description: 'Insert a "Read More" block',
      group: 'Docs Components',
      icon: 'i-lucide-bookmark',
      previewHTML: `
        <p class="text-skeleton pt2 px2.5">x xxx xxxx xxx xxx xx x xxx</p>
        <p class="text-skeleton bg-teal-500 px2.5 py2">x xx xxx xx xxxx xx xx</p>
        <p class="text-skeleton px2.5">xx x xxx xxx x xx xxx</p>
      `,
      handleMenu: true,
      slashMenu: true,
      transformable: true,
      transform() {
        return { type: 'containerComponent', attrs: { componentName: 'read-more' } }
      },
      onSelect: () => editor.commands.insertContainerComponent({
        name: 'read-more',
      }),
    })

    config.components.push({
      displayName: 'Steps',
      description: 'Insert a steps',
      group: 'Docs Components',
      icon: 'i-lucide-arrow-down-0-1',
      previewHTML: `
        <p class="text-skeleton pt2 px2.5">x xxx xxxx xxx xxx xx x xxx</p>
        <p class="text-skeleton bg-teal-500 px2.5 py2">x xx xxx xx xxxx xx xx</p>
        <p class="text-skeleton px2.5">xx x xxx xxx x xx xxx</p>
      `,
      handleMenu: true,
      slashMenu: true,
      transformable: true,
      transform() {
        return { type: 'containerComponent', attrs: { componentName: 'steps' } }
      },
      onSelect: () => editor.commands.insertContainerComponent({
        name: 'steps',
      }),
    })

    config.components.push({
      displayName: 'Card',
      description: 'Insert a card',
      group: 'Docs Components',
      icon: 'i-lucide-square',
      previewHTML: `
        <p class="text-skeleton pt2 px2.5">x xxx xxxx xxx xxx xx x xxx</p>
        <p class="text-skeleton bg-teal-500 px2.5 py2">x xx xxx xx xxxx xx xx</p>
        <p class="text-skeleton px2.5">xx x xxx xxx x xx xxx</p>
      `,
      handleMenu: true,
      slashMenu: true,
      transformable: true,
      transform() {
        return { type: 'containerComponent', attrs: { componentName: 'card' } }
      },
      onSelect: () => editor.commands.insertContainerComponent({
        name: 'card',
      }),
    })

    config.components.push({
      displayName: 'Card Group',
      description: 'Insert a card group',
      group: 'Page Components',
      icon: 'i-lucide-layout-grid',
      previewHTML: `
        <p class="text-skeleton pt2 px2.5">x xxx xxxx xxx xxx xx x xxx</p>
        <p class="text-skeleton bg-teal-500 px2.5 py2">x xx xxx xx xxxx xx xx</p>
        <p class="text-skeleton px2.5">xx x xxx xxx x xx xxx</p>
      `,
      handleMenu: true,
      slashMenu: true,
      transformable: true,
      transform() {
        return { type: 'containerComponent', attrs: { componentName: 'card-group' } }
      },
      onSelect: () => editor.commands.insertContainerComponent({
        name: 'card-group',
      }),
    })

    config.components.push({
      displayName: 'Div',
      description: 'Insert a div',
      group: 'Page Components',
      icon: 'i-lucide-code',
      previewHTML: `
        <p class="text-skeleton pt2 px2.5">x xxx xxxx xxx xxx xx x xxx</p>
        <p class="text-skeleton bg-teal-500 px2.5 py2">x xx xxx xx xxxx xx xx</p>
        <p class="text-skeleton px2.5">xx x xxx xxx x xx xxx</p>
      `,
      handleMenu: true,
      slashMenu: true,
      transformable: true,
      transform() {
        return { type: 'containerComponent', attrs: { componentName: 'div' } }
      },
      onSelect: () => editor.commands.insertContainerComponent({
        name: 'div',
      }),
    })
  })
})
