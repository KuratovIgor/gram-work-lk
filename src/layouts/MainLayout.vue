<template>
  <div class="layout">
    <main-header />
    <div class="layout__content">
      <router-view />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { MainHeader } from '@/modules/header/index'
</script>

<style lang="scss" scoped>
.layout {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  &__content {
    height: 100%;
  }
}
</style>