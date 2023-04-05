import axios from 'axios'
import { getAccessToken } from '@/utils/cookie'

export const downloadResumePdf = async (url: string, fileName: string): Promise<void> => {
    const response = await axios({
        url: url,
        headers: {
            'Authorization': `Bearer ${getAccessToken()}`
        },
        responseType: 'blob'
    })

    const href = URL.createObjectURL(response.data)

    const link = document.createElement('a')

    link.href = href

    link.download = `${fileName}.pdf`

    link.click()
}