<template>
  <page-template>
    <template #title>
      Редактирование резюме
    </template>
    <resume-edition />
  </page-template>
</template>

<script lang="ts" setup>
import { ResumeEdition } from '@/modules/user/editResume'
import PageTemplate from '@/pages/PageTemplate/PageTemplate.vue'
</script>