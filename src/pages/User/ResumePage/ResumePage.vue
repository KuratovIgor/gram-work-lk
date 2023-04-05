<template>
  <page-template>
    <template #title>
      Резюме
    </template>
    <resume-tabs />
  </page-template>
</template>

<script lang="ts" setup>
import { ResumeTabs } from '@/modules/user/resume'
import PageTemplate from '@/pages/PageTemplate/PageTemplate.vue'
</script>