import { AxiosService } from '@/api/axiosService'
import type { AxiosRequestConfig } from 'axios'
import type { ResumeType } from '@/modules/user/resume'
import { resumeEditionMapper } from '@/modules/user/editResume/mappers/resumeEditionMapper'

class ResumeEditionApi extends AxiosService {
    constructor(config?: AxiosRequestConfig) {
        super(config)
    }

    public saveLogo (file: File) {
        const formData = new FormData()

        formData.append('type', 'photo')

        formData.append('file', file)

        return this.axiosCall({
            method: 'POST',
            url: '/artifacts',
            data: formData,
        })
    }

    public editResume (resume: ResumeType) {
        const resumeEditionData = resumeEditionMapper.getResumeEditionData(resume)

        return this.axiosCall({
            method: 'PUT',
            url: `/resumes/${resume.id}`,
            data: resumeEditionData,
        })
    }
}

export const resumeEditionApi = new ResumeEditionApi({
    baseURL: 'https://api.hh.ru',
    withCredentials: false,
})