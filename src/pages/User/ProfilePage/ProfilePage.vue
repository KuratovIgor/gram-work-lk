<template>
  <page-template>
    <template #title>
      Профиль
    </template>
    <user-profile />
  </page-template>
</template>

<script lang="ts" setup>
import { UserProfile } from '@/modules/user/profile'
import PageTemplate from '@/pages/PageTemplate/PageTemplate.vue'
</script>