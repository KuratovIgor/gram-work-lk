<template>
  <mobile-card>
    <template #header>
      {{ props.user.lastname }} {{ props.user.name }} {{ props.user.middlename }}
    </template>
    <template #content>
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
    </template>
    <template #collapse-title>
      <div class="color-info">
        Подробнее
      </div>
    </template>
    <template #collapse-content>
      <user-card-content :user="props.user" />
    </template>
  </mobile-card>
</template>

<script lang="ts" setup>
import type { GLUserType } from '@/modules/admin/users/types/graphql.type'
import { computed, getCurrentInstance, ref } from 'vue'
import { useRouter } from 'vue-router'
import MobileCard from '@/components/mobileCard/MobileCard.vue'
import UserCardContent from '@/modules/admin/users/components/UserCardContent.vue'

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
