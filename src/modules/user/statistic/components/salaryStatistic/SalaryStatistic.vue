<template>
  <el-row>
    <el-col :span="12">
      <salary-chart
        v-if="salaries.length"
        v-loading="loading"
        :salaries="salaries"
      />
    </el-col>
    <el-col :span="1">
      <div class="vertical-divider" />
    </el-col>
    <el-col :span="11">
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
        <el-col :span="11">
          <salary-invitation-chart
            v-if="salaries.length"
            v-loading="loading"
            :salaries="salaries"
          />
        </el-col>
        <el-col :span="1">
          <div class="vertical-divider" />
        </el-col>
        <el-col :span="11">
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
import { onMounted, reactive, ref, watch } from 'vue'
import type { GLSalariesType } from '@/modules/user/statistic/types/graphql.types'
import type { SalaryType } from '@/modules/user/statistic/types/salary.type'
import SalaryResponseChart from '@/modules/user/statistic/components/salaryStatistic/SalaryResponseChart.vue'
import SalaryInvitationChart from '@/modules/user/statistic/components/salaryStatistic/SalaryInvitationChart.vue'
import SalaryFailureChart from '@/modules/user/statistic/components/salaryStatistic/SalaryFailureChart.vue'

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