import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    authorization: '',
    id: '',
    name: '',
    urlName: '',
    // authorities: ['工作台', '推拿', '顾客档案', '会员卡', '物料', '员工机构管理', '财务', '统计', '消息管理', '基础字典'],
    authorities: [],
    navAuthorities: [],
    branches: [],
    branch_id: '',
    branch_name: ''
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
