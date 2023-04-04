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
          component: () => import('@/pages/AuthPage/AuthPage.vue'),
          meta: {
            title: 'GramWork',
          },
        },
        {
          path: '/profile',
          name: 'ProfilePage',
          component: () => import('@/pages/ProfilePage/ProfilePage.vue'),
          meta: {
            title: 'GW | Профиль',
          },
        },
        {
          path: '/statistic',
          name: 'StatisticPage',
          component: () => import('@/pages/StatisticPage/StatisticPage.vue'),
          meta: {
            title: 'GW | Статистика',
          },
        },
        {
          path: '/resume',
          name: 'ResumePage',
          component: () => import('@/pages/ResumePage/ResumePage.vue'),
          meta: {
            title: 'GW | Резюме',
          },
        },
        {
          path: '/resume/:resumeId',
          name: 'ResumeEditionPage',
          component: () => import('@/pages/ResumeEditionPage/ResumeEditionPage.vue'),
          meta: {
            title: 'GW | Резюме',
          },
        },
        {
          path: '/history',
          name: 'HistoryPage',
          component: () => import('@/pages/HistoryPage/HistoryPage.vue'),
          meta: {
            title: 'GW | История',
          },
        },
        {
          path: '/filters',
          name: 'BotFiltersPage',
          component: () => import('@/pages/BotFiltersPage/BotFiltersPage.vue'),
          meta: {
            title: 'GW | Фильтры',
          },
        },
      ],
    },
  ]
})

router.beforeEach((to) => {
  document.title = to.meta.title as string
})

export default router
