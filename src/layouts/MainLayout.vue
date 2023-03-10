<template>
  <div class="d-f fd-c h-100">
    <main-header />
    <div class="body">
      <main-sidebar v-if="isUserAuthorized" />
      <router-view />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { MainHeader } from '@/modules/header/index'
import { MainSidebar } from '@/modules/sidebar/index'
import { useAuthStore } from '@/modules/authForm/index'
import { computed } from 'vue'

const authStore = useAuthStore()

const isUserAuthorized = computed(() => authStore.isAuthorized)
</script>