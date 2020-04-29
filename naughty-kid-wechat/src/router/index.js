import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
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
    path: '/wenzhenjiedai',
    name: 'wenzhenjiedai',
    component: () => import('../views/WenZhenJieDai.vue')
  },
  {
    path: '/huiyuanka',
    name: 'huiyuanka',
    component: () => import('../views/HuiYuanKa.vue')
  },
  {
    path: '/jiedanlishi',
    name: 'jiedanlishi',
    component: () => import('../views/JieDanLiShi.vue')
  },
  {
    path: '/zhenduankaifang',
    name: 'zhenduankaifang',
    component: () => import('../views/ZhenDuanKaiFang.vue')
  },
  {
    path: '/zhenduankaifanginfo',
    name: 'zhenduankaifanginfo',
    component: () => import('../views/ZhenDuanKaiFangInfo.vue')
  },
  {
    path: '/shoufei',
    name: 'shoufei',
    component: () => import('../views/ShouFei.vue')
  },
  {
    path: '/tuinazhixing',
    name: 'tuinazhixing',
    component: () => import('../views/TuiNaZhiXing.vue')
  },
  {
    path: '/kaishizhixing',
    name: 'kaishizhixing',
    component: () => import('../views/KaiShiZhiXing.vue')
  },
  {
    path: '/zhixingzhong',
    name: 'zhixingzhong',
    component: () => import('../views/ZhiXingZhong.vue')
  },
  {
    path: '/querenwancheng',
    name: 'querenwancheng',
    component: () => import('../views/QueRenWanCheng.vue')
  },
  {
    path: '/yiqueren',
    name: 'yiqueren',
    component: () => import('../views/YiQueRen.vue')
  },
  {
    path: '/wodebaogao',
    name: 'wodebaogao',
    component: () => import('../views/WoDeBaoGao.vue')
  },
  {
    path: '/baogaolishi',
    name: 'baogaolishi',
    component: () => import('../views/BaoGaoLiShi.vue')
  },
  {
    path: '/caogaoxiang',
    name: 'caogaoxiang',
    component: () => import('../views/CaoGaoXiang.vue')
  },
  {
    path: '/yuangongbaogao',
    name: 'yuangongbaogao',
    component: () => import('../views/YuanGongBaoGao.vue')
  },
  {
    path: '/bianxiebaogao',
    name: 'bianxiebaogao',
    component: () => import('../views/BianXieBaoGao.vue')
  },
  {
    path: '/xiaoxi',
    name: 'xiaoxi',
    component: () => import('../views/XiaoXi.vue')
  },
  {
    path: '/mendianyunying',
    name: 'mendianyunying',
    component: () => import('../views/MenDianYunYing.vue')
  },
  {
    path: '/wuliaoguanli',
    name: 'wuliaoguanli',
    component: () => import('../views/WuLiaoGuanLi.vue')
  },
  {
    path: '/bendiankucun',
    name: 'bendiankucun',
    component: () => import('../views/BenDianKuCun.vue')
  },
  {
    path: '/biangengmingxi',
    name: 'biangengmingxi',
    component: () => import('../views/BianGengMingXi.vue')
  },
  {
    path: '/zongkucun',
    name: 'zongkucun',
    component: () => import('../views/ZongKuCun.vue')
  },
  {
    path: '/diaopeishenqing',
    name: 'diaopeishenqing',
    component: () => import('../views/DiaoPeiShenQing.vue')
  },
  {
    path: '/diaopeijilu',
    name: 'diaopeijilu',
    component: () => import('../views/DiaoPeiJiLu.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
