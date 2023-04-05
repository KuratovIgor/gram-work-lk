<template>
  <page-template>
    <template #title>
      Профиль
    </template>
    <admin-profile />
  </page-template>
</template>

<script lang="ts" setup>
import { AdminProfile } from '@/modules/admin/profile'
import PageTemplate from '@/pages/PageTemplate/PageTemplate.vue'
</script>