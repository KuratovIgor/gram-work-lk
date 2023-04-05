import gql from 'graphql-tag'
import type { DocumentNode } from 'graphql/language'

export const getProfileQuery = (): DocumentNode => {
    return gql`
        query getProfile($chatId: String!, $userId: String!) {
            auth_usersList(filter: {chat_id: {equals:$chatId}, AND: {user_id: {equals:$userId}}}) {
                items {
                    name
                    lastname
                    middlename
                    email
                    phone
                }
            }
        }
    `
}