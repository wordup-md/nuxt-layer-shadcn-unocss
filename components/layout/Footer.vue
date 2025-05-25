<template>
  <footer
    class="site-footer border-t mt-6"
    :class="footer.class"
  >
    <div
      v-if="!tree?.children.length"
      class="container flex flex-col items-center justify-between gap-2 md:flex-row p-4 md:px-8"
    >
      <MDC
        v-if="footer.credits"
        :value="$t(footer.credits)"
        class="text-sm"
      />
      <span class="flex-1" />
      <NuxtLink
        v-for="(link, i) in footer.links"
        :key="i"
        :to="link?.to"
        :target="link?.target"
      >
        <UiButton
          variant="ghost"
          :size="link?.icon && !link?.title ? 'icon' : 'default'"
          class="flex gap-2"
        >
          <Icon
            v-if="link?.icon"
            :name="link.icon"
            :size="20"
          />
          <span v-if="link?.title">{{ $t(link.title) }}</span>
        </UiButton>
      </NuxtLink>

      <CmsAuth>
        <template #default="{ login }">
          <UiButton
            variant="ghost"
            @click="login()"
          >
            Admin
          </UiButton>
        </template>
      </CmsAuth>
    </div>

    <MDCRenderer
      v-else
      :body="tree"
      class="min-h-10"
      :class="{ 'container grid grid-cols-3 gap-6 p-4 md:px-8': !!tree }"
      :components="{
        'footer-item': FooterItem,
        'footer-submenu-item': FooterSubmenuItem,
      }"
    />
  </footer>
</template>

<script setup lang="ts">
import FooterItem from './FooterItem.vue'
import FooterSubmenuItem from './FooterSubmenuItem.vue'

const { footer } = useConfig().value

const menu = '/_menu-footer'
const { data: count } = await useAsyncData(menu + '-count', () => queryContent(menu).count())

let tree = undefined
if (count.value) {
  const { data } = await useAsyncData(menu, () =>
    queryContent(menu).findOne(),
  )
  tree = await useMdcMenu(data, {
    menuComponentName: 'footer-item',
    submenuComponentName: 'footer-submenu-item',
  })
}
</script>
