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
          component: () => import('@/pages/User/ProfilePage/ProfilePage.vue'),
          meta: {
            title: 'GW | Профиль',
          },
        },
        {
          path: '/statistic',
          name: 'StatisticPage',
          component: () => import('@/pages/User/StatisticPage/StatisticPage.vue'),
          meta: {
            title: 'GW | Статистика',
          },
        },
        {
          path: '/resume',
          name: 'ResumePage',
          component: () => import('@/pages/User/ResumePage/ResumePage.vue'),
          meta: {
            title: 'GW | Резюме',
          },
        },
        {
          path: '/resume/:resumeId',
          name: 'ResumeEditionPage',
          component: () => import('@/pages/User/ResumeEditionPage/ResumeEditionPage.vue'),
          meta: {
            title: 'GW | Резюме',
          },
        },
        {
          path: '/history',
          name: 'HistoryPage',
          component: () => import('@/pages/User/HistoryPage/HistoryPage.vue'),
          meta: {
            title: 'GW | История',
          },
        },
        {
          path: '/filters',
          name: 'BotFiltersPage',
          component: () => import('@/pages/User/BotFiltersPage/BotFiltersPage.vue'),
          meta: {
            title: 'GW | Фильтры',
          },
        },
        {
          path: '/admin/profile',
          name: 'AdminProfilePage',
          component: () => import('@/pages/Admin/ProfilePage/AdminProfilePage.vue'),
          meta: {
            title: 'GW | Фильтры',
          }
        },
        {
          path: '/admin/users',
          name: 'UsersProfilePage',
          component: () => import('@/pages/Admin/UsersPage/UsersPage.vue'),
          meta: {
            title: 'GW | Пользователи',
          }
        },
        {
          path: '/admin/statistic',
          name: 'AdminStatisticPage',
          component: () => import('@/pages/Admin/AdminStatisticPage/AdminStatisticPage.vue'),
          meta: {
            title: 'GW | Статистика',
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
