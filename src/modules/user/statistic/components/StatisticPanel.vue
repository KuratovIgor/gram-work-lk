<template>
  <el-tabs>
    <el-tab-pane label="История откликов">
      <response-history-statistic :user-id="userId" />
    </el-tab-pane>
    <el-tab-pane label="Зарплаты по откликам">
      <salary-statistic :user-id="userId" />
    </el-tab-pane>
    <el-tab-pane label="Соотношение откликов к ответам">
      <ratio-statistic :user-id="userId" />
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
import ResumeStatistic from '@/modules/user/statistic/components/resumeStatistic/ResumeStatistic.vue'
import RatioStatistic from '@/modules/user/statistic/components/ratioStatistic/RatioStatistic.vue'
import { getUserId } from '@/utils/cookie'

const userId = getUserId()
</script>