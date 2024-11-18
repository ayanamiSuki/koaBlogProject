const TokenKey = 'aya-token'

export function setToken(value) {
  const item = {
    value,
  }
  localStorage.setItem(TokenKey, JSON.stringify(item))
}

export function removeToken() {
  localStorage.removeItem(TokenKey)
}

export function getToken() {
  const itemStr = localStorage.getItem(TokenKey)
  if (!itemStr) {
    return null
  }
  const item = JSON.parse(itemStr)
  // 目前不设置超时的时间了，暂时注释
  // const now = new Date()
  // if (now.getTime() > item.expires) {
  //     localStorage.removeItem(TokenKey)
  //     return null
  // }

  // item.data 是管理系统那边的名字，要实现管理系统欢迎页面跳转screen，共享登录状态
  return item.value
}
