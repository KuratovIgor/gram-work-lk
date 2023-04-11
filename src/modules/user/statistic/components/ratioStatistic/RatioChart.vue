<template>
  <doughnut-chart
    class="doughnut-chart"
    v-bind="doughnutChartProps"
  />
</template>

<script lang="ts" setup>
import { Chart, registerables } from 'chart.js'
import { DoughnutChart, useDoughnutChart } from 'vue-chart-3'
import { computed, getCurrentInstance } from 'vue'

const screenSize = computed(() => getCurrentInstance()?.appContext.config.globalProperties?.$screen?.size)
const isMobile = computed(() => !screenSize.value || screenSize.value === 'xs')

type Props = {
  invitations: number
  failures: number
  responses: number
}

const props = withDefaults(defineProps<Props>(), {
  responses: 10,
  failures: 10,
  invitations: 10,
})

Chart.register(...registerables)

const labels = computed(() => ['Отклики', 'Приглашения', 'Отказы'])
const data = computed(() => [props.responses, props.invitations, props.failures])

const chartData = computed(() => ({
  labels: labels.value,
  datasets: [
    {
      label: 'Количество откликов',
      data: data.value,
      backgroundColor: ['#8155b9', '#67c23a', '#f56c6c'],
    },
  ],
}))

let delayed: boolean

const options = computed(() => ({
  indexAxis: 'x',
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: true,
      position: 'bottom',
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

const { doughnutChartProps } = useDoughnutChart({
  chartData: chartData.value,
  options,
})
</script>

<style lang="scss" scoped>
.doughnut-chart {
  height: 600px;

  @media (max-width: $screen--xs) {
    height: 350px;
  }
}
</style>