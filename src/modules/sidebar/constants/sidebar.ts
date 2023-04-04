import { Avatar, Document, Histogram, Notebook, Filter } from '@element-plus/icons-vue'
import { LKPages } from '@/utils/enums'

export const SIDEBAR_ITEMS = [
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