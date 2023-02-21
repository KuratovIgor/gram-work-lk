import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'MainLayout',
      component: () => import('@/layouts/MainLayout.vue'),
      redirect: {
        name: 'AuthPage',
      },
      children: [
        {
          path: '/auth',
          name: 'AuthPage',
          component: () => import('@/pages/AuthPage/AuthPage.vue')
        },
      ],
    },
  ]
})

export default router
