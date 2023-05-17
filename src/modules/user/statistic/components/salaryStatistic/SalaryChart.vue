<template>
  <radar-chart
    class="radar-chart"
    v-bind="radarChartProps"
  />
</template>

<script lang="ts" setup>
import { Chart, registerables } from 'chart.js'
import { RadarChart, useRadarChart } from 'vue-chart-3'
import { computed } from 'vue'
import type { SalaryType } from '@/modules/user/statistic/types/salary.type'
import { Status } from '@/modules/user/statistic/constants/constants'
import { useDarkMode } from '@/composables/darkMode'

const { isDarkMode } = useDarkMode()

Chart.register(...registerables)

type Props = {
  salaries: SalaryType[]
}

const props = withDefaults(defineProps<Props>(), {
  salaries: undefined
})

const labels = computed(() => [
  '<= 30 000',
  '30 000 - 60 000',
  '60 000 - 80 000',
  '80 000 - 100 000',
  '100 000+',
])

const invitations = computed((): number[] => getData(Status.INVITATION))
const failures = computed((): number[] => getData(Status.FAILURE))
const responses = computed((): number[] => getData(Status.RESPONSE))

const chartData = computed(() => ({
  labels: labels.value,
  datasets: [
    {
      label: 'Отказы',
      data: failures.value,
      fill: true,
      backgroundColor: !isDarkMode.value ? 'rgba(255, 99, 132, 0.2)' : 'rgba(178, 82, 82, 0.5)',
      borderColor: !isDarkMode.value ? ['#f56c6c'] : ['#b25252'],
      pointBackgroundColor: !isDarkMode.value ? ['#f56c6c'] : ['#b25252'],
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgb(255, 99, 132)',
    },
    {
      label: 'Приглашения',
      data: invitations.value,
      fill: true,
      backgroundColor: !isDarkMode.value ? 'rgba(103, 194, 58, 0.2)' : 'rgba(78, 142, 47, 0.5)',
      borderColor: !isDarkMode.value ? ['#67c23a'] : ['#4e8e2f'],
      pointBackgroundColor: !isDarkMode.value ? ['#67c23a'] : ['#4e8e2f'],
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgb(103, 194, 58)',
    },
    {
      label: 'Отклики',
      data: responses.value,
      fill: true,
      backgroundColor: !isDarkMode.value ? 'rgba(129, 85, 185, 0.2)' : 'rgba(129, 85, 185, 0.5)',
      borderColor: '#8155b9',
      pointBackgroundColor: '#8155b9',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgb(129, 85, 185)',
    },
  ],
}))

const options = computed(() => ({
  plugins: {
    legend: {
      position: 'bottom',
      display: true,
      labels: {
        color: '#a6a9ad',
      },
    },
  },
  elements: {
    line: {
      borderWidth: 1,
    }
  },
  scales: {
    r: {
      min: 0,
      ticks: {
        stepSize: 1,
      },
      angleLines: {
        display: true,
      },
      grid: isDarkMode.value ? {
        color: '#a6a9ad',
      } : {},
    },
  }
}))

const getData = (status: Status): number[] => {
  const result: number[] = [0, 0, 0, 0, 0]

  const salaries = props.salaries.filter((item) => item.status === status)

  salaries.forEach((item: SalaryType): void => {
    const salary = item.salaryFrom ? item.salaryFrom : item.salaryTo

    if (salary <= 30000) result[0]++
    if (salary > 30000 && salary <= 60000) result[1]++
    if (salary > 60000 && salary <= 80000) result[2]++
    if (salary > 80000 && salary <= 100000) result[3]++
    if (salary > 100000) result[4]++
  })

  return result
}

const { radarChartProps } = useRadarChart({
  chartData,
  options,
})
</script>

<style lang="scss" scoped>
.radar-chart {
  height: 100%;
}
</style>