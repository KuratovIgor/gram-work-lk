import router from '@/router'
import { getChatId, useAuthStore } from '@/modules/authForm/index'

const whiteList = ['AuthPage']

router.beforeEach((to, from, next) => {
    const authStore = useAuthStore()
    const chatId = getChatId()

    if (!authStore.isAuthorized && chatId) {
        authStore.setIsAuthorized(true)
    }

    if (chatId && authStore.isAuthorized) {
        next()
    }

    if (whiteList.includes(to.name as string)) {
        next()
    }

    next({ name: 'AuthPage' })
})