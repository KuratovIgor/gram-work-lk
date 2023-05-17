<template>
  <div class="header">
    <p
      v-if="!isMobile || !userStore.isAuthorized"
      class="header__title"
    >
      GramWork
    </p>
    
    <template v-else>
      <img
        v-if="isDarkMode"
        class="header__burger"
        src="/src/assets/icons/burger-dark.svg"
        @click="handleDrawerOpen"
      />
      <img
        v-else
        class="header__burger"
        src="/src/assets/icons/burger.svg"
        @click="handleDrawerOpen"
      />
    </template>

    <p
      v-if="userStore.isAdmin"
      class="header__name"
    >
      Привет, {{ userStore.userName }}!
    </p>
    
    <div class="d-f">
      <p
        v-if="userStore.isAuthorized"
        class="header__logout"
        @click="handleLogout"
      >
        Выйти
      </p>
    </div>
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
import { computed, getCurrentInstance } from 'vue'
import { useDarkMode } from '@/composables/darkMode'

const userStore = useUserStore()

const { isDarkMode } = useDarkMode()

const router = useRouter()

const emit = defineEmits(['drawer'])

const screenSize = computed(() => getCurrentInstance()?.appContext.config.globalProperties?.$screen?.size)
const isMobile = computed(() => !screenSize.value || screenSize.value === 'xs')

const handleDrawerOpen = (): void => {
  emit('drawer')
}

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
  border-bottom: 1px solid var(--color-divider);
  font-weight: 700;
  line-height: 31px;
  color: var(--color-primary);
  padding: 10px 20px;

  &__title {
    font-size: 26px;
  }

  &__burger {
    width: 30px;
  }

  &__name {
    font-size: 20px;
    color: var(--color-danger);

    @media (max-width: $screen--sm) {
      font-size: 15px;
    }
  }

  &__logout {
    margin-right: 10px;
    transition: 0.3s linear;
    cursor: pointer;

    &:hover {
      color: var(--color-primary-light);
    }

    @media (max-width: $screen--sm) {
      font-size: 15px;
    }
  }
}
</style>