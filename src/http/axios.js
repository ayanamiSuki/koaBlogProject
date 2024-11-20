import { getToken, removeToken } from '@/common/auth'
import { BASR_URL } from '@/common/ips'
import axios from 'axios'
export const $axios = axios.create({
  baseURL: `${BASR_URL}`,
  // withCredentials: true,
})
// request interceptor
$axios.interceptors.request.use(
  (config) => {
    // do something before request is sent
    const token = getToken()
    if (token) {
      config.headers.Authorization = 'Bearer ' + token
    }
    return config
  },
  (error) => {
    // do something with request error
    return Promise.reject(error)
  },
)

// response interceptor
$axios.interceptors.response.use(
  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  (response) => {
    const res = response.data
    const { code, msg, data } = res
    if (code === -1) {
      window.Vue.prototype.$message.warning(msg)
      return null
    }
    // if (code === 0) {
    //   return data
    // }
    // if (code === 401) {
    //   removeToken()
    //   return window.location.reload()
    // }
    return data
  },
  (error) => {
    // 提示消息
    let message = ''
    let method = ''
    if (error.response && error.response.status) {
      switch (error.response.status) {
        case 400:
          message = '请求错误！'
          break
        case 401:
          message = '请求要求用户的身份认证！'
          removeToken()
          break
        case 403:
          message = '请求被拒绝！'
          break
        case 404:
          method = ''
          if (error.response.data) {
            if (error.response.data.path) {
              method = ' ' + method.substring(method.lastIndexOf('/') + 1) + ' '
            } else if (error.response.config.url) {
              method = ' ' + error.response.config.url.split('?')[0] + ' '
            }
          }
          message = `请求的资源${method}无法找到！`
          break
        case 405:
          message = '请求中的方法被禁止！'
          break
        case 500:
          message = '请求无法完成，服务器内部错误！'
          break
        case 502:
          message = '请求服务器网关无法响应！'
          break
        default:
          message = '未知错误！'
          break
      }
    } else {
      message = '网络无法建立连接，请检查网络是否正常！'
    }
    error.message = message
    error.response = 1
    window.Vue.prototype.$message({
      message: message,
      type: 'error',
      duration: 5 * 1000,
    })

    return Promise.reject(error)
  },
)
