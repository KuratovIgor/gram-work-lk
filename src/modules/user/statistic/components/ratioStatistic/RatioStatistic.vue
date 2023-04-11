<template>
  <ratio-chart
    v-if="isChartVisible"
    :responses="ratio.responses"
    :failures="ratio.failures"
    :invitations="ratio.invitations"
  />
</template>

<script lang="ts" setup>
import RatioChart from './RatioChart.vue'
import { useQuery } from '@vue/apollo-composable'
import { getInvitationsCount, getFailuresCount, getResponsesCount }
  from '@/modules/user/statistic/api/queries/ratio.graphql'
import { onMounted, reactive, ref, watch } from 'vue'
import type { RatioType } from '@/modules/user/statistic/types/ratio.type'

type Props = {
  userId: string,
}

const props = withDefaults(defineProps<Props>(), {
  userId: '',
})

const variables = reactive({
  userId: ''
})

const ratio = ref<RatioType>({ failures: 0, invitations: 0, responses: 0 })

const isChartVisible = ref(false)

const { loading: invitationsLoading, onResult: onGetInvitations } = useQuery(getInvitationsCount(), variables)
const { loading: failuresLoading, onResult: onGetFailures } = useQuery(getFailuresCount(), variables)
const { loading: responsesLoading, onResult: onGetResponses } = useQuery(getResponsesCount(), variables)

onGetInvitations((queryResult) => {
  if (queryResult.loading) return

  ratio.value.invitations = queryResult.data.response_historiesList.count
})

onGetFailures((queryResult) => {
  if (queryResult.loading) return

  ratio.value.failures = queryResult.data.response_historiesList.count
})

onGetResponses((queryResult) => {
  if (queryResult.loading) return

  ratio.value.responses = queryResult.data.response_historiesList.count
})

watch(() => props.userId, () => {
  variables.userId = props.userId
})

onMounted((): void => {
  variables.userId = props.userId

  setTimeout(() => {
    isChartVisible.value = true
  }, 1000)
})
</script>