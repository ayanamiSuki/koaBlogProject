import { getToken } from '@/common/auth'
import { http } from '@/http'
import store from '@/store'

export async function fed(to, from, next, router) {
  const token = getToken()
  if (token && !store.state.userInfo?.username) {
    await handleLogin().then(() => {
      next()
    })
  } else {
    next()
  }
}

function handleLogin() {
  return http.get('/users/getUser').then((res) => {
    store.dispatch('loginUser', res)
  })
}
