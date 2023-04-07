<template>
  <el-table
    v-loading="loading"
    class="mb-20"
    :data="paginatedHistory"
    stripe
  >
    <el-table-column
      prop="vacancy"
      label="Вакансия"
      sortable
    />
    <el-table-column
      prop="employer"
      label="Работодатель"
    />
    <el-table-column
      prop="url"
      label="Ссылка"
    >
      <template #default="scope">
        <a
          :href="scope.row.url"
          target="_blank"
        >{{ scope.row.url }}</a>
      </template>
    </el-table-column>
    <el-table-column
      prop="area"
      label="Город"
    />
    <el-table-column label="Зарплата">
      <el-table-column
        prop="salaryFrom"
        label="От"
      />
      <el-table-column
        prop="salaryTo"
        label="До"
      />
    </el-table-column>
    <el-table-column
      prop="date"
      label="Дата"
      sortable
    />
    <el-table-column
      prop="status"
      label="Статус"
      :filters="filters"
      :filter-method="handleStatusFilter"
    >
      <template #default="scope">
        <p 
          class="text-bold"
          :class="{
            'color-red': scope.row.status === Status.FAILURE, 
            'color-success': scope.row.status === Status.INVITATION 
          }"
        >
          {{ scope.row.status }}
        </p>
      </template>
    </el-table-column>
  </el-table>

  <el-pagination
    background
    layout="prev, pager, next"
    :total="history.length"
    :page-size="5"
    @current-change="handlePageChange"
  />
</template>

<script lang="ts" setup>
import { Status } from '@/modules/user/history/constants/constants'
import type { HistoryItemType, StatusFilterType } from '@/modules/user/history/types/history.type'
import { computed, onMounted, reactive, ref, watch } from 'vue'
import { useQuery } from '@vue/apollo-composable'
import { getHistoryQuery } from '@/modules/user/history/api/queries/history.graphql'
import { GLHistoryItem } from '@/modules/user/history/types/graphql.types'
import { getDateFormat } from '@/utils/date'
import { showErrorMessage } from '@/utils/message'

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

const filters: StatusFilterType[] = [
  {
    text: 'Отклик',
    value: 'Отклик'
  },
  {
    text: 'Приглашение',
    value: 'Приглашение'
  },
  {
    text: 'Отказ',
    value: 'Отказ'
  }
]

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

const handleStatusFilter = (value: string, row: HistoryItemType): boolean => {
  return row.status === value
}

const handlePageChange = (nextPage: number): void => {
  page.value = nextPage
}

onMounted((): void => {
  variables.userId = props.userId
})
</script>