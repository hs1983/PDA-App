// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'

// 引入Vue路由
import router from './router'

//引入vuex
import store from './store/index'

// 引入MintUI，使用
import MintUI from 'mint-ui'

import 'mint-ui/lib/style.css'
Vue.use(MintUI)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
