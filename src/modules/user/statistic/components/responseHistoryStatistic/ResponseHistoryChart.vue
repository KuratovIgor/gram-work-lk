<template>
  <bar-chart
    class="history-chart"
    v-bind="barChartProps"
  />
</template>

<script lang="ts" setup>
import { Chart, registerables } from 'chart.js'
import { BarChart, useBarChart } from 'vue-chart-3'
import { computed, getCurrentInstance } from 'vue'
import type { HistoryItemType } from '@/modules/user/history/types/history.type'
import { uniq } from 'lodash'
import { useDarkMode } from '@/composables/darkMode'

const { isDarkMode } = useDarkMode()

const screenSize = computed(() => getCurrentInstance()?.appContext.config.globalProperties?.$screen?.size)
const isMobile = computed(() => !screenSize.value || screenSize.value === 'xs')

type Props = {
  history: HistoryItemType[]
}

const props = withDefaults(defineProps<Props>(), {
  history: undefined,
})

Chart.register(...registerables)

const labels = computed(() => {
  const array = props.history.map((item) => item.date)

  if (!isMobile.value) {
    return uniq(array)
  }

  if (uniq(array).length <= 3) return uniq(array)

  return [uniq(array)[uniq(array).length - 3], uniq(array)[uniq(array).length - 2], uniq(array)[uniq(array).length - 1]]
})

const data = computed(() => {
  const result: any[] = []

  labels.value.forEach((date) => {
    const resItem = {
      invitation: 0,
      failure: 0,
      response: 0,
    }

    props.history.forEach((item) => {
      if (item.date === date) {
        switch (item.status) {
          case 'Отклик':
            resItem.response++

            break
          case 'Приглашение':
            resItem.invitation++

            break
          case 'Отказ':
            resItem.failure++

            break
        }
      }
    })

    result.push(resItem)
  })

  return result
})

const chartData = computed(() => ({
  labels: labels.value,
  datasets: [
    {
      label: 'Приглашение',
      data: data.value.map((item) => item.invitation),
      backgroundColor: !isDarkMode.value ? ['#67c23a'] : ['#4e8e2f'],
      borderRadius: 100,
      borderWidth: 3,
    },
    {
      label: 'Отказ',
      data: data.value.map((item) => item.failure),
      backgroundColor: !isDarkMode.value ? ['#f56c6c'] : ['#b25252'],
      borderRadius: 100,
      borderWidth: 3,
    },
    {
      label: 'Отклик',
      data: data.value.map((item) => item.response),
      backgroundColor: ['#8155b9'],
      borderRadius: 100,
      borderWidth: 3,
    }
  ],
}))

let delayed: boolean

const options = computed(() => ({
  indexAxis: 'x',
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'bottom',
      display: true,
      labels: {
        color: '#a6a9ad',
      },
    },
  },
  scales: {
    x: {
      grid: {
        tickColor: 'transparent',
        drawOnChartArea: false,
      },
      ticks: {
        color: '#a6a9ad',
      },
    },
    y: {
      grid: {
        tickColor: 'transparent',
        drawBorder: false,
      },
      ticks: {
        color: '#a6a9ad',
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

const { barChartProps } = useBarChart({
  chartData,
  options,
})
</script>

<style lang="scss" scoped>
.history-chart {
  height: 600px;

  @media (max-width: $screen--xs) {
    height: 100%;
  }
}
</style>