import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    authorization: '',
    id: '',
    authorities: [],
    branch_id: '',
    show: false,
    include: []
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
