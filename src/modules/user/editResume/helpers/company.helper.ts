import type { CompanyType } from '@/modules/user/editResume/types/company.type'
import { companyApi } from '@/modules/user/editResume/api/company.api'
import { showWarningMessage } from '@/utils/message'

export const getAllCompanies = async (search: string): Promise<CompanyType[]> => {
    const [error, response] = await companyApi.getCompanies(search)

    if (error) {
        showWarningMessage('Для поиска компаний введите минимум 2 символа!')

        return []
    }

    return response.items
}