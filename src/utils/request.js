import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import router from '@/router'
import { getToken,getTime } from '@/utils/auth'

// create an axios instance
const request = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 10000 // request timeout
})

// // 添加请求拦截器
// request.interceptors.request.use(function (config) {
//   // 在发送请求之前查看token是否过期
//   const token = store.state.user.token
//   if (token) {
//     const time = Date.now() - getTime()
//     if (time > 7200000) {
//       store.dispatch('user/logout')
//       router.push('/login')
//     }
//     config.headers['Authorization'] = token
//   }
//   return config
// }, function (error) {
//   // 对请求错误返回
//   return Promise.reject(error)
// })

// 没有时间限制的token,开发用
// request interceptor
request.interceptors.request.use(
  config => {
    // do something before request is sent

    if (store.getters.token) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      config.headers['X-Token'] = getToken()
    }
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// // 添加响应拦截器
// request.interceptors.response.use(function (response) {
//   const { data, message, success } = response.data
//   if (success) {
//     // 对响应数据做点什么
//     return data
//   } else {
//     Message.error(message)
//     return Promise.reject(new Error(message))
//   }
// }, function (error) {
//   console.dir(error)
//   if (error.response && error.response.data && error.response.data.code === 10002) {
//     store.dispatch('user/logout')
//     router.push('/login')
//   }
//   // 对响应错误做点什么
//   return Promise.reject(error)
// })

// response interceptor
request.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    const res = response.data

    // if the custom code is not 20000, it is judged as an error.
    if (res.code !== 20000) {
      Message({
        message: res.message || 'Error',
        type: 'error',
        duration: 5 * 1000
      })

      // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
      if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
        // to re-login
        MessageBox.confirm('You have been logged out, you can cancel to stay on this page, or log in again', 'Confirm logout', {
          confirmButtonText: 'Re-Login',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {
          store.dispatch('user/resetToken').then(() => {
            location.reload()
          })
        })
      }
      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      return res
    }
  },
  error => {
    console.log('err' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default request
