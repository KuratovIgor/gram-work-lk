<template>
  <el-tabs>
    <el-tab-pane label="История откликов">
      <response-history-statistic
        v-if="userId"
        :user-id="userId"
      />
      <div
        v-else
        class="title color-red"
      >
        Выберите пользователя для просмотра статистики
      </div>
    </el-tab-pane>
    <el-tab-pane label="Зарплаты по откликам">
      <salary-statistic
        v-if="userId"
        :user-id="userId"
      />
      <div
        v-else
        class="title color-red"
      >
        Выберите пользователя для просмотра статистики
      </div>
    </el-tab-pane>
  </el-tabs>
</template>

<script lang="ts" setup>
import { ResponseHistoryStatistic, SalaryStatistic } from '@/modules/user/statistic'
import { useRoute } from 'vue-router'
import { computed } from 'vue'

const route = useRoute()

const userId = computed((): string => route.query['user-id'] ? route.query['user-id'].toString() : '')
</script>