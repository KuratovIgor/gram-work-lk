import { AUTH_URL } from '@/modules/authForm/constants/auth.constants'

export const getAuthLink = (): string => {
    const clientId = import.meta.env.VITE_CLIENT_ID
    const redirectUri = import.meta.env.VITE_REDIRECT_URI
    
    return `${AUTH_URL}&client_id=${clientId}&redirect_uri=${redirectUri}`
}