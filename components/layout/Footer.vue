<template>
  <footer
    class="site-footer border-t mt-2 p-2"
  >
    <div
      v-if="!tree?.children.length"
      class="container flex flex-col items-center justify-between gap-2 md:flex-row"
    >
      <MDC
        :value="footer.credits"
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
          <SmartIcon
            v-if="link?.icon"
            :name="link.icon"
            :size="20"
          />
          <span v-if="link?.title">{{ link.title }}</span>
        </UiButton>
      </NuxtLink>

      <CmsAuth>
        <template #default="{ login }">
          <UiButton
            variant="ghost"
            @click="login()"
          >
            Admin
          </Uibutton>
        </template>
      </CmsAuth>
    </div>

    <MDCRenderer
      v-else
      :body="tree"
      class=""
      :class="{ 'container grid grid-cols-3 gap-6': !!tree }"
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

const tree = await useMdcMenu('/_menu-footer', {
  menuComponentName: 'footer-item',
  submenuComponentName: 'footer-submenu-item',
})
</script>
