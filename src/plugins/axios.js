import axios from 'axios'
const $axios = axios.create({
  baseURL: '/api',
})
// request interceptor
$axios.interceptors.request.use(
  (config) => {
    // do something before request is sent
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
    return res
  },
  (error) => {
    console.log('err' + error) // for debug

    return Promise.reject(error)
  },
)
export default $axios
