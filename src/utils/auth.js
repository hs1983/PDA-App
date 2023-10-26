// import Cookies from 'js-cookie'
import store from '@/store'

const TokenKey = 'Admin-Token'

export function getToken() {
  return localStorage.getItem(TokenKey)
  // return Cookies.get(TokenKey)
}

export async function setToken(token) {
  // const result = Cookies.set(TokenKey, token)
  const result = localStorage.setItem(TokenKey, token)
  // await store.dispatch('app/applicationConfiguration')
  return result
}

export async function removeToken() {
  // const result = Cookies.remove(TokenKey)
  const result =  localStorage.removeItem(TokenKey)
  // await store.dispatch('app/applicationConfiguration')
  return result
}
