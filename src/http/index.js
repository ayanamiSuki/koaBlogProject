import { $axios } from './axios'
export const http = {
  formDataHeaders: () => {
    return {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    }
  },
  jsonHeaders: () => {
    return {
      'Content-Type': 'application/json; charset=UTF-8',
    }
  },
  loading(flag, text) {
    if (flag) {
      window.loadingObj = Vue.prototype.$loading({
        background: 'rgba(0, 0, 0, .1)',
        customClass: 'main-loading-center',
        text: text,
      })
    } else {
      if (window.loadingObj) {
        window.loadingObj.close()
        window.loadingObj = null
      }
    }
  },
  post(url, entity, otherOptions) {
    return this.reqeust(url, entity, 'POST', null, otherOptions)
  },
  get(url, entity, otherOptions) {
    return this.reqeust(url, entity, 'GET', this.jsonHeaders(), otherOptions)
  },
  reqeust(url, entity, method, headers = this.jsonHeaders(), otherOptions = { loading: false, message: false }) {
    let options = {
      headers,
      dataType: 'json',
      url: url,
      method: method,
      otherOptions,
    }
    if (entity && typeof entity !== 'undefined') {
      if (method === 'POST') {
        // options.data = typeof entity === 'string' ? entity : JSON.stringify(entity);
        options.data = entity
      } else {
        options.params = entity
      }
    }

    return $axios(options)
  },
}
