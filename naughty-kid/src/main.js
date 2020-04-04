import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
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
      next()
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

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
