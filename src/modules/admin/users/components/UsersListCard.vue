<template>
  <el-card>
    <template #header>
      {{ props.user.lastname }} {{ props.user.name }} {{ props.user.middlename }}
    </template>

    <template #default>
      <el-button
        type="success"
        :size="buttonSize"
        icon="histogram"
        @click="handleStatisticOpen(props.user.user_id)"
      >
        Статистика
      </el-button>
      <el-button
        type="primary"
        :size="buttonSize"
        icon="checked"
        @click="handleResponsesOpen(props.user.user_id)"
      >
        Отлики
      </el-button>

      <el-collapse v-model="isMoreInfo">
        <el-collapse-item>
          <template #title>
            <div class="color-info">
              Подробнее
            </div>
          </template>

          <div class="text-bold">
            Эл. почта:
          </div>
          <div class="mb-10">
            {{ props.user.email }}
          </div>

          <div class="text-bold">
            Телефон:
          </div>
          <div>
            {{ props.user.phone ? props.user.phone : 'Отсутствует' }}
          </div>
        </el-collapse-item>
      </el-collapse>
    </template>
  </el-card>
</template>

<script lang="ts" setup>
import type { GLUserType } from '@/modules/admin/users/types/graphql.type'
import { computed, getCurrentInstance, ref } from 'vue'
import { useRouter } from 'vue-router'

const screenSize = computed(() => getCurrentInstance()?.appContext.config.globalProperties?.$screen?.size)
const buttonSize = computed(() => !screenSize.value ? 'small' : 'default')

const router = useRouter()

type Props = {
  user: GLUserType
}

const emit = defineEmits(['open-history'])
const props = withDefaults(defineProps<Props>(), {
  user: undefined,
})

const isMoreInfo = ref(false)

const handleStatisticOpen = (userId: string): void => {
  router.push({
    name: 'AdminStatisticPage',
    query: {
      'user-id': userId
    }
  })
}

const handleResponsesOpen = (userId: string): void => {
  emit('open-history', userId)
}
</script>
