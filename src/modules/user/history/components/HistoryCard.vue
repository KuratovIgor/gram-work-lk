<template>
  <mobile-card>
    <template #header>
      {{ props.historyItem.vacancy }}
    </template>
    <template #collapse-title>
      <div
        class="text-bold"
        :class="{
          'color-red': props.historyItem.status === Status.FAILURE,
          'color-success': props.historyItem.status === Status.INVITATION
        }"
      >
        {{ props.historyItem.status }}
      </div>
    </template>
    <template #collapse-content>
      <history-card-content :history-item="props.historyItem" />
    </template>
  </mobile-card>
</template>

<script lang="ts" setup>
import type { HistoryItemType } from '@/modules/user/history/types/history.type'
import { Status } from '@/modules/user/history/constants/constants'
import MobileCard from '@/components/mobileCard/MobileCard.vue'
import HistoryCardContent from '@/modules/user/history/components/HistoryCardContent.vue'

type Props = {
  historyItem: HistoryItemType,
}

const props = withDefaults(defineProps<Props>(), {
  historyItem: undefined,
})
</script>