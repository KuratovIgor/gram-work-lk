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
      <p :class="contentMargin">
        Для входа в личный кабинет тебе необходимо ввести код, который тебе дал бот.
      </p>
      <p>
        После ввода нажми кнопку "Авторизироваться" и вуаля!.
      </p>

      <el-input
        id="input"
        v-model="chatId"
        :class="inputMargin"
        :size="inputSize"
      />

      <el-button
        type="primary"
        :size="buttonSize"
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
import { computed, getCurrentInstance, ref } from 'vue'
import { useQuery } from '@vue/apollo-composable'
import { getUserQuery } from '@/modules/authForm/api/queries/auth.graphql'
import { setAccessToken, setChatId, setRefreshToken, setUserId } from '@/utils/cookie'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user.store'
import { showErrorMessage, showSuccessMessage } from '@/utils/message'

const screenSize = computed(() => getCurrentInstance()?.appContext.config.globalProperties?.$screen?.size)
const contentMargin = computed(() => screenSize.value === 'xs' || !screenSize.value ? 'mb-10' : 'mb-20')
const inputMargin = computed(() => screenSize.value === 'xs' || !screenSize.value ? 'mt-20 mb-10' : 'mt-40 mb-20')
const inputSize = computed(() => !screenSize.value ? 'small' : 'default')
const buttonSize = computed(() => !screenSize.value ? 'default' : 'large')

const router = useRouter()

const authStore = useUserStore()

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
    color: var(--color-primary);

    @media (max-width: $screen--sm) {
      font-size: 25px
    }
  }

  &__content {
    font-size: 20px;
    text-align: center;
    padding: 0 40px;

    @media (max-width: $screen--sm) {
      font-size: 16px
    }

    @media (max-width: $screen--xs) {
      padding: 0 10px;
      font-size: 14px
    }
  }

  &__title {
    margin-bottom: 35px;
    font-weight: 700;
    font-size: 25px;

    @media (max-width: $screen--sm) {
      margin-bottom: 15px;
      font-size: 20px
    }

    @media (max-width: $screen--xs) {
      margin-bottom: 10px;
    }
  }
}
</style>