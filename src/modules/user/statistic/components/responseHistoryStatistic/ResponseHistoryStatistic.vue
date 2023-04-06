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
import { GLHistoryItem } from '@/modules/user/statistic/types/graphql.types'
import { getDateFormat } from '@/utils/date'
import { HistoryItemType } from '@/modules/user/statistic/types/history.type'

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

const { result, loading, refetch } = useQuery(getHistoryQuery(), variables)

watch(() => result.value, (value): void => {
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
  refetch()

  variables.userId = props.userId
})
</script>