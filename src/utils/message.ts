import { ElMessage } from 'element-plus'

export const showErrorMessage = (message: string): void => {
    ElMessage({
        message,
        type: 'error',
    })
}

export const showSuccessMessage = (message: string): void => {
    ElMessage({
        message,
        type: 'success',
    })
}

export const showWarningMessage = (message: string): void => {
    ElMessage({
        message,
        type: 'warning',
    })
}