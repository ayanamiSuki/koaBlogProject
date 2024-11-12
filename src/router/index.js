// 导入资源配置<br>
import Vue from 'vue'
import Router from 'vue-router'
// 把路由对应的组件和Hash映射起来
import Center from '@/views/center.vue'
import Index from '@/views/index.vue'
import Editor from '@/views/editor.vue'
import ListDetail from '@/views/listDetail.vue'
import Picture from '@/views/picture.vue'
// 安装Router插件
Vue.use(Router)
const routes = [
  { path: '/', redirect: '/home' },
  { path: '/home', component: Index },
  { path: '/center', component: Center },
  { path: '/editor', component: Editor },
  { path: '/listDetail', component: ListDetail },
  { path: '/picture', component: Picture },
]

const router = new Router({ routes })
// 导出Router实例
export default router
