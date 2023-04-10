import type { LKPages } from '@/utils/enums'
import type { AdminLKPages } from '@/utils/enums'

export type SidebarItemType = {
    page: LKPages | AdminLKPages
    icon: unknown
    label: string
}