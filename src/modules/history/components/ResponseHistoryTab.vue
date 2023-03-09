<template>
  <el-table
    :data="history"
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
        prop="salary_from"
        label="От"
      />
      <el-table-column
        prop="salary_to"
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
    />
  </el-table>
</template>

<script lang="ts" setup>
interface HistoryItem {
  vacancy: string
  employer: string
  url: string
  area: string
  salary_from: number
  salary_to: number
  date: string
  status: string
}

const history = [
  {
    vacancy: 'Бармен',
    employer: 'ШашлыкоФФ',
    url: 'https://hh.ru/vacancy/76732074',
    area: 'Москва',
    salary_from: 15000,
    salary_to: 40000,
    date: '01-01-2000',
    status: 'Отказ',
  },
  {
    vacancy: 'Бармен',
    employer: 'ШашлыкоФФ',
    url: 'https://hh.ru/vacancy/76732074',
    area: 'Москва',
    salary_from: 15000,
    salary_to: 40000,
    date: '01-01-2000',
    status: 'Отказ',
  },
  {
    vacancy: 'Бармен',
    employer: 'ШашлыкоФФ',
    url: 'https://hh.ru/vacancy/76732074',
    area: 'Москва',
    salary_from: 15000,
    salary_to: 40000,
    date: '01-01-2000',
    status: 'Отказ',
  },
  {
    vacancy: 'Бармен',
    employer: 'ШашлыкоФФ',
    url: 'https://hh.ru/vacancy/76732074',
    area: 'Москва',
    salary_from: 15000,
    salary_to: 40000,
    date: '01-01-2000',
    status: 'Отказ',
  },
  {
    vacancy: 'Бармен',
    employer: 'ШашлыкоФФ',
    url: 'https://hh.ru/vacancy/76732074',
    area: 'Москва',
    salary_from: 15000,
    salary_to: 40000,
    date: '01-01-2000',
    status: 'Отказ',
  },
  {
    vacancy: 'Бармен',
    employer: 'ШашлыкоФФ',
    url: 'https://hh.ru/vacancy/76732074',
    area: 'Москва',
    salary_from: 15000,
    salary_to: 40000,
    date: '01-01-2000',
    status: 'Отказ',
  },
  {
    vacancy: 'Бармен',
    employer: 'ШашлыкоФФ',
    url: 'https://hh.ru/vacancy/76732074',
    area: 'Москва',
    salary_from: 15000,
    salary_to: 40000,
    date: '01-01-2000',
    status: 'Отказ',
  },
  {
    vacancy: 'Бармен',
    employer: 'ШашлыкоФФ',
    url: 'https://hh.ru/vacancy/76732074',
    area: 'Москва',
    salary_from: 15000,
    salary_to: 40000,
    date: '01-01-2000',
    status: 'Отказ',
  },
  {
    vacancy: 'Бармен',
    employer: 'ШашлыкоФФ',
    url: 'https://hh.ru/vacancy/76732074',
    area: 'Москва',
    salary_from: 15000,
    salary_to: 40000,
    date: '01-01-2000',
    status: 'Отказ',
  },
  {
    vacancy: 'Бармен',
    employer: 'ШашлыкоФФ',
    url: 'https://hh.ru/vacancy/76732074',
    area: 'Москва',
    salary_from: 15000,
    salary_to: 40000,
    date: '01-01-2000',
    status: 'Отказ',
  },
  {
    vacancy: 'Бармен',
    employer: 'ШашлыкоФФ',
    url: 'https://hh.ru/vacancy/76732074',
    area: 'Москва',
    salary_from: 15000,
    salary_to: 40000,
    date: '01-01-2000',
    status: 'Отказ',
  },
  {
    vacancy: 'Аармен',
    employer: 'ШашлыкоФФ',
    url: 'https://hh.ru/vacancy/76732074',
    area: 'Москва',
    salary_from: 15000,
    salary_to: 40000,
    date: '01-09-2000',
    status: 'Отклик',
  },
  {
    vacancy: 'Сармен',
    employer: 'ШашлыкоФФ',
    url: 'https://hh.ru/vacancy/76732074',
    area: 'Москва',
    salary_from: 15000,
    salary_to: 40000,
    date: '01-02-2000',
    status: 'Приглашение',
  }
]

const filters = [
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

const handleStatusFilter = (value: string, row: HistoryItem) => {
  return row.status === value
}
</script>