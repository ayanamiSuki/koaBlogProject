import { getToken } from '@/common/auth'

export async function fed(to, from, next, router) {
  // const token = getToken()
  next()
}
