<template>
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
</template>

<script lang="ts" setup>
import type { HistoryItemType } from '@/modules/user/history/types/history.type'

type Props = {
  historyItem: HistoryItemType,
}

const props = withDefaults(defineProps<Props>(), {
  historyItem: undefined,
})
</script>