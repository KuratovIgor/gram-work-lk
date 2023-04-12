import type { DocumentNode } from 'graphql/language'
import gql from 'graphql-tag'

export const getSalaries = (): DocumentNode => {
    return gql`
        query getSalaries ($userId: String!, $month: String) {
            response_historiesList(filter: {user_id: {equals:$userId}, AND: {date: {starts_with:$month}}}) {
                items {
                    salary_from
                    salary_to
                    status
                }
            }
        }
    `
}