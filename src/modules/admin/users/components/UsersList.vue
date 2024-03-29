<template>
  <el-tabs
    v-model="activeTab"
    v-loading="usersLoading"
  >
    <el-tab-pane label="Пользователи">
      <users-list-table
        v-if="!isMobile"
        class="mb-20"
        :users="paginatedUsers"
        @open-history="handleHistoryTableOpen"
      />
      <users-cards
        v-else
        class="mb-40"
        :users="paginatedUsers"
        @open-history="handleHistoryTableOpen"
      />

      <el-pagination
        background
        layout="prev, pager, next"
        :total="users.length"
        :page-size="5"
        @current-change="handlePageChange"
      />
    </el-tab-pane>
    <el-tab-pane label="История откликов">
      <template v-if="userId">
        <div class="title">
          {{ chosenUser }}
        </div>
        <response-history-tab :user-id="userId" />
      </template>
      <div
        v-else
        class="title color-red"
      >
        Выберите пользователя для просмотра истории
      </div>
    </el-tab-pane>
  </el-tabs>
</template>

<script lang="ts" setup>
import { computed, getCurrentInstance, onMounted, ref } from 'vue'
import type { GLUserType } from '@/modules/admin/users/types/graphql.type'
import UsersListTable from '@/modules/admin/users/components/UsersListTable.vue'
import { useQuery } from '@vue/apollo-composable'
import { getUsersQuery } from '@/modules/admin/users/api/queries/users.query'
import { showErrorMessage } from '@/utils/message'
import { ResponseHistoryTab } from '@/modules/user/history'
import UsersCards from '@/modules/admin/users/components/UsersCards.vue'

const screenSize = computed(() => getCurrentInstance()?.appContext.config.globalProperties?.$screen?.size)
const isMobile = computed(() => !screenSize.value || screenSize.value === 'xs')

const { loading: usersLoading, onResult: onGetUsers, refetch } = useQuery(getUsersQuery())

const activeTab = ref('0')
const page = ref(1)
const userId = ref('')

const users = ref<GLUserType[]>([])

onGetUsers((queryResult): void => {
  if (queryResult.loading) return

  if (!queryResult.data.auth_usersList.items.length) {
    showErrorMessage('При получении списка пользователей произошла ошибка!')

    return
  }

  queryResult.data.auth_usersList.items.forEach((user: GLUserType) => {
    if (!users.value.map((item: GLUserType) => item.user_id).includes(user.user_id)) {
      users.value.push(user)
    }
  })
})

const paginatedUsers = computed((): GLUserType[] =>
    users.value.filter((user, index) => index < page.value * 5 && index > (page.value - 1) * 5 - 1))

const chosenUser = computed(() => {
  const user = paginatedUsers.value.filter((user) => user.user_id === userId.value)[0]

  return user ? `${user.lastname} ${user.name} ${user.middlename}` : ''
})

const handlePageChange = (nextPage: number): void => {
  page.value = nextPage
}

const handleHistoryTableOpen = (id: string): void => {
  activeTab.value = '1'

  userId.value = id
}

onMounted((): void => {
  refetch()
})
</script>