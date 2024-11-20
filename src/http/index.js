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
  post(url, entity) {
    return this.reqeust(url, entity, 'POST')
  },
  get(url, entity, noToken = false) {
    return this.reqeust(url, entity, 'GET', this.jsonHeaders(), noToken)
  },
  reqeust(url, entity, method, headers = this.jsonHeaders(), noToken = false) {
    let options = {
      headers,
      dataType: 'json',
      url: url,
      method: method,
      noToken,
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
