import request from '../../src/utils/request'

export default {
  // 用户信息列表
  userInfoList (data) {
    return request({
      url: '/userInfoEntity/pageList',
      type: 'get',
      params: data
    })
  },
  // 用户信息详情
  userInfoDetails (data) {
    return request({
      url: '/userInfoEntity/details',
      type: 'get',
      params: data
    })
  },
  // 用户信息新增
  userInfoSave (data) {
    return request({
      url: '/userInfoEntity/save',
      method: 'post',
      params: data,
      qs: false
    })
  },
  // 用户信息编辑
  userInfoEdit (data) {
    return request({
      url: '/userInfoEntity/edit',
      method: 'post',
      params: data,
      qs: false
    })
  },
  // 用户信息删除
  userInfoDel (data) {
    return request({
      url: '/userInfoEntity/del',
      method: 'post',
      params: data,
    })
  },

  // 项目安装列表
  workOrderList (data) {
    return request({
      url: '/installationWorkOrderEntity/pageList',
      type: 'get',
      params: data
    })
  },
  // 项目安装详情
  workOrderDetails (data) {
    return request({
      url: '/installationWorkOrderEntity/details',
      type: 'get',
      params: data
    })
  },
  // 项目安装编辑
  workOrderEdit (data) {
    return request({
      url: '/installationWorkOrderEntity/edit',
      method: 'post',
      params: data,
    })
  },
  // 项目安装删除
  workOrderDel (data) {
    return request({
      url: '/installationWorkOrderEntity/del',
      method: 'post',
      params: data,
    })
  },
  // 获取用户编号下拉框
  getUserOptions () {
    return request({
      url: '/userInfoEntity/userInfOption',
      type: 'get'
      // params: data
    })
  },
}
