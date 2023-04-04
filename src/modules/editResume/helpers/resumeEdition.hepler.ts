import { resumeEditionApi } from '@/modules/editResume/api/resumeEdition.api'
import { showErrorMessage, showSuccessMessage } from '@/utils/message'
import type { ResumeType } from '@/modules/resume'
import type { AvatarType } from '@/modules/editResume/types/avatar.type'

export const saveAvatar = async (file: File): Promise<AvatarType> => {
    const [error, response] = await resumeEditionApi.saveLogo(file)

    if (error) {
        showErrorMessage('При сохранении лого произошла ошибка!')

        return undefined
    }

    showSuccessMessage('Лого сохранено а артефактах!')

    return  {
        id: response.id,
        url: URL.createObjectURL(file),
    }
}

export const editResume = async (resumeEditionFormData: ResumeType): Promise<void> => {
    const [error, _] = await resumeEditionApi.editResume(resumeEditionFormData)

    if (error) {
        showErrorMessage('При сохранении данных произошла ошибка!')
    } else {
        showSuccessMessage('Резюме обновлено!')
    }
}