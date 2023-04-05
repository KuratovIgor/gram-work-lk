import { Avatar, Histogram, List } from '@element-plus/icons-vue'
import { AdminLKPages } from '@/utils/enums'

export const ADMIN_SIDEBAR_ITEMS = [
    {
        page: AdminLKPages.PROFILE,
        icon: Avatar,
        label: 'Профиль',
    },
    {
        page: AdminLKPages.USERS,
        icon: List,
        label: 'Пользователи',
    },
    {
        page: AdminLKPages.STATISTIC,
        icon: Histogram,
        label: 'Статистика',
    },
]