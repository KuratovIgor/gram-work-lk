import { AxiosService } from '@/api/axiosService'
import type { AxiosRequestConfig } from 'axios'

class ResumeApi extends AxiosService {
    constructor(config?: AxiosRequestConfig) {
        super(config)
    }

    public getResumes () {
        return this.axiosCall({
            method: 'GET',
            url: '/resumes/mine'
        })
    }

    public getResume (resumeId: number) {
        return this.axiosCall({
            method: 'GET',
            url: `/resumes/${resumeId}`
        })
    }
}

export const resumeApi = new ResumeApi({
    baseURL: '',
    withCredentials: true,
})