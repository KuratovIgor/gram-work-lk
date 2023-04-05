<template>
  <div class="sidebar">
    <sidebar-item
      v-for="(sidebarItem, index) in ADMIN_SIDEBAR_ITEMS"
      :key="index"
      :page="sidebarItem.page"
      :label="sidebarItem.label"
    >
      <component :is="sidebarItem.icon" />
    </sidebar-item>
  </div>
</template>

<script lang="ts" setup>
import { ADMIN_SIDEBAR_ITEMS } from '@/modules/admin/sidebar/constants/sidebar'
import SidebarItem from '@/modules/user/sidebar/components/SidebarItem.vue'
</script>

<style lang="scss" scoped>
.sidebar {
  height: 100%;
  border-right: 1px solid $color--divider;
  padding: 15px;
}
</style>