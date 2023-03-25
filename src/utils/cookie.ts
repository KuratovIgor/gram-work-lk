// @ts-ignore
import Cookies from 'js-cookie'

const USER_ID_KEY = 'user_id'
const ACCESS_TOKEN_KEY = 'access_token'

export const getUserId = (): string => {
    return Cookies.get(USER_ID_KEY)
}

export const getAccessToken = (): string => {
    return Cookies.get(ACCESS_TOKEN_KEY)
}