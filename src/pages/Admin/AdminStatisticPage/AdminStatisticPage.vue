<template>
  <page-template>
    <template #title>
      Статистика
    </template>
    <statistic-panel />
  </page-template>
</template>

<script setup lang="ts">
import { StatisticPanel } from '@/modules/admin/statistic'
import PageTemplate from '@/pages/PageTemplate/PageTemplate.vue'
</script>