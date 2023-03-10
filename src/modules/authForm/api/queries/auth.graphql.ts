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