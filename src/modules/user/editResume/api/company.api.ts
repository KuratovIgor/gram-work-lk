import { AxiosService } from '@/api/axiosService'
import type { AxiosRequestConfig } from 'axios'

class CompanyApi extends AxiosService {
    constructor(config?: AxiosRequestConfig) {
        super(config)
    }

    public getCompanies (search: string) {
        return this.axiosCall({
            method: 'GET',
            url: '/suggests/companies',
            params: {
                text: search,
            },
        })
    }
}

export const companyApi = new CompanyApi({
    baseURL: '',
    withCredentials: true,
})