<template>
  <el-card
    v-loading="loading"
    class="auth-form"
  >
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
          Для входа в личный кабинет тебе необходимо авторизироваться через свой аккаунт на HH.ru.
        </p>
        <p>Для этого тебе нужно перейти на страницу авторизации по кнопке ниже.</p>
      </div>

      <el-button
        type="primary"
        size="large"
        round
        @click="handleAuthOpen"
      >
        Авторизироваться
      </el-button>
    </template>
  </el-card>
</template>

<script lang="ts" setup>
import { getAuthLink } from '@/modules/authForm/helpers/auth.helpers'
import { useRoute } from 'vue-router'
import { computed } from 'vue'

const route = useRoute()

const loading = computed(() => !!route.query.code)

const handleAuthOpen = (): void => {
  const authLink = getAuthLink()

  window.open(authLink, 'blank')
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
    margin-bottom: 40px;
  }

  &__title {
    font-weight: 700;
    font-size: 25px;
    margin-bottom: 35px;
  }
}
</style>