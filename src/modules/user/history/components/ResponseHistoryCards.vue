<template>
  <response-history-card
    v-for="(item, index) in props.history"
    :key="index"
    :history-item="item"
  />
</template>

<script lang="ts" setup>
import ResponseHistoryCard from '@/modules/user/history/components/ResponseHistoryCard.vue'
import type { HistoryItemType } from '@/modules/user/history/types/history.type'

type Props = {
  history: HistoryItemType[],
}

const props = withDefaults(defineProps<Props>(), {
  history: undefined,
})
</script>