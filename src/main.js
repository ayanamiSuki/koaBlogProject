import Vue from 'vue'
import App from './App.vue'
import { http } from './http/index'
import './config/ele'
import './assets/scss/tailwind.css'
import './assets/scss/public/global.scss'
import '@wangeditor/editor/dist/css/style.css'

import store from '@/store'
Vue.config.productionTip = false

Vue.prototype.$http = http
window.Vue = Vue
import router from '@/router/index.js'
new Vue({
  render: (h) => h(App),
  store,
  router,
}).$mount('#app')
