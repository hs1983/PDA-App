import axios from 'axios'
import { MessageBox, Message } from 'mint-ui'
import global_ from '@/config'
import store from '@/store'
import { param as encodeParam } from '@/utils'

// create an axios instance
const service = axios.create({
  baseURL: global_.ApiConfig.apiUrl,
  timeout: global_.ApiConfig.apiTimeout // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {

    if (store.getters.token) {
      config.headers['authorization'] = 'Bearer ' + store.getters.token
    }

    config.paramsSerializer = function (params) {
      return encodeParam(params)
    }

    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  response => {
    const res = response.data

    return res
  },
  error => {
    console.log(error) // for debug

    if (error.status === 401) {
      // to re-login
      MessageBox.confirm(
        'You have been logged out, you can cancel to stay on this page, or log in again',
        'Confirm logout',
        {
          confirmButtonText: 'Re-Login',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }
      ).then(() => {
        store.dispatch('user/resetToken').then(() => {
          location.reload()
        })
      })
    }

    let message = ''
    if (error.response && error.response.data && error.response.data.error) {
      message = error.response.data.error.message
    } else {
      message = error.message
    }

    return Promise.reject(error)
  }
)

export default service
