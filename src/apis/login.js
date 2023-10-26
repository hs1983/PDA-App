import request from '@/utils/request'

//获取登录信息
export function getAuthInfo() {
    return request({
      url: '/api/cms/auth/authinfo',
      method: 'get'
    })
  }
