import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
    state: () => ({
        isAuthorized: false,
        isAdmin: false,
        userName: '',
    }),
    actions: {
        setIsAuthorized(isAuth: boolean) {
          this.isAuthorized = isAuth
        },
        setIsAdmin(isAdmin: boolean) {
            this.isAdmin = isAdmin
        },
        setUserName(userName: string) {
            this.userName = userName
        },
    },
})