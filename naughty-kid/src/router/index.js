import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'index',
    component: () => import('../views/Index.vue')
  },
  {
    path: '/home',
    name: '工作台',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/selected',
    name: 'selected',
    component: () => import('../views/Selected.vue')
  },
  {
    path: '/tuina',
    name: '推拿',
    component: () => import('../views/TuiNa.vue'),
    meta: {
      name: ''
    }
  },
  {
    path: '/dangan',
    name: '顾客档案',
    component: () => import('../views/DangAn.vue')
  },
  {
    path: '/vip',
    name: '会员卡',
    component: () => import('../views/VIP.vue')
  },
  {
    path: '/wuliao',
    name: '物料',
    component: () => import('../views/WuLiao.vue')
  },
  {
    path: '/guanli',
    name: '员工机构管理',
    component: () => import('../views/GuanLi.vue')
  },
  {
    path: '/caiwu',
    name: '财务',
    component: () => import('../views/CaiWu.vue')
  },
  {
    path: '/tongji',
    name: '统计',
    component: () => import('../views/TongJi.vue')
  },
  {
    path: '/xiaoxi',
    name: '消息管理',
    component: () => import('../views/XiaoXi.vue')
  },
  {
    path: '/zidian',
    name: '基础字典',
    component: () => import('../views/ZiDian.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
