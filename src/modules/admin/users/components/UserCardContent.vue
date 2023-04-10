<template>
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
</template>

<script lang="ts" setup>
import type { GLUserType } from '@/modules/admin/users/types/graphql.type'

type Props = {
  user: GLUserType
}

const props = withDefaults(defineProps<Props>(), {
  user: undefined,
})
</script>