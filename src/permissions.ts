import router from '@/router'
import { getChatId, getIsAmin, getUserName } from '@/utils/cookie'
import { useUserStore } from '@/stores/user.store'

const whiteList = ['AuthPage']

router.beforeEach((to, from, next) => {
    const userStore = useUserStore()
    const chatId = getChatId()
    const isAdmin = getIsAmin()
    const userName = getUserName()

    if ((!userStore.isAuthorized && chatId) || (!userStore.isAuthorized && isAdmin)) {
        userStore.setIsAuthorized(true)
    }

    if (userStore.isAuthorized && isAdmin) {
        userStore.setIsAdmin(true)

        userStore.setUserName(userName)
    }

    if (to.name === 'AuthPage') {
        if (userStore.isAuthorized && chatId) {
            next({ name: 'ProfilePage' })
        }

        if (userStore.isAuthorized && userStore.isAdmin) {
            next({ name: 'UsersPage' })
        }
    }

    if ((chatId && userStore.isAuthorized) || (userStore.isAuthorized && userStore.isAdmin)) {
        next()
    }

    if (whiteList.includes(to.name as string)) {
        next()
    }

    next({ name: 'AuthPage' })
})