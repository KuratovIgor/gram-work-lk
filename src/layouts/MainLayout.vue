<template>
  <div class="w-100 h-100 d-f fd-c">
    <main-header />
    <div class="d-f h-100">
      <main-sidebar />
      <div class="p-25 w-100">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { MainHeader } from '@/modules/header/index'
import { MainSidebar } from '@/modules/sidebar/index'
</script>