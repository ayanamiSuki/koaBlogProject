// 导入资源配置<br>
import Vue from 'vue'
import Router from 'vue-router'
// 把路由对应的组件和Hash映射起来
import Index from '@/views/index.vue'
import Editor from '@/views/editor.vue'
import ListDetail from '@/views/listDetail.vue'
import { fed } from './fed'
// 安装Router插件
Vue.use(Router)
const routes = [
  { path: '/', redirect: '/home' },
  { path: '/home', component: Index },
  { path: '/center', component: () => import('@/views/center.vue') },
  { path: '/editor', component: () => import('@/views/editor.vue') },
  { path: '/listDetail', component: () => import('@/views/listDetail.vue') },
]

const router = new Router({ routes })

router.beforeEach((to, from, next) => {
  // 设置页面标题
  fed(to, from, next, router)
})
// 导出Router实例
export default router
