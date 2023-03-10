<template>
  <div class="page-content">
    <h1>История</h1>
    <el-scrollbar class="page-card">
      <response-history />
    </el-scrollbar>
  </div>
</template>

<script lang="ts" setup>
import { ResponseHistory } from '@/modules/history/index'
</script>