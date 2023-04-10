import type { PageType } from '@/types/page.type'
import { AdminLKPages, LKPages } from '@/utils/enums'
import { Avatar, Document, Filter, Histogram, List, Notebook } from '@element-plus/icons-vue'

export const ADMIN_SIDEBAR_ITEMS: PageType[] = [
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

export const USER_SIDEBAR_ITEMS: PageType[] = [
    {
        page: LKPages.PROFILE,
        icon: Avatar,
        label: 'Профиль',
    },
    {
        page: LKPages.STATISTIC,
        icon: Histogram,
        label: 'Статистика',
    },
    {
        page: LKPages.RESUME,
        icon: Document,
        label: 'Резюме',
    },
    {
        page: LKPages.HISTORY,
        icon: Notebook,
        label: 'История',
    },
    {
        page: LKPages.FILTERS,
        icon: Filter,
        label: 'Фильтры',
    }
]