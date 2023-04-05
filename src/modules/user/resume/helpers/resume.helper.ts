import { resumesApi } from '@/modules/user/resume/api/resumes.api'
import { showErrorMessage } from '@/utils/message'
import { resumeApi } from '@/api/resume.api'
import { parseResumeInfo } from '@/helpers/resume.helper'
import type { ResumeType } from '@/modules/user/resume'

export const getResumes = async (): Promise<ResumeType[]> => {
    const resumes: ResumeType[] = []
    
    const [error, response] = await resumesApi.getResumes()

    if (error) {
        showErrorMessage('При получении резюме произошла ошибка!')

        return []
    }

    for (const item of response.items) {
        const [error, resumeResponse] = await resumeApi.getResume(item.id)

        if (error) {
            showErrorMessage('При получении резюме произошла ошибка!')

            return []
        }

        const resume = parseResumeInfo(resumeResponse)

        resumes.push(resume)
    }

    return resumes
}