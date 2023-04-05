import gql from 'graphql-tag'
import type { DocumentNode } from 'graphql/language'

export const getUserQuery = (): DocumentNode => {
    return gql`
        query getUser ($chatId: String!) {
            login(chat_id: $chatId) {
                access_token
                refresh_token
                user_id
            }
        }
    `
}

export const getAdminQuery = (): DocumentNode => {
    return gql`
        query getAdmin ($login: String!, $password: String!) {
            adminsList(filter: {login: {equals:$login}, AND: {password: {equals:$password}}}) {
                items {
                    name
                }
            }
        }
    `
}