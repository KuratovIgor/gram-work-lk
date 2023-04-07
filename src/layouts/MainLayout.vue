<template>
  <div class="d-f fd-c h-100">
    <main-header @drawer="handleDrawerOpen" />
    <div class="body">
      <template v-if="isUserAuthorized">
        <template v-if="isAdmin">
          <admin-drawer
            v-if="isMobile"
            :is-drawer-visible="isDrawerVisible"
            @close="handleDrawerClose"
          />
          <admin-sidebar v-else />
        </template>
        <template v-else>
          <user-drawer
            v-if="isMobile"
            :is-drawer-visible="isDrawerVisible"
            @close="handleDrawerClose"
          />
          <main-sidebar v-else />
        </template>
      </template>
      <router-view />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { MainHeader } from '@/modules/user/header'
import { MainSidebar } from '@/modules/user/sidebar'
import { AdminSidebar } from '@/modules/admin/sidebar'
import { AdminDrawer } from '@/modules/admin/drawer'
import { UserDrawer } from '@/modules/user/drawer'
import { useUserStore } from '@/stores/user.store'
import { computed, getCurrentInstance, ref } from 'vue'

const userStore = useUserStore()

const screenSize = computed(() => getCurrentInstance()?.appContext.config.globalProperties?.$screen?.size)
const isMobile = computed(() => !screenSize.value || screenSize.value === 'xs')

const isUserAuthorized = computed(() => userStore.isAuthorized)
const isAdmin = computed(() => userStore.isAdmin)

const isDrawerVisible = ref(false)

const handleDrawerOpen = (): void => {
  isDrawerVisible.value = true
}

const handleDrawerClose = (): void => {
  isDrawerVisible.value = false
}
</script>