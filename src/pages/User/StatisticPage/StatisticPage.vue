<template>
  <page-template>
    <template #title>
      Статистика
    </template>
    <statistic-panel />
  </page-template>
</template>

<script lang="ts" setup>
import { StatisticPanel } from '@/modules/user/statistic'
import PageTemplate from '@/pages/PageTemplate/PageTemplate.vue'
</script>