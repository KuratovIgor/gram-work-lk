<template>
  <div class="header">
    <p class="header__title">
      GramWork
    </p>
    <p
      v-if="authStore.isAuthorized"
      class="header__logout"
      @click="handleLogout"
    >
      Выйти
    </p>
  </div>
</template>

<script lang="ts" setup>
import { useAuthStore, removeChatId, removeAccessToken, removeRefreshToken } from '@/modules/authForm/index'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()

const router = useRouter()

const handleLogout = (): void => {
  removeChatId()

  removeAccessToken()

  removeRefreshToken()

  authStore.setIsAuthorized(false)

  router.push({ name: 'AuthPage' })
}
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid $color--divider;
  font-weight: 700;
  line-height: 31px;
  color: $color--primary;
  padding: 10px 20px;

  &__logo {
    width: 50px;
  }

  &__title {
    font-size: 26px;
  }

  &__logout {
    transition: 0.3s linear;
    cursor: pointer;

    &:hover {
      color: $color--primary-light;
    }
  }
}
</style>