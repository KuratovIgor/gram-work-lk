<template>
  <el-table
    :data="props.history"
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
import { Status } from '@/modules/user/history/constants/constants'
import type { HistoryItemType, StatusFilterType } from '@/modules/user/history/types/history.type'

type Props = {
  history: HistoryItemType[]
}

const props = withDefaults(defineProps<Props>(), {
  history: undefined,
})

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

const handleStatusFilter = (value: string, row: HistoryItemType): boolean => {
  return row.status === value
}
</script>