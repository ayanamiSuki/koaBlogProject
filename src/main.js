import Vue from 'vue'
import App from './App.vue'
import { http } from './http/index'
// import './plugins/element-ui'
import ElementUI from 'element-ui'
import './assets/scss/public/global.scss'
import 'element-ui/lib/theme-chalk/index.css'
import store from '@/store'
Vue.config.productionTip = false

Vue.prototype.$http = http
// ES6 模块导入 如果提供的是一个目录地址，默认导入里面index名称文件
// import router from '@/router/index.js'
Vue.use(ElementUI)
window.Vue = Vue
import router from '@/router/index.js'
new Vue({
  render: (h) => h(App),
  store,
  router,
}).$mount('#app')
