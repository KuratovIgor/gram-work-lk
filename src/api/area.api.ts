import { AxiosService } from '@/api/axiosService'
import type { AxiosRequestConfig } from 'axios'

class AreaApi extends AxiosService {
    constructor(config?: AxiosRequestConfig) {
        super(config)
    }

    public getAreas (search: string) {
        return this.axiosCall({
            method: 'GET',
            url: '/suggests/area_leaves',
            params: {
              text: search,
            },
        })
    }
}

export const areaApi = new AreaApi({
    baseURL: 'https://api.hh.ru',
    withCredentials: false,
})