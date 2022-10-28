import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '工作台', icon: 'desktop' }
    }]
  },

  {
    path: '/organization',
    component: Layout,
    redirect: '/organization/workersList',
    name: 'Organization',
    meta: { title: '组织架构管理', icon: 'setting' },
    children: [
      {
        path: 'workersList',
        name: 'WorkersList',
        component: () => import('@/views/organizations/workersList/index'),
        meta: { title: '组织架构人员列表', icon: 'el-icon-minus' },
      },
      {
        path: 'details',
        name: 'Details',
        component: () => import('@/views/organizations/workersList/details'),
        meta: { title: '组织架构人员详情', icon: 'el-icon-minus' },
        hidden: true
      },
      {
        path: 'departmentMatch',
        name: 'DepartmentMatch',
        component: () => import('@/views/organizations/departmentMatch/index'),
        meta: { title: '部门接单类型分配', icon: 'el-icon-minus' }
      },
      {
        path: 'rolesList',
        name: 'RolesList',
        component: () => import('@/views/organizations/rolesList/index'),
        meta: { title: '角色管理', icon: 'el-icon-minus' }
      }
    ]
  },
  {
    path: '/businessProduct',
    component: Layout,
    children: [
      {
        path: 'businessProduct',
        name: 'BusinessProduct',
        component: () => import('@/views/businessProduct/index'),
        meta: { title: '业务产品层级管理', icon: 'share' }
      }
    ]
  },
  {
    path: '/userInfo',
    component: Layout,
    redirect: '/userInfo/usersAdd',
    name: 'UserInfo',
    meta: { title: '用户信息管理', icon: 'file-copy' },
    children: [
      {
        path: 'usersList',
        name: 'usersList',
        component: () => import('@/views/userInfo/usersList/index'),
        meta: { title: '用户信息列表', icon: 'el-icon-minus' }
      },
      {
        path: 'workOrderList',
        name: 'WorkOrderList',
        component: () => import('@/views/userInfo/workOrderList/index'),
        meta: { title: '项目安装单查询', icon: 'el-icon-minus' }
      }
    ]
  },
  {
    path: '/faultTypeList',
    component: Layout,
    children: [
      {
        path: 'faultTypeList',
        name: 'FaultTypeList',
        component: () => import('@/views/faultTypeList/index'),
        meta: { title: '保修故障类型管理', icon: 'tools' }
      }
    ]
  },
  {
    path: '/operationOrder',
    component: Layout,
    redirect: '/operationOrder/orderList',
    name: 'OperationOrder',
    meta: { title: '运维工单管理', icon: 'view-module' },
    children: [
      {
        path: 'orderList',
        name: 'orderList',
        component: () => import('@/views/operationOrder/orderList/index'),
        meta: { title: '运维工单列表', icon: 'el-icon-minus' }
      },
      {
        path: 'orderList-cus',
        name: 'OrderList-cus',
        component: () => import('@/views/operationOrder/orderList-cus/index'),
        meta: { title: '运维工单池', icon: 'el-icon-minus' }
      }, {
        path: 'orderBackList',
        name: 'OrderBackList',
        component: () => import('@/views/operationOrder/orderBackList/index'),
        meta: { title: '退回运维工单列表', icon: 'el-icon-minus' }
      },
      {
        path: 'checkingOrder',
        name: 'CheckingOrder',
        component: () => import('@/views/operationOrder/checkingOrder/index'),
        meta: { title: '审核运维工单', icon: 'el-icon-minus' }
      },
      {
        path: 'installOrder',
        name: 'InstallOrder',
        component: () => import('@/views/operationOrder/installOrder/index'),
        meta: { title: '项目安装单查询', icon: 'el-icon-minus' }
      }
    ]
  },
  {
    path: '/agent',
    component: Layout,
    redirect: '/agent/agentList',
    name: 'Agent',
    meta: { title: '代维单位管理', icon: 'fork' },
    children: [
      {
        path: 'agentList',
        name: 'AgentList',
        component: () => import('@/views/agent/agentList/index'),
        meta: { title: '代维单位列表', icon: 'el-icon-minus' }
      },
      {
        path: 'agentOperation',
        name: 'AgentOperation',
        component: () => import('@/views/agent/agentOperation/index'),
        meta: { title: '代维单位转单记录', icon: 'el-icon-minus' }
      }
    ]
  },
  {
    path: '/announcement',
    component: Layout,
    children: [
      {
        path: 'announcement',
        name: 'Announcement',
        component: () => import('@/views/announcement/index'),
        meta: { title: '公告管理', icon: 'root-list' }
      }
    ]
  },
  {
    path: '/systemDailyWork',
    component: Layout,
    children: [
      {
        path: 'systemDailyWork',
        name: 'SystemDailyWork',
        component: () => import('@/views/systemDailyWork/index'),
        meta: { title: '系统人员日志记录', icon: 'usergroup' }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter () {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
