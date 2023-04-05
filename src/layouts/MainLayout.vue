<template>
  <div class="d-f fd-c h-100">
    <main-header />
    <div class="body">
      <main-sidebar v-if="isUserAuthorized && !isAdmin" />
      <admin-sidebar v-if="isUserAuthorized && isAdmin" />
      <router-view />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { MainHeader } from '@/modules/user/header'
import { MainSidebar } from '@/modules/user/sidebar'
import { AdminSidebar } from '@/modules/admin/sidebar'
import { useUserStore } from '@/stores/user.store'
import { computed } from 'vue'

const userStore = useUserStore()

const isUserAuthorized = computed(() => userStore.isAuthorized)
const isAdmin = computed(() => userStore.isAdmin)
</script>