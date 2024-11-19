import { getToken } from '@/common/auth'
import { BASR_URL } from '@/common/ips'
import axios from 'axios'
const $http = axios.create({
  baseURL: `${BASR_URL}`,
  // withCredentials: true,
})
// request interceptor
$http.interceptors.request.use(
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
$http.interceptors.response.use(
  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  (response) => {
    const res = response.data
    // const { code, msg, data } = res.code
    // if (code === 0) {
    //   return data
    // }
    // if (code === 401) {
    //   removeToken()
    //   return window.location.reload()
    // }
    return res
  },
  (error) => {
    console.log('err' + error) // for debug

    return Promise.reject(error)
  },
)
export default $http
