<template>
  <bar-chart
    class="history-chart"
    v-bind="barChartProps"
  />
</template>

<script lang="ts" setup>
import { Chart, registerables } from 'chart.js'
import { BarChart, useBarChart } from 'vue-chart-3'
import { computed } from 'vue'
import { HistoryItemType } from '@/modules/history/types/history.type'
import { uniq } from 'lodash'

type Props = {
  history: HistoryItemType[]
}

const props = withDefaults(defineProps<Props>(), {
  history: undefined,
})

Chart.register(...registerables)

const labels = computed(() => {
  const array = props.history.map((item) => item.date)

  return uniq(array)
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
      backgroundColor: ['#67c23a'],
      borderRadius: 100,
      borderWidth: 3,
    },
    {
      label: 'Отказ',
      data: data.value.map((item) => item.failure),
      backgroundColor: ['#f56c6c'],
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
    },
  },
  scales: {
    x: {
      grid: {
        tickColor: 'transparent',
        drawOnChartArea: false,
      },
    },
    y: {
      grid: {
        tickColor: 'transparent',
        drawBorder: false,
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
  chartData: chartData.value,
  options,
})
</script>

<style lang="scss" scoped>
.history-chart {
  height: 700px;
}
</style>