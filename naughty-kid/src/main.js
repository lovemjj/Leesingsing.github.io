import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import './plugins/element.js'

Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  if (to.matched.length === 0) {
    from.name ? next({
      name: from.name
    }) : next('/')
  } else {
    store.state.urlName = to.name
    if (localStorage.getItem('authorization')) {
      store.state.authorization = localStorage.getItem('authorization')
      if (store.state.branch_id) {
        next()
      } else {
        if (to.name !== 'selected') {
          next({
            name: 'selected'
          })
        } else {
          next()
        }
      }
    } else {
      if (to.name !== 'login') {
        store.state.urlName = 'login'
        next({
          name: 'login'
        })
      } else {
        next()
      }
    }
  }
})

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  if (response.data.code === 401) {
    router.replace({ name: 'login' })
  }
  return response
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error)
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
