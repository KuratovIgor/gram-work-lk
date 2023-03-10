<template>
  <el-table
    v-loading.body="loading"
    :data="history"
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
</template>

<script lang="ts" setup>
import { useQuery } from '@vue/apollo-composable'
import { getHistoryQuery } from '@/modules/history/api/queries/history.graphql'
import { onMounted, reactive, ref, watch } from 'vue'
import { getUserId } from '@/modules/history/helpers/history.helper'
import { Status } from '@/modules/history/constants/constants'
import type { HistoryItemType, StatusFilterType } from '@/modules/history/types/history.type'
import type { GLHistoryItem } from '@/modules/history/types/graphql.types'

const variables = reactive({
  userId: 'asd'
})

const { result, loading } = useQuery(getHistoryQuery(), variables)

const history = ref<HistoryItemType[]>([])

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

watch(() => result.value, (value) => {
  value.response_historiesList.items.forEach((item: GLHistoryItem): void => {
    history.value.push({
      area: item.area,
      date: item.date,
      employer: item.employer,
      salaryFrom: item.salary_from,
      salaryTo: item.salary_to,
      status: item.status,
      url: item.alternate_url,
      vacancy: item.vacancy_name
    })
  })
})

const handleStatusFilter = (value: string, row: HistoryItemType): boolean => {
  return row.status === value
}

onMounted((): void => {
  variables.userId = getUserId()
})
</script>