import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import Vant from 'vant'
import 'vant/lib/index.css'
import moment from 'moment'

Vue.use(Vant)
Vue.config.productionTip = false

moment.updateLocale('en', {
  week: {
    dow: 1
  }
})

router.beforeEach((to, from, next) => {
  if (to.name !== 'login' && to.name !== 'selected') {
    const arr = store.state.include.filter((ele) => {
      return ele === to.name
    })
    if (arr.length === 0) {
      store.state.include.push(to.name)
    }
  }
  if (to.matched.length === 0) {
    from.name ? next({
      name: from.name
    }) : next('/')
  } else {
    store.state.urlName = to.name
    if (localStorage.getItem('authorization') && localStorage.getItem('id')) {
      store.state.authorization = localStorage.getItem('authorization')
      store.state.id = parseInt(localStorage.getItem('id'))
      if (localStorage.getItem('branch_id')) {
        store.state.branch_id = localStorage.getItem('branch_id')
        next()
      } else {
        if (to.name !== 'selected') {
          store.state.urlName = 'selected'
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
  if (response.data.code === 402) {
    Vue.prototype.$notify({ message: 'root账号无法操作', type: 'warning' })
    store.state.show = false
  } else {
    return response
  }
}, function (error) {
  // 对响应错误做点什么
  store.state.show = false
  return Promise.reject(error)
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
