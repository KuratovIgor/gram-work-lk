<template>
  <el-tabs
    v-model="activeTab"
  >
    <el-tab-pane label="История откликов">
      <response-history-statistic />
    </el-tab-pane>
    <el-tab-pane label="Зарплаты по откликам">
      <salary-statistic />
    </el-tab-pane>
  </el-tabs>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import ResponseHistoryStatistic
  from '@/modules/statistic/components/responseHistoryStatistic/ResponseHistoryStatistic.vue'
import SalaryStatistic from '@/modules/statistic/components/salaryStatistic/SalaryStatistic.vue'

const activeTab = ref('0')
</script>