// @ts-ignore
import Cookies from 'js-cookie'

const USER_ID_KEY = 'user_id'
const CHAT_ID_KEY = 'chat_id'

export const getUserId = (): string => {
    return Cookies.get(USER_ID_KEY)
}

export const getChatId = (): string => {
    return Cookies.get(CHAT_ID_KEY)
}