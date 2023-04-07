<template>
  <el-row>
    <el-col :span="totalChartSpan">
      <salary-chart
        v-if="salaries.length"
        v-loading="loading"
        :salaries="salaries"
      />
    </el-col>
    <div
      v-if="isMobile"
      class="horizontal-divider"
    />
    <el-col
      v-else
      :span="1"
    >
      <div class="vertical-divider" />
    </el-col>
    <el-col :span="rightChartsSpan">
      <el-row>
        <el-col :span="24">
          <salary-response-chart
            v-if="salaries.length"
            v-loading="loading"
            :salaries="salaries"
          />
        </el-col>
      </el-row>
      <div class="horizontal-divider" />
      <el-row justify="space-between">
        <el-col :span="otherChartsSpan">
          <salary-invitation-chart
            v-if="salaries.length"
            v-loading="loading"
            :salaries="salaries"
          />
        </el-col>
        <div
          v-if="isTablet || isMobile"
          class="horizontal-divider"
        />
        <el-col
          v-else
          :span="1"
        >
          <div class="vertical-divider" />
        </el-col>
        <el-col :span="otherChartsSpan">
          <salary-failure-chart
            v-if="salaries.length"
            v-loading="loading"
            :salaries="salaries"
          />
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>

<script setup lang="ts">
import SalaryChart from '@/modules/user/statistic/components/salaryStatistic/SalaryChart.vue'
import { useQuery } from '@vue/apollo-composable'
import { getSalaries } from '@/modules/user/statistic/api/queries/salary.graphql'
import { computed, getCurrentInstance, onMounted, reactive, ref, watch } from 'vue'
import type { GLSalariesType } from '@/modules/user/statistic/types/graphql.types'
import type { SalaryType } from '@/modules/user/statistic/types/salary.type'
import SalaryResponseChart from '@/modules/user/statistic/components/salaryStatistic/SalaryResponseChart.vue'
import SalaryInvitationChart from '@/modules/user/statistic/components/salaryStatistic/SalaryInvitationChart.vue'
import SalaryFailureChart from '@/modules/user/statistic/components/salaryStatistic/SalaryFailureChart.vue'

const screenSize = computed(() => getCurrentInstance()?.appContext.config.globalProperties?.$screen?.size)
const isMobile = computed(() => !screenSize.value || screenSize.value === 'xs')
const isTablet = computed(() => screenSize.value === 'sm')

const totalChartSpan = computed(() => {
  if (isMobile.value) return 24

  if (isTablet.value) return 12

  return 12
})

const rightChartsSpan = computed(() => {
  if (isMobile.value) return 24

  return 11
})


const otherChartsSpan = computed(() => {
  if (isTablet.value || isMobile.value) return 24

  return 11
})

type Props = {
  userId: string,
}

const props = withDefaults(defineProps<Props>(), {
  userId: '',
})

const variables = reactive({
  userId: ''
})

const salaries = ref<SalaryType[]>([])

const { loading, onResult: onGetSalaries } = useQuery(getSalaries(), variables)

onGetSalaries((queryResult): void => {
  if (queryResult.loading || !queryResult.data.response_historiesList.items.length) return

  salaries.value = []

  queryResult.data.response_historiesList.items.forEach((item: GLSalariesType): void => {
    salaries.value.push({
      salaryFrom: Number(item.salary_from),
      salaryTo: Number(item.salary_to),
      status: item.status,
    })
  })
})

watch(() => props.userId, () => {
  variables.userId = props.userId
})

onMounted((): void => {
  variables.userId = props.userId
})
</script>