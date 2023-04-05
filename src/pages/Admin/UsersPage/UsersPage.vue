<template>
  <page-template>
    <template #title>
      Пользователи
    </template>
    <users-list />
  </page-template>
</template>

<script setup lang="ts">
import { UsersList } from '@/modules/admin/users'
import PageTemplate from '@/pages/PageTemplate/PageTemplate.vue'
</script>