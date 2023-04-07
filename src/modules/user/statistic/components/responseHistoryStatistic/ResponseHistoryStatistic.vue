<template>
  <response-history-chart
    v-if="history.length"
    v-loading="loading"
    :history="history"
  />
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
  userId: ''
})

const history = ref<HistoryItemType[]>([])

const { loading, onResult: onGetHistory } = useQuery(getHistoryQuery(), variables)

onGetHistory((queryResult): void => {
  if (queryResult.loading || !queryResult.data.response_historiesList.items.length) return

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

onMounted((): void => {
  variables.userId = props.userId
})
</script>