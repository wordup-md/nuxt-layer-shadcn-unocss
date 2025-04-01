import type { MDCElement, MDCRoot, MDCNode } from '@nuxtjs/mdc'
import type { ParsedContent } from '@nuxt/content'

export async function useMdcMenu(menu: Ref<ParsedContent | null>, {
  menuComponentName = 'menu-item',
  submenuComponentName = 'submenu-item',
  includeElementsBeforeFirstTag = true,
}: {
  menuComponentName?: string
  submenuComponentName?: string
  includeElementsBeforeFirstTag?: boolean
} = {}) {
  const tree = computed<MDCRoot | undefined>(() => {
    if (!menu?.value?.body?.children) return

    // Clone the content to avoid mutating the original data
    const content = JSON.parse(JSON.stringify(menu.value!.body!.children))

    const grouped = groupElementsAfterElement(content,
      ['h1', 'menu-item'],
    )

    const _tree = [] as MDCNode[]
    for (const item of grouped) {
      if (item.tag === 'h1') {
        const convertedItem = convertH1ToMenuItem({
          item,
          menuComponentName,
          submenuComponentName,
        })
        if (convertedItem) _tree.push(convertedItem)
      }
      else if (item.tag === menuComponentName) {
        _tree.push(item)
      }
      else if (item.tag === 'div') {
        _tree.push(item)
      }
      else if (includeElementsBeforeFirstTag) {
        _tree.push(item)
      }
    }

    return {
      type: 'root',
      children: _tree,
    }
  })

  return tree
}

function convertH1ToMenuItem({
  item,
  menuComponentName,
  submenuComponentName,
}: {
  item: MDCElement
  menuComponentName: string
  submenuComponentName: string
}) {
  let treeItem: MDCElement | undefined = undefined

  if (item.tag === 'h1') {
    treeItem = {
      type: 'element',
      tag: menuComponentName,
      props: {},
      children: JSON.parse(JSON.stringify(toRaw(item.children))), // break reactivity
    }
    const aItem = item.children[0] as MDCElement
    treeItem.props!.className = aItem.props?.className
    treeItem.props!.dropdownClass = aItem.props?.['dropdown-class']

    if ((item.children?.[0] as MDCElement).tag === 'a') {
      let href = aItem.props?.href

      treeItem.children = JSON.parse(
        JSON.stringify(toRaw(aItem.children) || []),
      )

      const { navDirFromPath, navPageFromPath } = useContentHelpers()
      const { navigation } = useContent()

      // Link to page or list sub-pages
      if (href.startsWith('/') && href.endsWith('/') && navigation.value) {
        href = href.replace(/\/$/, '')
        const dir = navDirFromPath(href, navigation.value)
        if (dir) {
          const parentProps = (item.children[0] as MDCElement).props!
          const children = dir
            .map(child => ({
              type: 'element',
              tag: submenuComponentName,
              props: {
                to: child._path,
                title: child.title,
                icon: [false, 'false'].includes(parentProps.icon)
                  ? undefined
                  : child.icon,
                description: [false, 'false'].includes(parentProps.description)
                  ? undefined
                  : child.description,
              },
              children: [],
            }))
            .slice(0, parentProps.limit || Infinity) as MDCElement[]

          treeItem.children.push({
            type: 'element',
            tag: 'template',
            props: {
              'v-slot:content': '',
            },
            children,
          })
        }
      }
      else {
        treeItem.props!.to = href

        if (/https?:\/\//.test(href)) {
          treeItem.props!.target = '_blank'
          treeItem.props!.rel = 'noopener noreferrer'
          treeItem.props!.showLinkIcon = true
        }
      }

      // If the link has an icon, use it.
      if (aItem.props?.[':icon'] !== 'false' && aItem.props?.icon !== 'false')
        treeItem.props!.icon = aItem.props?.icon

      // Auto-fill empty link with page data. [](/page)
      if (!aItem.children?.length && navigation.value) {
        const page = navPageFromPath(href, navigation.value)
        treeItem.props!.title = page?.title || 'Not found'

        // If the link has an icon, use it.
        if (aItem.props?.[':icon'] !== 'false' && aItem.props?.icon !== 'false')
          treeItem.props!.icon = page?.icon
      }
    }
  }
  else if (item.tag === 'div') {
    treeItem = item
  }
  return treeItem
}

function groupElementsAfterElement(
  elements: MDCElement[],
  tags?: string | string[],
) {
  const _tags = typeof tags === 'string' ? [tags] : tags
  const result = []
  let currentTag = null
  let currentGroup: MDCElement | null = null
  let foundFirstTag = false

  for (const element of elements) {
    if (_tags?.includes(element.tag)) {
      foundFirstTag = true

      // Finalize the previous group (if any)
      if (currentGroup && currentTag) {
        currentTag.children.push(currentGroup)
        currentGroup = null
      }

      // Track the new tag
      currentTag = element
      result.push(currentTag)
    }
    else if (element.tag === 'div') {
      result.push(element)
    }
    else {
      if (!foundFirstTag) {
        result.push(element)
        continue
      }

      // Create a group container if none exists
      if (!currentGroup) {
        currentGroup = {
          type: 'element',
          tag: 'template',
          props: {
            'v-slot:content': '',
          },
          children: [],
        }
      }
      currentGroup.children.push(element)
    }
  }

  // Add the last group to its tag (if any)
  if (currentGroup && currentTag) {
    currentTag.children.push(currentGroup)
  }

  return result
}
