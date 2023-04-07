<template>
  <div class="header">
    <p class="header__title">
      GramWork
    </p>
    <p
      v-if="userStore.isAdmin"
      class="header__name"
    >
      Привет, {{ userStore.userName }}!
    </p>
    <p
      v-if="userStore.isAuthorized"
      class="header__logout"
      @click="handleLogout"
    >
      Выйти
    </p>
  </div>
</template>

<script lang="ts" setup>
import {
  removeChatId,
  removeAccessToken,
  removeRefreshToken,
  removeUserId,
  removeIsAdmin,
  removeUserName
} from '@/utils/cookie'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user.store'

const userStore = useUserStore()

const router = useRouter()

const handleLogout = (): void => {
  removeChatId()

  removeAccessToken()

  removeRefreshToken()

  removeUserId()

  removeIsAdmin()

  removeUserName()

  userStore.setIsAuthorized(false)

  userStore.setIsAdmin(false)

  userStore.setUserName('')

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

  &__title {
    font-size: 26px;
  }

  &__name {
    font-size: 20px;
    color: $color--danger;
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