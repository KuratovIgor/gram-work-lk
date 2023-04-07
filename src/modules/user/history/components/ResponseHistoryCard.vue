<template>
  <el-card>
    <template #header>
      {{ props.historyItem.vacancy }}
    </template>

    <template #default>
      <el-collapse v-model="isMoreInfo">
        <el-collapse-item>
          <template #title>
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

          <div class="text-bold">
            Зарплата:
          </div>
          <div
            v-if="!props.historyItem.salaryFrom && !props.historyItem.salaryTo"
            class="mb-10"
          >
            Запрлата не указана
          </div>
          <div
            v-else
            class="mb-10"
          >
            {{ props.historyItem.salaryFrom }} - {{ props.historyItem.salaryTo }} РУБ.
          </div>

          <div class="text-bold">
            Компания:
          </div>
          <div class="mb-10">
            {{ props.historyItem.employer }}
          </div>

          <div class="text-bold">
            Город:
          </div>
          <div class="mb-10">
            {{ props.historyItem.area }}
          </div>

          <div class="text-bold">
            Дата отклика:
          </div>
          <div class="mb-10">
            {{ props.historyItem.date }}
          </div>

          <div class="text-bold">
            Ссылка:
          </div>
          <a
            :href="props.historyItem.url"
            target="_blank"
          >{{ props.historyItem.url }}</a>
        </el-collapse-item>
      </el-collapse>
    </template>
  </el-card>
</template>

<script lang="ts" setup>
import type { HistoryItemType } from '@/modules/user/history/types/history.type'
import { Status } from '@/modules/user/history/constants/constants'
import { ref } from 'vue'

type Props = {
  historyItem: HistoryItemType,
}

const props = withDefaults(defineProps<Props>(), {
  historyItem: undefined,
})

const isMoreInfo = ref(false)
</script>