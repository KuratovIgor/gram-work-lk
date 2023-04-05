import router from '@/router'
import { getChatId, getIsAmin } from '@/utils/cookie'
import { useUserStore } from '@/stores/user.store'

const whiteList = ['AuthPage']

router.beforeEach((to, from, next) => {
    const userStore = useUserStore()
    const chatId = getChatId()
    const isAdmin = getIsAmin()

    if ((!userStore.isAuthorized && chatId) || (!userStore.isAuthorized && isAdmin)) {
        userStore.setIsAuthorized(true)
    }

    if (userStore.isAuthorized && isAdmin) {
        userStore.setIsAdmin(true)
    }

    if ((chatId && userStore.isAuthorized) || (userStore.isAuthorized && userStore.isAdmin)) {
        next()
    }

    if (whiteList.includes(to.name as string)) {
        next()
    }

    next({ name: 'AuthPage' })
})