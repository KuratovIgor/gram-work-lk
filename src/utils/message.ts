import { ElMessage } from 'element-plus'

export const showErrorMessage = (message: string): void => {
    ElMessage({
        message: message,
        type: 'error',
    })
} 