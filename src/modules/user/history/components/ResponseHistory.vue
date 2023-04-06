<template>
  <el-tabs
    v-model="activeTab"
    v-loading="loading"
  >
    <el-tab-pane label="История">
      <response-history-table
        class="mb-20"
        :history="paginatedHistory"
      />
      <el-pagination
        background
        layout="prev, pager, next"
        :total="history.length"
        :page-size="5"
        @current-change="handlePageChange"
      />
    </el-tab-pane>
    <el-tab-pane label="Статистика">
      <response-history-statistic />
    </el-tab-pane>
  </el-tabs>
</template>

<script lang="ts" setup>
import { computed, onMounted, reactive, ref, watch } from 'vue'
import ResponseHistoryTable from '@/modules/user/history/components/ResponseHistoryTable.vue'
import { ResponseHistoryStatistic } from '@/modules/user/statistic'
import { useQuery } from '@vue/apollo-composable'
import { getHistoryQuery } from '@/modules/user/history/api/queries/history.graphql'
import type { HistoryItemType } from '@/modules/user/history/types/history.type'
import type { GLHistoryItem } from '@/modules/user/history/types/graphql.types'
import { getUserId } from '@/utils/cookie'
import { getDateFormat } from '@/utils/date'

const variables = reactive({
  userId: '',
})

const { result, loading } = useQuery(getHistoryQuery(), variables)

const activeTab = ref('0')
const history = ref<HistoryItemType[]>([])
const page = ref(1)

const paginatedHistory = computed((): HistoryItemType[] =>
    history.value.filter((item, index) => index < page.value * 5 && index > (page.value - 1) * 5 - 1))

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

const handlePageChange = (nextPage: number): void => {
  page.value = nextPage
}

onMounted((): void => {
  variables.userId = getUserId()
})
</script>