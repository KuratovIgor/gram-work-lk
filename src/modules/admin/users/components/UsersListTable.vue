<template>
  <el-table
    :data="props.users"
    stripe
  >
    <el-table-column
      prop="chat_id"
      label="chat id"
    />
    <el-table-column
      prop="user_id"
      label="user id"
    />
    <el-table-column
      prop="name"
      label="Имя"
    />
    <el-table-column
      prop="lastname"
      label="Фамилия"
    />
    <el-table-column
      prop="middlename"
      label="Отчество"
    />
    <el-table-column
      prop="email"
      label="Email"
    />
    <el-table-column
      prop="phone"
      label="Телефон"
    />
    <el-table-column
      label="Статистика"
      align="center"
    >
      <template #default="scope">
        <el-button
          type="success"
          round
          icon="histogram"
          @click="handleStatisticOpen(scope.row.user_id)"
        />
      </template>
    </el-table-column>
    <el-table-column
      label="Отклики"
      align="center"
    >
      <template #default="scope">
        <el-button
          type="primary"
          round
          icon="checked"
          @click="handleResponsesOpen(scope.row.user_id)"
        />
      </template>
    </el-table-column>
  </el-table>
</template>

<script lang="ts" setup>
import type { GLUserType } from '@/modules/admin/users/types/graphql.type'
import { useRouter } from 'vue-router'

const router = useRouter()

type Props = {
  users: GLUserType[]
}

const emit = defineEmits(['open-history'])
const props = withDefaults(defineProps<Props>(), {
  users: undefined,
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