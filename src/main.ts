import { createApp } from 'vue'
import { createPinia } from 'pinia'
import IconTemplate from '@/components/common/IconTemplate.vue'
import 'virtual:svg-icons-register'
import 'virtual:fonts.css'
import './permissions'

import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

import '@/styles/index.scss'

import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client/core'
import { createApolloProvider } from '@vue/apollo-option'
import { provideApolloClient } from '@vue/apollo-composable'

const httpLink = new HttpLink({
  uri: 'https://uk.api.8base.com/clbmch9qo002v08lfal9zccgy',
})

const apolloClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
  connectToDevTools: true,
})

const apolloProvider = createApolloProvider({
  defaultClient: apolloClient,
})

provideApolloClient(apolloClient)

const app = createApp(App)

app.component('IconTemplate', IconTemplate)

app.use(createPinia())

app.use(ElementPlus)

app.use(router)

app.use(apolloProvider)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.mount('#app')
