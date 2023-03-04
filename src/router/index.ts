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
        {
          path: '/profile',
          name: 'ProfilePage',
          component: () => import('@/pages/ProfilePage/ProfilePage.vue')
        },
        {
          path: '/statistic',
          name: 'StatisticPage',
          component: () => import('@/pages/StatisticPage/StatisticPage.vue')
        },
        {
          path: '/resume',
          name: 'ResumePage',
          component: () => import('@/pages/ResumePage/ResumePage.vue')
        },
        {
          path: '/history',
          name: 'HistoryPage',
          component: () => import('@/pages/HistoryPage/HistoryPage.vue')
        },
      ],
    },
  ]
})

export default router
