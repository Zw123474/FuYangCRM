import request from '../../src/utils/request'

export default {
  // 登录
  login (data) {
    return request({
      url: '/user/login',
      method: 'post',
      params: data
    })
  },
}
