import gql from 'graphql-tag'
import type { DocumentNode } from 'graphql/language'

export const getInvitationsCount = (): DocumentNode => {
    return gql`
        query getInvitations($userId: String!) {
            response_historiesList(filter: {status: {equals: "Приглашение"}, user_id: {equals: $userId}}) {
                count
            }
        }
    `
}

export const getFailuresCount = (): DocumentNode => {
    return gql`
        query getInvitations($userId: String!) {
            response_historiesList(filter: {status: {equals: "Отказ"}, user_id: {equals: $userId}}) {
                count
            }
        }
    `
}

export const getResponsesCount = (): DocumentNode => {
    return gql`
        query getInvitations($userId: String!) {
            response_historiesList(filter: {status: {equals: "Отклик"}, user_id: {equals: $userId}}) {
                count
            }
        }
    `
}