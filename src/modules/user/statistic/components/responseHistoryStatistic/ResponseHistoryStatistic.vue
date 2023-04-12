<template>
  <el-date-picker
    v-model="variables.month"
    class="mb-20"
    type="month"
    format="MMMM"
    value-format="MM"
    placeholder="Выберите месяц"
    @change="handleDateChange"
  />
  <response-history-chart
    v-if="history.length"
    v-loading="loading"
    :history="history"
  />
  <div
    v-else
    class="title d-f jc-c color-red"
  >
    Нет данных
  </div>
</template>

<script lang="ts" setup>
import ResponseHistoryChart from '@/modules/user/statistic/components/responseHistoryStatistic/ResponseHistoryChart.vue'
import { onMounted, reactive, ref, watch } from 'vue'
import { useQuery } from '@vue/apollo-composable'
import { getHistoryQuery } from '@/modules/user/statistic/api/queries/history.graphql'
import type { GLHistoryItem } from '@/modules/user/statistic/types/graphql.types'
import { getDateFormat } from '@/utils/date'
import type { HistoryItemType } from '@/modules/user/statistic/types/history.type'

type Props = {
  userId: string,
}

const props = withDefaults(defineProps<Props>(), {
  userId: '',
})

const variables = reactive({
  userId: '',
  month: '',
})

const history = ref<HistoryItemType[]>([])

const { loading, onResult: onGetHistory } = useQuery(getHistoryQuery(), variables)

onGetHistory((queryResult): void => {
  if (queryResult.loading) return

  history.value = []

  queryResult.data.response_historiesList.items.forEach((item: GLHistoryItem): void => {
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

watch(() => props.userId, () => {
  variables.userId = props.userId
})

const handleDateChange = (month: string): void => {
  variables.month = month ?? ''
}

onMounted((): void => {
  variables.userId = props.userId

  variables.month = ''
})
</script>