<template>
  <response-history-table
    v-if="!isMobile && !isTablet"
    v-loading="loading"
    :history="paginatedHistory"
  />
  <history-cards
    v-else
    v-loading="loading"
    :history="paginatedHistory"
  />
  <el-pagination
    background
    layout="prev, pager, next"
    :total="history.length"
    :page-size="5"
    @current-change="handlePageChange"
  />
</template>

<script lang="ts" setup>
import { computed, onMounted, reactive, ref, watch, getCurrentInstance } from 'vue'
import type { HistoryItemType } from '@/modules/user/history/types/history.type'
import { useQuery } from '@vue/apollo-composable'
import { getHistoryQuery } from '@/modules/user/history/api/queries/history.graphql'
import ResponseHistoryTable from '@/modules/user/history/components/ResponseHistoryTable.vue'
import type { GLHistoryItem } from '@/modules/user/history/types/graphql.types'
import { getDateFormat } from '@/utils/date'
import HistoryCards from '@/modules/user/history/components/HistoryCards.vue'

const screenSize = computed(() => getCurrentInstance()?.appContext.config.globalProperties?.$screen?.size)
const isMobile = computed(() => !screenSize.value || screenSize.value === 'xs')
const isTablet = computed(() => !screenSize.value || screenSize.value === 'sm')


type Props = {
  userId: string
}

const props = withDefaults(defineProps<Props>(), {
  userId: '',
})

const variables = reactive({
  userId: '',
})

const history = ref<HistoryItemType[]>([])
const page = ref(1)

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

const paginatedHistory = computed((): HistoryItemType[] =>
    history.value.filter((item, index) => index < page.value * 5 && index > (page.value - 1) * 5 - 1))

watch(() => props.userId, () => {
  variables.userId = props.userId
})

const handlePageChange = (nextPage: number): void => {
  page.value = nextPage
}

onMounted((): void => {
  variables.userId = props.userId
})
</script>