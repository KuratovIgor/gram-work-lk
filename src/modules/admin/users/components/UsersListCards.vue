<template>
  <users-list-card
    v-for="user in props.users"
    :key="user.user_id"
    :user="user"
    @open-history="handleResponsesOpen"
  />
</template>

<script lang="ts" setup>
import type { GLUserType } from '@/modules/admin/users/types/graphql.type'
import UsersListCard from '@/modules/admin/users/components/UsersListCard.vue'

type Props = {
  users: GLUserType[]
}

const emit = defineEmits(['open-history'])
const props = withDefaults(defineProps<Props>(), {
  users: undefined,
})

const handleResponsesOpen = (userId: string): void => {
  emit('open-history', userId)
}
</script>