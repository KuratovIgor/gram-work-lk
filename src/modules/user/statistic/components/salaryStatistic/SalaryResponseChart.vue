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

const responses = computed((): number[] => getData(Status.RESPONSE))


const chartData = computed(() => ({
  labels: labels.value,
  datasets: [
    {
      label: 'Отклики',
      data: responses.value,
      fill: true,
      backgroundColor: !isDarkMode.value ? 'rgba(129, 85, 185, 0.2)' : 'rgba(129, 85, 185, 0.5)',
      borderColor: '#8155b9',
      pointBackgroundColor: '#8155b9',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgb(129, 85, 185)'
    },
  ],
}))

const options = computed(() => ({
  plugins: {
    title: {
      display: true,
      text: 'Отклики',
    },
    legend: {
      display: false,
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
    }
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
  height: 300px;
  
  @media (max-width: $screen--sm) {
    height: 100%;
  }

  @media (max-width: $screen--xs) {
    height: 100%;
  }
}
</style>