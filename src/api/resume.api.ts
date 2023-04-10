import { AxiosService } from '@/api/axiosService'
import type { AxiosRequestConfig } from 'axios'

class ResumeApi extends AxiosService {
    constructor(config?: AxiosRequestConfig) {
        super(config)
    }

    public getResume (resumeId: string) {
        return this.axiosCall({
            method: 'GET',
            url: `/resumes/${resumeId}`
        })
    }
}

export const resumeApi = new ResumeApi({
    baseURL: 'https://api.hh.ru',
    withCredentials: false,
})