import { ElMessage, ElNotification } from 'element-plus'

export const showErrorMessage = (message: string): void => {
    ElNotification({
        title: 'Ошибка',
        message,
        type: 'error',
        position: 'bottom-right',
    })
}

export const showSuccessMessage = (message: string): void => {
    ElNotification({
        title: 'Успех',
        message,
        type: 'success',
        position: 'bottom-right',
    })
}

export const showWarningMessage = (message: string): void => {
    ElNotification({
        title: 'Предупреждение',
        message,
        type: 'warning',
        position: 'bottom-right',
    })
}