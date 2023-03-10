// @ts-ignore
import Cookies from 'js-cookie'

const USER_ID_KEY = 'user_id'

export const getUserId = (): string => {
    return Cookies.get(USER_ID_KEY)
}