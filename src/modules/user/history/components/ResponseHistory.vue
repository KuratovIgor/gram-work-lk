<template>
  <el-tabs>
    <el-tab-pane label="История">
      <response-history-tab :user-id="userId" />
    </el-tab-pane>
    <el-tab-pane label="Статистика">
      <response-history-statistic :user-id="userId" />
    </el-tab-pane>
  </el-tabs>
</template>

<script lang="ts" setup>
import ResponseHistoryTab from '@/modules/user/history/components/ResponseHistoryTab.vue'
import { ResponseHistoryStatistic } from '@/modules/user/statistic'
import { getUserId } from '@/utils/cookie'

const userId = getUserId()
</script>