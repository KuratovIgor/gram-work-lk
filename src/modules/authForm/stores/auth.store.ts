import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
    state: () => ({
        isAuthorized: false,
    }),
    actions: {
      setIsAuthorized(isAuth: boolean) {
          this.isAuthorized = isAuth
      },
    },
})