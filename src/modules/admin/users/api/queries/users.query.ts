import type { DocumentNode } from 'graphql/language'
import gql from 'graphql-tag'

export const getUsersQuery = (): DocumentNode => {
    return gql`
        query getUsers {
            auth_usersList {
                items {
                    chat_id
                    user_id
                    name
                    lastname
                    middlename
                    email
                    phone
                }
                count
            }
        }
    `
}