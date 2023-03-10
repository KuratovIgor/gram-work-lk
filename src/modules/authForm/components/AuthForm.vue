<template>
  <el-card class="auth-form">
    <template #header>
      <div class="auth-form__header">
        <p>Авторизация</p>
      </div>
    </template>

    <template #default>
      <div class="auth-form__content">
        <p class="auth-form__title">
          Привет!
        </p>
        <p class="mb-20">
          Для входа в личный кабинет тебе необходимо ввести код, который тебе дал бот.
        </p>
        <p class="mb-40">
          После ввода нажми кнопку "Авторизироваться" и вуаля!.
        </p>

        <el-input
          v-model="variables.chatId"
          class="mb-20"
        />

        <el-button
          type="primary"
          size="large"
          round
          @click="handleUserLogin"
        >
          Авторизироваться
        </el-button>
      </div>
    </template>
  </el-card>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
import { useQuery } from '@vue/apollo-composable'
import { getUserQuery } from '@/modules/authForm/api/queries/auth.graphql'
import { ElMessage } from 'element-plus'
import { setAccessToken, setChatId, setRefreshToken, setUserId } from '@/modules/authForm/helpers/auth.helper'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/modules/authForm'

const router = useRouter()

const authStore = useAuthStore()

const variables = reactive({
  chatId: '',
})

const { result } = useQuery(getUserQuery(), variables)

const handleUserLogin = (): void => {
  if (!result.value?.login) {
    ElMessage({
      message: 'Неверный код!',
      type: 'error',
    })
  } else {
    setChatId(variables.chatId)

    setAccessToken(result.value.login.access_token)

    setRefreshToken(result.value.login.refresh_token)

    authStore.setIsAuthorized(true)

    setUserId(result.value.login.user_id)

    router.push({ name: 'ProfilePage' })

    ElMessage({
      message: 'Вы авторизированы!',
      type: 'success',
    })
  }
}
</script>

<style lang="scss" scoped>
.auth-form {
  width: 100%;
  max-width: 900px;

  &__header {
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    font-size: 30px;
    color: $color--primary;
  }

  &__content {
    max-width: 600px;
    display: flex;
    flex-direction: column;
    align-items: center;
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