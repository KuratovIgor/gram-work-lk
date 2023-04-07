<template>
  <el-card>
    <template #header>
      {{ props.historyItem.vacancy }}
    </template>
    <template #default>
      <div class="d-f jc-sb">
        <div
          class="text-bold"
          :class="{
            'color-red': props.historyItem.status === Status.FAILURE,
            'color-success': props.historyItem.status === Status.INVITATION
          }"
        >
          {{ props.historyItem.status }}
        </div>
        <div class="more-info">
          <div class="mr-5">
            Подробнее
          </div>
          <el-icon>
            <arrow-down />
          </el-icon>
        </div>
      </div>
    </template>
  </el-card>
</template>

<script lang="ts" setup>
import type { HistoryItemType } from '@/modules/user/history/types/history.type'
import { Status } from '@/modules/user/history/constants/constants'
import { ArrowDown } from '@element-plus/icons-vue'

type Props = {
  historyItem: HistoryItemType,
}

const props = withDefaults(defineProps<Props>(), {
  historyItem: undefined,
})
</script>

<style lang="scss" scoped>
.more-info {
  display: flex;
  align-items: center;
  color: gray;
}
</style>