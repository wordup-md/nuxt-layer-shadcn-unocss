export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hook('mdc-editor:config', ({ config, editor }: { config: any, editor: any }) => {
    config.components.push({
      displayName: 'Alert',
      description: 'Insert a customizable alert',
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
        return { type: 'containerComponent', attrs: { componentName: 'alert' } }
      },
      onSelect: () => editor.commands.insertContainerComponent({
        name: 'alert',
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
      onSelect: () => {
        editor.commands.insertContainerComponent({
          name: 'read-more',
        })

        // Set cursor on the input of the component after insertion
        // Use setTimeout to wait for the DOM update
        nextTick(() => {
          const { view, state } = editor
          if (!view || !state) return

          // Get the current selection position
          const { $anchor } = state.selection
          const pos = $anchor.pos
          // Find the inserted containerComponent node
          // Walk backwards to find the node we just inserted
          let node = null
          let nodePos = -1

          // Check if we're inside a containerComponent
          for (let depth = $anchor.depth; depth > 0; depth--) {
            const nodeAtDepth = $anchor.node(depth)
            if (nodeAtDepth.type.name === 'containerComponent'
              && nodeAtDepth.attrs.componentName === 'read-more') {
              node = nodeAtDepth
              nodePos = $anchor.before(depth)
              break
            }
          }

          // If not found, search forward from current position
          if (!node) {
            const doc = state.doc
            for (let i = Math.max(0, pos - 50); i < Math.min(doc.content.size, pos + 50); i++) {
              const $pos = doc.resolve(i)
              for (let depth = $pos.depth; depth > 0; depth--) {
                const nodeAtDepth = $pos.node(depth)
                if (nodeAtDepth.type.name === 'containerComponent'
                  && nodeAtDepth.attrs.componentName === 'read-more') {
                  node = nodeAtDepth
                  nodePos = $pos.before(depth)
                  break
                }
              }
              if (node) break
            }
          }

          const prevNode = view.domAtPos(nodePos - 1)
          // get next html element with js
          setTimeout(() => {
            prevNode.node.nextElementSibling?.querySelector('input.INLINE_MENU_LINK_INPUT')?.focus()
          }, 100)
          // const node = editor.state.doc.nodeAt(nodePos)
          // if (node && node.type.name === 'read-more') {
          //   const input = node.firstChild?.firstChild?.firstChild as HTMLInputElement
          //   if (input) {
          //     input.focus()
          //   }
          // }
          // if (node && nodePos >= 0) {
          //   // Set cursor inside the component (at the start of its content)
          //   // Position is after the opening tag, typically nodePos + 1
          //   const insidePos = nodePos + 1

          //   // Import TextSelection dynamically and set selection
          //   import('prosemirror-state').then(({ TextSelection }) => {
          //     const tr = state.tr
          //     const selection = TextSelection.create(tr.doc, insidePos)
          //     tr.setSelection(selection)
          //     view.dispatch(tr)

          //     // Focus the editor
          //     view.focus()
          //   })
          // }
        })
      },
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

    //   config.components.push({
    //     displayName: 'Card Group',
    //     description: 'Insert a card group',
    //     group: 'Page Components',
    //     icon: 'i-lucide-layout-grid',
    //     previewHTML: `
    //       <p class="text-skeleton pt2 px2.5">x xxx xxxx xxx xxx xx x xxx</p>
    //       <p class="text-skeleton bg-teal-500 px2.5 py2">x xx xxx xx xxxx xx xx</p>
    //       <p class="text-skeleton px2.5">xx x xxx xxx x xx xxx</p>
    //     `,
    //     handleMenu: true,
    //     slashMenu: true,
    //     transformable: true,
    //     transform() {
    //       return { type: 'containerComponent', attrs: { componentName: 'card-group' } }
    //     },
    //     onSelect: () => editor.commands.insertContainerComponent({
    //       name: 'card-group',
    //     }),
    //   })

    //   config.components.push({
    //     displayName: 'Div',
    //     description: 'Insert a div',
    //     group: 'Page Components',
    //     icon: 'i-lucide-code',
    //     previewHTML: `
    //       <p class="text-skeleton pt2 px2.5">x xxx xxxx xxx xxx xx x xxx</p>
    //       <p class="text-skeleton bg-teal-500 px2.5 py2">x xx xxx xx xxxx xx xx</p>
    //       <p class="text-skeleton px2.5">xx x xxx xxx x xx xxx</p>
    //     `,
    //     handleMenu: true,
    //     slashMenu: true,
    //     transformable: true,
    //     transform() {
    //       return { type: 'containerComponent', attrs: { componentName: 'div' } }
    //     },
    //     onSelect: () => editor.commands.insertContainerComponent({
    //       name: 'div',
    //     }),
    //   })
    // })
  })
})
