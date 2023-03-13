<template>
  <el-tabs
    v-model="activeTab"
    v-loading="loading"
  >
    <el-tab-pane label="История">
      <response-history-tab :history="history" />
    </el-tab-pane>
    <el-tab-pane label="Статистика">
      <history-statistic
        v-if="history.length"
        :history="history"
      />
    </el-tab-pane>
  </el-tabs>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref, watch } from 'vue'
import ResponseHistoryTab from '@/modules/history/components/ResponseHistoryTab.vue'
import HistoryStatistic from '@/modules/history/components/HistoryStatistic.vue'
import { useQuery } from '@vue/apollo-composable'
import { getHistoryQuery } from '@/modules/history/api/queries/history.graphql'
import { HistoryItemType } from '@/modules/history/types/history.type'
import { GLHistoryItem } from '@/modules/history/types/graphql.types'
import { getUserId } from '@/modules/history/helpers/history.helper'
import { getDateFormat } from '@/modules/history/helpers/date.helper'

const variables = reactive({
  userId: ''
})

const { result, loading } = useQuery(getHistoryQuery(), variables)

const activeTab = ref('0')
const history = ref<HistoryItemType[]>([])

watch(() => result.value, (value) => {
  value.response_historiesList.items.forEach((item: GLHistoryItem): void => {
    history.value.push({
      area: item.area,
      date: getDateFormat(new Date(item.date), 'dd MMMM yyyy'),
      employer: item.employer,
      salaryFrom: item.salary_from,
      salaryTo: item.salary_to,
      status: item.status,
      url: item.alternate_url,
      vacancy: item.vacancy_name
    })
  })
})

onMounted((): void => {
  variables.userId = getUserId()
})
</script>