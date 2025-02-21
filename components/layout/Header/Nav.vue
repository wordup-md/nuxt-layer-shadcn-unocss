<template>
  <UiNavigationMenu
    v-if="!tree"
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
    <UiNavigationMenuList>
      <MDCRenderer
        :body="tree"
        :tag="false"
        :components="{
          'header-menu-item': HeaderMenuItem,
          'header-submenu-item': HeaderSubmenuItem,
        }"
      />
    </UiNavigationMenuList>
  </UiNavigationMenu>
</template>

<script setup lang="ts">
import { navigationMenuTriggerStyle } from '../../ui/navigation-menu'
import HeaderMenuItem from './MenuItem.vue'
import HeaderSubmenuItem from './SubmenuItem.vue'

const { nav } = useConfig().value.header

const tree = await useMdcMenu('_menu-header', {
  menuComponentName: 'header-menu-item',
  submenuComponentName: 'header-submenu-item',
})
</script>
