import { format } from 'date-fns'
import { ru } from 'date-fns/locale'

export const getDateFormat = (date: Date | number, dateFormat: string): string => {
    return format(date, dateFormat, { locale: ru })
}
