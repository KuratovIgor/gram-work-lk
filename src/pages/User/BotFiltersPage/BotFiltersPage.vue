<template>
  <page-template>
    <template #title>
      Фильтры для бота
    </template>
    <bot-filters />
  </page-template>
</template>

<script lang="ts" setup>
import { BotFilters } from '@/modules/user/filters'
import PageTemplate from '@/pages/PageTemplate/PageTemplate.vue'
</script>