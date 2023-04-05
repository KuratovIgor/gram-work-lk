import gql from 'graphql-tag'
import type { DocumentNode } from 'graphql/language'

export const getHistoryQuery = (): DocumentNode => {
    return gql`
        query getHistory ($userId: String!) {
            response_historiesList(filter: {user_id: {equals:$userId}}) {
                items {
                    user_id
                    vacancy_id
                    vacancy_name
                    employer
                    salary_from
                    salary_to
                    area
                    alternate_url
                    status
                    date
                }
            }
        }
    `
}