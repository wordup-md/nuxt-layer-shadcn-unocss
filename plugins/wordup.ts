import { TextSelection } from 'prosemirror-state'
import type { Node } from 'prosemirror-model'

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
      onSelect: async () => {
        const nodes = await config.convertMarkdownToNode(`::alert{type="info"}
{|}
::`)
        // console.log('nodes', nodes, editor, editor.commands, editor.schema.nodeFromJSON(nodes))

        const { schema, view, state } = editor
        const insertPos = state.selection.anchor - 1

        // Find and replace {|} cursor placeholder with a paragraph node containing empty text
        const findAndReplaceCursor = (obj: Record<string, unknown>, path: number[] = []): number[] | null => {
          if (typeof obj !== 'object' || obj === null) return null

          // Check for cursor placeholder in content array
          if (Array.isArray(obj.content)) {
            for (let i = 0; i < obj.content.length; i++) {
              const item = obj.content[i] as Record<string, unknown>
              if (item.type === 'text' && item.text === '{|}') {
                return [...path, i]
              }
              const found = findAndReplaceCursor(item, [...path, i])
              if (found) return found
            }
          }

          // Check text property directly
          if (obj.text === '{|}') {
            return path
          }

          return null
        }

        const cursorPath = findAndReplaceCursor(nodes as Record<string, unknown>)
        console.log(cursorPath)
        if (cursorPath) {
          // Replace cursor placeholder with a paragraph node containing empty text
          let current: Record<string, unknown> = nodes as Record<string, unknown>
          for (let i = 0; i < cursorPath.length - 1; i++) {
            const content = current.content as Record<string, unknown>[]
            if (content) {
              current = content[cursorPath[i]] as Record<string, unknown>
            }
          }

          if (Array.isArray(current.content)) {
            const cursorIndex = cursorPath[cursorPath.length - 1]
            // Replace {|} with a paragraph node containing a text node with a space
            current.content[cursorIndex] = {
              // type: 'paragraph',
              // content: [
              //   {
              type: 'text',
              text: '\u200b',
              //   },
              // ],
            }
          }
        }

        const parsedNodes = schema.nodeFromJSON(nodes)
        console.log('parsedNodes', parsedNodes, cursorPath)

        // Calculate cursor position offset within the parsed nodes structure
        // The path is an array of indices: [0, 1, 2] means content[0].content[1].content[2]
        const calculateCursorOffset = (node: Node, path: number[]): number | null => {
          if (path.length === 0) {
            return 1 // Base case: position 1 is inside the root node
          }

          let offset = 1 // Start inside the root node (after opening tag)
          let currentNode = node

          // Traverse the path, summing up node sizes as we go
          for (let i = 0; i < path.length; i++) {
            const pathIndex = path[i]
            const isLastStep = i === path.length - 1

            if (!currentNode.content || currentNode.content.childCount <= pathIndex) {
              return null // Invalid path
            }

            // Sum sizes of all nodes before the target index
            for (let j = 0; j < pathIndex; j++) {
              offset += currentNode.content.child(j).nodeSize
            }

            if (isLastStep) {
              // For the last step, we want the position at the start of the text node
              // The position is after the opening tag of the parent, plus the sum of previous siblings
              return offset + 1
            }

            // Move into the target child node (+1 to get inside it)
            offset += 1
            currentNode = currentNode.content.child(pathIndex)
          }

          return offset
        }

        let cursorOffset: number | null = null
        if (cursorPath) {
          // Calculate the offset from the root of parsedNodes
          cursorOffset = calculateCursorOffset(parsedNodes, cursorPath)
          // console.log('cursorOffset', cursorOffset, 'cursorPath', cursorPath)
        }

        const tr = state.tr
        tr.insert(insertPos, parsedNodes)

        // Set cursor position if we calculated the offset
        if (cursorOffset !== null) {
          const cursorPos = insertPos + cursorOffset
          // console.log('Setting cursor at', cursorPos, 'insertPos', insertPos, 'offset', cursorOffset)
          tr.setSelection(TextSelection.create(tr.doc, cursorPos))
        }

        view.focus()
        return view.dispatch(tr)
      },
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
          }, 300)
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
      // onSelect: () => editor.commands.insertContainerComponent({
      //   name: 'steps',
      // }),
      onSelect: async () => {
        const nodes = await config.convertMarkdownToNode(`::steps
###
::`)

        const { schema, view, state } = editor
        const parsedNodes = schema.nodeFromJSON(nodes)
        // console.log('parsedNodes', parsedNodes)

        const tr = state.tr
        const insertPos = state.selection.anchor - 2
        tr.insert(insertPos, parsedNodes)

        return view.dispatch(tr)
      },
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
