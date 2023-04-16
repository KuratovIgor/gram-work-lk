<template>
  <el-table
    :data="props.users"
    stripe
  >
    <el-table-column
      prop="chat_id"
      label="chat id"
    >
      <template #default="scope">
        <el-text truncated>
          {{ scope.row.chat_id }}
        </el-text>
      </template>
    </el-table-column>
    <el-table-column
      prop="name"
      label="Имя"
    >
      <template #default="scope">
        <el-text truncated>
          {{ scope.row.name }}
        </el-text>
      </template>
    </el-table-column>
    <el-table-column
      prop="lastname"
      label="Фамилия"
    >
      <template #default="scope">
        <el-text truncated>
          {{ scope.row.lastname }}
        </el-text>
      </template>
    </el-table-column>
    <el-table-column
      prop="email"
      label="Email"
    >
      <template #default="scope">
        <el-text truncated>
          {{ scope.row.email }}
        </el-text>
      </template>
    </el-table-column>
    <el-table-column
      prop="phone"
      label="Телефон"
    >
      <template #default="scope">
        <el-text truncated>
          {{ scope.row.phone }}
        </el-text>
      </template>
    </el-table-column>
    <el-table-column
      align="center"
      :width="columnWidth"
    >
      <template #default="scope">
        <el-button
          type="success"
          round
          :size="buttonSize"
          @click="handleStatisticOpen(scope.row.user_id)"
        >
          <p v-if="screenSize === 'lg'">
            Статистика
          </p>
          <el-icon v-else>
            <histogram />
          </el-icon>
        </el-button>
      </template>
    </el-table-column>
    <el-table-column
      align="center"
      :width="columnWidth"
    >
      <template #default="scope">
        <el-button
          type="primary"
          round
          :size="buttonSize"
          @click="handleResponsesOpen(scope.row.user_id)"
        >
          <p v-if="screenSize === 'lg'">
            Отклики
          </p>
          <el-icon v-else>
            <checked />
          </el-icon>
        </el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script lang="ts" setup>
import { Histogram, Checked } from '@element-plus/icons-vue'
import type { GLUserType } from '@/modules/admin/users/types/graphql.type'
import { useRouter } from 'vue-router'
import { computed, getCurrentInstance } from 'vue'

const screenSize = computed(() => getCurrentInstance()?.appContext.config.globalProperties?.$screen?.size)
const buttonSize = computed(() => screenSize.value === 'lg' ? 'default' : 'small')
const columnWidth = computed(() => screenSize.value === 'lg' ? '' : 60)

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