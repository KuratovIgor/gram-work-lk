<template>
  <div class="sidebar">
    <sidebar-item
      v-for="(sidebarItem, index) in props.sidebarItems"
      :key="index"
      :page="sidebarItem.page"
      :label="sidebarItem.label"
    >
      <component :is="sidebarItem.icon" />
    </sidebar-item>
  </div>
</template>

<script lang="ts" setup>
import SidebarItem from '@/components/sidebar/SidebarItem.vue'
import type { SidebarItemType } from '@/types/page.type'

type Props = {
  sidebarItems: SidebarItemType[]
}

const props = withDefaults(defineProps<Props>(), {
  sidebarItems: undefined,
})
</script>

<style lang="scss" scoped>
.sidebar {
  height: 100%;
  border-right: 1px solid $color--divider;
  padding: 15px;
}
</style>