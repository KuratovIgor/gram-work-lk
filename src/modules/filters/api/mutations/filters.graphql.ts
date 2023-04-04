import type { DocumentNode } from 'graphql/language'
import gql from 'graphql-tag'

export const getFilters = (): DocumentNode => {
    return gql`
        query getFilters ($chatId: String!) {
            default_filter(chat_id: $chatId) {
                chat_id
                search
                salary
                area_id
                area
                schedule
                experience
            }
        }
    `
}

export const saveFilters = (): DocumentNode => {
    return gql`
        mutation saveFilters (
            $chatId: String!,
            $search: String,
            $salary: Int,
            $areaId: String, 
            $area: String, 
            $schedule: String,
            $experience: String
        ) {
            default_filterUpdate(
                data: {
                    chat_id: $chatId,
                    search: $search,
                    salary: $salary,
                    area_id: $areaId,
                    area: $area,
                    schedule: $schedule,
                    experience: $experience,
                },
                filter: {
                    chat_id: $chatId,
                }
            ) {
                id
            }
        }
    `
}