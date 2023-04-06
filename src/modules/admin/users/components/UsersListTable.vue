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
  </el-table>
</template>

<script lang="ts" setup>
import type { GLUserType } from '@/modules/admin/users/types/graphql.type'

type Props = {
  users: GLUserType[]
}

const props = withDefaults(defineProps<Props>(), {
  users: undefined,
})
</script>