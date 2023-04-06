<template>
  <el-tabs
    v-model="activeTab"
    v-loading="loading"
  >
    <el-tab-pane label="Пользователи">
      <users-list-table
        class="mb-20"
        :users="paginatedUsers"
      />

      <el-pagination
        background
        layout="prev, pager, next"
        :total="users.length"
        :page-size="5"
        @current-change="handlePageChange"
      />
    </el-tab-pane>
    <el-tab-pane label="Статистика">
      Статистика
    </el-tab-pane>
  </el-tabs>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import type { GLUserType } from '@/modules/admin/users/types/graphql.type'
import UsersListTable from '@/modules/admin/users/components/UsersListTable.vue'

const activeTab = ref('0')
const users = ref<GLUserType[]>([
  {
    chat_id: '1',
    user_id: '1',
    name: '1',
    lastname: '1',
    middlename: '1',
    email: '1',
    phone: '1'
  },
  {
    chat_id: '1',
    user_id: '1',
    name: '1',
    lastname: '1',
    middlename: '1',
    email: '1',
    phone: '1'
  },
])

const page = ref(1)

const paginatedUsers = computed((): GLUserType[] =>
    users.value.filter((user, index) => index < page.value * 5 && index > (page.value - 1) * 5 - 1))

const handlePageChange = (nextPage: number): void => {
  page.value = nextPage
}
</script>