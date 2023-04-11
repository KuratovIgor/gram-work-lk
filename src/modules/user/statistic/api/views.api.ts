import { AxiosService } from '@/api/axiosService'
import type { AxiosRequestConfig } from 'axios'

class ResumeViewsApi extends AxiosService {
    constructor(config?: AxiosRequestConfig) {
        super(config)
    }

    public getResumeViews(resumeId: string, page: number) {
        return this.axiosCall({
            method: 'GET',
            url: `/resumes/${resumeId}/views`,
            params: {
                page,
            },
        })
    }
}

export const resumeViewsApi = new ResumeViewsApi({
    baseURL: 'https://api.hh.ru',
    withCredentials: false,
})