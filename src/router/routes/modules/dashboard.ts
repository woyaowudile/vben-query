import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';
import { t } from '/@/hooks/web/useI18n';

const dashboard: AppRouteModule = {
  path: '/dashboard',
  name: 'Dashboard',
  component: LAYOUT,
  redirect: '/dashboard/analysis',
  meta: {
    orderNo: 10,
    icon: 'ion:grid-outline',
    title: t('routes.dashboard.dashboard'),
  },
  children: [
    {
      path: 'workbench',
      name: 'Workbench',
      component: () => import('/@/views/dashboard/workbench/index.vue'),
      meta: {
        title: t('routes.dashboard.workbench'),
      },
    },
    {
      path: 'analysis',
      name: 'Analysis',
      component: () => import('/@/views/dashboard/analysis/index.vue'),
      meta: {
        // affix: true,
        title: t('routes.dashboard.analysis'),
      },
    },
    {
      path: 'chooseModel',
      name: 'chooseModel',
      component: () => import('/@/views/dashboard/chooseModel/index.vue'),
      meta: {
        title: '筛选',
      },
    },
    {
      path: 'tablePage',
      name: 'tablePage',
      component: () => import('/@/views/dashboard/tablePage/index.vue'),
      meta: {
        title: '一览',
      },
    },
    {
      path: 'analog',
      name: 'Analog',
      component: () => import('/@/views/dashboard/analog/index.vue'),
      meta: {
        // affix: true,
        title: '模拟',
      },
    },
    {
      path: 'test',
      name: 'Test',
      component: () => import('/@/views/dashboard/modelTest/index.vue'),
      meta: {
        // affix: true,
        title: '模型测试',
      },
    },
  ],
};

export default dashboard;
