<template>
  <el-card>
    <template #header>
      {{ props.user.lastname }} {{ props.user.name }} {{ props.user.middlename }}
    </template>
    <template #default>
      <div class="d-f jc-sb">
        <div>
          <el-button
            type="success"
            size="small"
            icon="histogram"
          />
          <el-button
            type="primary"
            size="small"
            icon="checked"
            @click="handleResponsesOpen(props.user.user_id)"
          />
        </div>
        <el-popover
          width="300"
          placement="bottom"
          :title="`${props.user.lastname} ${props.user.name} ${props.user.middlename}`"
          trigger="click"
        >
          <template #reference>
            <el-button
              type="info"
              size="small"
              icon="infoFilled"
            />
          </template>
          <template #default>
            <div>
              {{ props.user.email }}
            </div>
            <div>
              {{ props.user.phone }}
            </div>
          </template>
        </el-popover>
      </div>
    </template>
  </el-card>
</template>

<script lang="ts" setup>
import type { GLUserType } from '@/modules/admin/users/types/graphql.type'

type Props = {
  user: GLUserType
}

const emit = defineEmits(['open-history'])
const props = withDefaults(defineProps<Props>(), {
  user: undefined,
})

const handleResponsesOpen = (userId: string): void => {
  emit('open-history', userId)
}
</script>
