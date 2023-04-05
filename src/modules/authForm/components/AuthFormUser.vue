<template>
  <div class="auth-form-user">
    <div class="auth-form-user__header">
      Авторизация
    </div>

    <div class="horizontal-divider" />

    <div class="auth-form-user__content">
      <p class="auth-form-user__title">
        Привет!
      </p>
      <p class="mb-20">
        Для входа в личный кабинет тебе необходимо ввести код, который тебе дал бот.
      </p>
      <p class="mb-40">
        После ввода нажми кнопку "Авторизироваться" и вуаля!.
      </p>

      <el-input
        v-model="chatId"
        class="mb-20"
      />

      <el-button
        type="primary"
        size="large"
        round
        :loading="loading"
        @click="handleUserLogin"
      >
        Авторизироваться
      </el-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useQuery } from '@vue/apollo-composable'
import { getUserQuery } from '@/modules/authForm/api/queries/auth.graphql'
import { setAccessToken, setChatId, setRefreshToken, setUserId } from '@/modules/authForm/helpers/auth.helper'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/modules/authForm'
import { showErrorMessage, showSuccessMessage } from '@/utils/message'

const router = useRouter()

const authStore = useAuthStore()

const chatId = ref('')

const { loading, variables, onResult: onAuthorize, refetch } = useQuery(getUserQuery(), { chatId: '' })

onAuthorize((queryResult): void => {
  if (queryResult.loading) return

  if (!queryResult.data?.login) {
    showErrorMessage('Неверный код')

    return
  }

  authorize(queryResult.data.login.access_token, queryResult.data.login.refresh_token, queryResult.data.login.user_id)

  showSuccessMessage('Вы авторизированы!')

  router.push({ name: 'ProfilePage' })
})

const authorize = (accessToken: string, refreshToken: string, userId: string): void => {
  setChatId(chatId.value)

  setAccessToken(accessToken)

  setRefreshToken(refreshToken)

  setUserId(userId)

  authStore.setIsAuthorized(true)
}

const handleUserLogin = (): void => {
  if (variables.value?.chatId === chatId.value) {
    refetch()

    return
  }

  variables.value = {
    chatId: chatId.value,
  }
}
</script>

<style lang="scss" scoped>
.auth-form-user {
  &__header {
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    font-size: 30px;
    color: $color--primary;
  }

  &__content {
    font-size: 20px;
    text-align: center;
    padding: 0 40px;
  }

  &__title {
    font-weight: 700;
    font-size: 25px;
    margin-bottom: 35px;
  }
}
</style>