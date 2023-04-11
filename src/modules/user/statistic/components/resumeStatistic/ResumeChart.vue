<template>
  <line-chart
    class="history-chart"
    v-bind="lineChartProps"
  />
</template>

<script lang="ts" setup>
import { Chart, registerables } from 'chart.js'
import { LineChart, useLineChart } from 'vue-chart-3'
import { computed, getCurrentInstance } from 'vue'
import type { ResumeViewsType } from '@/modules/user/statistic/types/view.type'
import { uniq } from 'lodash'

const screenSize = computed(() => getCurrentInstance()?.appContext.config.globalProperties?.$screen?.size)
const isMobile = computed(() => !screenSize.value || screenSize.value === 'xs')

type Props = {
  views: ResumeViewsType[]
}

const props = withDefaults(defineProps<Props>(), {
  views: undefined,
})

Chart.register(...registerables)

const labels = computed(() => {
  const array = props.views.map((view) => view.date).reverse()

  if (!isMobile.value) {
    return uniq(array)
  }

  if (uniq(array).length <= 3) return uniq(array)

  return [uniq(array)[uniq(array).length - 3], uniq(array)[uniq(array).length - 2], uniq(array)[uniq(array).length - 1]]
})
const data = computed(() => props.views.map((view) => view.views))

const chartData = computed(() => ({
  labels: labels.value,
  datasets: [
    {
      label: 'Количество откликов',
      data: data.value,
      backgroundColor: 'rgba(129, 85, 185, 0.4)',
      borderWidth: 3,
      borderColor: 'rgb(75, 192, 192)',
      tension: 0.2,
      fill: true,
    },
  ],
}))

let delayed: boolean

const options = computed(() => ({
  indexAxis: 'x',
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      callbacks: {
        footer: (tooltipItems: any) => {
          console.log(tooltipItems)

          const companies =
              props.views.filter((view) => view.date === tooltipItems[0].label).map((view) => view.companies)[0]

          let result = '\nКомпании:\n'

          companies.forEach((company) => {
            result += `${company}\n`
          })

          return result
        },
      },
    },
  },
  animation: {
    onComplete: () => {
      delayed = true
    },
    delay: (context: any) => {
      let delay = 0

      if (context.type === 'data' && context.mode === 'default' && !delayed) {
        delay = context.dataIndex * 300 + context.datasetIndex * 100
      }

      return delay
    },
  }
}))

const { lineChartProps } = useLineChart({
  chartData: chartData.value,
  options,
})
</script>

<style lang="scss" scoped>
.history-chart {
  height: 700px;
}
</style>