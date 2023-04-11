<template>
  <el-tabs>
    <el-tab-pane label="История откликов">
      <response-history-statistic :user-id="userId" />
    </el-tab-pane>
    <el-tab-pane label="Зарплаты по откликам">
      <salary-statistic :user-id="userId" />
    </el-tab-pane>
    <el-tab-pane label="Просмотры резюме">
      <resume-statistic />
    </el-tab-pane>
  </el-tabs>
</template>

<script lang="ts" setup>
import ResponseHistoryStatistic
  from '@/modules/user/statistic/components/responseHistoryStatistic/ResponseHistoryStatistic.vue'
import SalaryStatistic from '@/modules/user/statistic/components/salaryStatistic/SalaryStatistic.vue'
import { getUserId } from '@/utils/cookie'
import ResumeStatistic from '@/modules/user/statistic/components/resumeStatistic/ResumeStatistic.vue'

const userId = getUserId()
</script>