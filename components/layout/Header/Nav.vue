<template>
  <UiNavigationMenu
    v-if="!hasMdMenu"
    class="header-menu"
  >
    <UiNavigationMenuList>
      <UiNavigationMenuItem
        v-for="(item, i) in nav"
        :key="i"
        class="relative"
      >
        <template v-if="item.links">
          <UiNavigationMenuTrigger class="bg-transparent font-semibold">
            {{ item.title }}
          </UiNavigationMenuTrigger>
          <UiNavigationMenuContent>
            <ul class="w-[250px] p-2">
              <li
                v-for="link in item.links"
                :key="link.title"
              >
                <NuxtLink
                  :to="link.to"
                  :target="link.target"
                  class="mb-1 flex w-full gap-2 rounded-md px-3 py-2 transition-all hover:bg-muted"
                >
                  <SmartIcon
                    v-if="link.icon"
                    :name="link.icon"
                    :size="16"
                    class="mt-1 min-w-5"
                  />

                  <div>
                    <div class="font-semibold">
                      {{ link.title }}
                    </div>
                    <div class="text-sm text-muted-foreground">
                      {{ link.description }}
                    </div>
                  </div>
                </NuxtLink>
              </li>
            </ul>
          </UiNavigationMenuContent>
        </template>
        <NuxtLink
          v-else
          :to="item.to"
          :target="item.target"
        >
          <Icon
            v-if="item.showLinkIcon ?? false"
            name="lucide:arrow-up-right"
            class="absolute right-2 top-2 text-muted-foreground"
            size="13"
          />
          <div
            class="bg-transparent font-semibold"
            :class="[
              navigationMenuTriggerStyle(),
              (item.showLinkIcon ?? false) && 'pr-6',
            ]"
          >
            {{ item.title }}
          </div>
        </NuxtLink>
      </UiNavigationMenuItem>
    </UiNavigationMenuList>
  </UiNavigationMenu>

  <UiNavigationMenu
    v-else
    disable-hover-trigger
    class="header-menu"
  >
    <MDCRenderer
      :body="tree"
      tag="navigation-menu-list-global"
    />
  </UiNavigationMenu>
</template>

<script setup lang="ts">
// import between from "unist-util-find-all-between";
// import { findAllAfter } from "unist-util-find-all-after";

// import type { Node, Parent } from "unist";

import type { MDCElement, MDCRoot, MDCNode } from '@nuxtjs/mdc'
import { navigationMenuTriggerStyle } from '../../ui/navigation-menu'
// import type { MarkdownNode } from "@nuxt/content";

const { nav } = useConfig().value.header

const { data } = await useAsyncData('menu-header', () =>
  queryContent('_menu-header').findOne(),
)

const { navigation } = useContent()
const { navDirFromPath, navPageFromPath } = useContentHelpers()

function convertH1ToMenuItem(item: MDCElement) {
  let treeItem: MDCElement | undefined = undefined

  if (item.tag === 'h1') {
    treeItem = {
      type: 'element',
      tag: 'menu-item',
      props: {},
      children: JSON.parse(JSON.stringify(toRaw(item.children))),
    }
    const aItem = item.children[0] as MDCElement
    treeItem.props!.className = aItem.props?.className
    treeItem.props!.dropdownClass = aItem.props?.['dropdown-class']

    if ((item.children?.[0] as MDCElement).tag === 'a') {
      let href = aItem.props?.href

      treeItem.children = JSON.parse(
        JSON.stringify(toRaw(aItem.children) || []),
      )

      // Link to page or list sub-pages
      if (href.startsWith('/') && href.endsWith('/')) {
        href = href.replace(/\/$/, '')
        const dir = navDirFromPath(href, navigation.value)
        if (dir) {
          const parentProps = (item.children[0] as MDCElement).props!
          const children = dir
            .map(child => ({
              type: 'element',
              tag: 'submenu-item',
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

      // Auto-fill empty link with page data
      if (!aItem.children?.length) {
        const page = navPageFromPath(href, navigation.value)
        treeItem.props!.title = page?.title || 'Not found'

        if (aItem.props?.[':icon'] !== 'false' && aItem.props?.icon !== 'false')
          treeItem.props!.icon = aItem.props?.icon || page?.icon
        // treeItem.props.showLinkIcon = true
      }
    }
  }

  return treeItem
}

const hasMdMenu = computed(() => data.value?.body?.children?.length)

const tree = computed<MDCRoot>(() => {
  const grouped = groupElementsAfterElement(
    JSON.parse(JSON.stringify(data.value!.body!.children)),
    ['h1', 'menu-item'],
  )

  const _tree = [] as MDCNode[]
  for (const item of grouped) {
    if (item.tag === 'h1') {
      const convertedItem = convertH1ToMenuItem(item)
      if (convertedItem) _tree.push(convertedItem)
    }
    else if (item.tag === 'menu-item') {
      _tree.push(item)
    }
  }

  return {
    type: 'root',
    children: _tree,
  }
})

// function groupElementsUnderH2(tree: Parent) {
//   const _tree = [] as Node[];
//   let currentH1 = null;

//   for (let index = 0; index < tree.children.length; index++) {
//     const node = tree.children[index];
//     console.log(node, index, tree);
//     if (node.tag !== "h1") {
//       continue; // Skip non-h1 nodes
//     }

//     // If there's a previous h1, we need to stop collecting nodes for it
//     if (currentH1) {
//       currentH1 = null;
//     }

//     // Set the current h1
//     currentH1 = node;
//     let nextH1 = tree.children.findIndex(
//       (value, i) => value.tag === "h1" && i > index
//     );
//     console.log(nextH1);

//     // Find all nodes after the current h1 until the next h1
//     const children =
//       nextH1 !== -1
//         ? between(tree, index, nextH1, (n) => n.tag !== "h1")
//         : findAllAfter(tree, index, (n) => n.tag !== "h1");

//     console.log("children", children, index);
//     // Add these nodes as children of the current h1
//     if (children.length > 0) {
//       currentH1.children.push({
//         type: "element",
//         tag: "template",
//         props: {
//           "v-slot:content": "",
//         },
//         children,
//       });
//     }
//     _tree.push(currentH1);
//   }

//   console.log("trrr", _tree);
//   return _tree;
// }

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
    if (!foundFirstTag && !_tags?.includes(element.tag)) {
      continue // Skip elements before the first tag
    }

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
    else {
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

/**
 * Merge consequent Text nodes into single node
 */
// function mergeTextNodes(nodes: Array<VNode>) {
//   const mergedNodes: Array<VNode> = [];
//   for (const node of nodes) {
//     const previousNode = mergedNodes[mergedNodes.length - 1];
//     if (node.type === Text && previousNode?.type === Text) {
//       previousNode.children = (previousNode.children as string) + node.children;
//     } else {
//       mergedNodes.push(node);
//     }
//   }
//   return mergedNodes;
// }
</script>
