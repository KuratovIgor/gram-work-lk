import { AxiosService } from '@/api/axiosService'
import type { AxiosRequestConfig } from 'axios'

class ResumesApi extends AxiosService {
    constructor(config?: AxiosRequestConfig) {
        super(config)
    }

    public getResumes () {
        return this.axiosCall({
            method: 'GET',
            url: '/resumes/mine'
        })
    }
}

export const resumesApi = new ResumesApi({
    baseURL: '',
    withCredentials: true,
})