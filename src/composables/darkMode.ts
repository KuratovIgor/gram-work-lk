import { ref, readonly } from 'vue'

const isDarkMode = ref(false)

export const useDarkMode = (): any => {
    const setDarkMode = (value: boolean): void => {
        isDarkMode.value = value
    }

    return {
        isDarkMode: readonly(isDarkMode),
        setDarkMode,
    }
}