<template>
  <page-template>
    <template #title>
      История
    </template>
    <response-history />
  </page-template>
</template>

<script lang="ts" setup>
import { ResponseHistory } from '@/modules/user/history'
import PageTemplate from '@/pages/PageTemplate/PageTemplate.vue'
</script>