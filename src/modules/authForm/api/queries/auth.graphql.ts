import gql from 'graphql-tag'
import type { DocumentNode } from 'graphql/language'

export const getUserQuery = (): DocumentNode => {
    return gql`
        query MyQuery ($chatId: String!) {
            login(chat_id: $chatId) {
                access_token
                refresh_token
            }
        }
    `
}