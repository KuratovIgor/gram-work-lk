import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client/core'

const httpLink = new HttpLink({
    uri: 'https://uk.api.8base.com/clbmch9qo002v08lfal9zccgy',
})

export const apolloClient = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
    connectToDevTools: true,
})
