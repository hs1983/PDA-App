import request from '@/utils/request'
import qs from 'querystring'

// export function login(data) {
//     console.log(qs.stringify(data))
//   return request({
//     url: '/connect/token',
//     method: 'post',
//     headers: { 'content-type': 'application/x-www-form-urlencoded' },
//     data: qs.stringify(data)
//   })
// }


export function login(data) {
  console.log(qs.stringify(data))
return request({
  url: '/api/cms/auth/login',
  method: 'post',
  headers: { 'content-type': 'application/json; charset=utf-8' },
  data: JSON.stringify(data) 
  // data: qs.stringify(data)
})
}


export function getInfo() {
  return request({
    url: '/api/identity/my-profile',
    method: 'get'
  })
}

export function logout() {
  return request({
    url: '/api/account/logout',
    method: 'get'
  })
}
