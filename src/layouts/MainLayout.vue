<template>
  <div
    class="layout d-f fd-c h-100"
    :class="{ 'dark-mode': isDarkMode }"
  >
    <main-header @drawer="handleDrawerOpen" />
    <div class="body">
      <template v-if="isUserAuthorized">
        <mobile-drawer
          v-if="isMobile"
          :is-drawer-visible="isDrawerVisible"
          :sidebar-items="sidebarItems"
          @close="handleDrawerClose"
        />
        <main-sidebar
          v-else
          :sidebar-items="sidebarItems"
        />
      </template>
      <router-view />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { MainHeader } from '@/modules/user/header'
import MainSidebar from '@/components/sidebar/MainSidebar.vue'
import { useUserStore } from '@/stores/user.store'
import { computed, getCurrentInstance, ref, watch } from 'vue'
import MobileDrawer from '@/components/drawer/MobileDrawer.vue'
import { USER_SIDEBAR_ITEMS, ADMIN_SIDEBAR_ITEMS } from '@/utils/sidebar'
import { useDarkMode } from '@/composables/darkMode'

const userStore = useUserStore()

const { isDarkMode } = useDarkMode()

const isDrawerVisible = ref(false)

const screenSize = computed(() => getCurrentInstance()?.appContext.config.globalProperties?.$screen?.size)
const isMobile = computed(() => !screenSize.value || screenSize.value === 'xs')

const isUserAuthorized = computed(() => userStore.isAuthorized)
const sidebarItems = computed(() => userStore.isAdmin ? ADMIN_SIDEBAR_ITEMS : USER_SIDEBAR_ITEMS)

watch(() => isDarkMode.value, (newValue) => {
  if (newValue) {
    document.querySelector('body')?.classList.add('dark-mode')
  } else {
    document.querySelector('body')?.classList.remove('dark-mode')
  }
})

const handleDrawerOpen = (): void => {
  isDrawerVisible.value = true
}

const handleDrawerClose = (): void => {
  isDrawerVisible.value = false
}
</script>