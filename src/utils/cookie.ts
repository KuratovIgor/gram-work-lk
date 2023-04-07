// @ts-ignore
import Cookies from 'js-cookie'

const USER_ID_KEY = 'user_id'
const CHAT_ID_KEY = 'chat_id'
const ACCESS_TOKEN_KEY = 'access_token'
const REFRESH_TOKEN_KEY = 'refresh_token'
const IS_ADMIN_KEY = 'is_admin'
const USER_NAME_KEY = 'user_name'

export const getIsAmin = (): boolean => {
    return Cookies.get(IS_ADMIN_KEY)
}

export const getChatId = (): string => {
    return Cookies.get(CHAT_ID_KEY)
}

export const getUserId = (): string => {
    return Cookies.get(USER_ID_KEY)
}

export const getAccessToken = (): string => {
    return Cookies.get(ACCESS_TOKEN_KEY)
}

export const getRefreshToken = (): string => {
    return Cookies.get(REFRESH_TOKEN_KEY)
}

export const getUserName = (): string => {
    return Cookies.get(USER_NAME_KEY)
}

export const setIsAdmin = (isAdmin: boolean): void => {
    Cookies.set(IS_ADMIN_KEY, isAdmin)
}

export const setAccessToken = (token: string): void => {
    Cookies.set(ACCESS_TOKEN_KEY, token)
}

export const setRefreshToken = (token: string): void => {
    Cookies.set(REFRESH_TOKEN_KEY, token)
}

export const setChatId = (chatId: string): void => {
    Cookies.set(CHAT_ID_KEY, chatId)
}

export const setUserId = (userId: string): void => {
    Cookies.set(USER_ID_KEY, userId)
}

export const setUserName = (userName: string): void => {
    Cookies.set(USER_NAME_KEY, userName)
}

export const removeAccessToken = (): string => {
    return Cookies.remove(ACCESS_TOKEN_KEY)
}

export const removeRefreshToken = (): string => {
    return Cookies.remove(REFRESH_TOKEN_KEY)
}

export const removeChatId = (): string => {
    return Cookies.remove(CHAT_ID_KEY)
}

export const removeUserId = (): string => {
    return Cookies.remove(USER_ID_KEY)
}

export const removeIsAdmin = (): string => {
    return Cookies.remove(IS_ADMIN_KEY)
}

export const removeUserName = (): string => {
    return Cookies.remove(USER_NAME_KEY)
}