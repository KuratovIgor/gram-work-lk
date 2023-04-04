import type { AreaType } from '@/types/area.type'
import { areaApi } from '@/api/area.api'
import { showWarningMessage } from '@/utils/message'

export const getAllAreas = async (search: string): Promise<AreaType[]> => {
    const [error, response] = await areaApi.getAreas(search)

    if (error) {
        showWarningMessage('Для поиска городов введите минимум 2 символа!')

        return []
    }

    return response.items
}