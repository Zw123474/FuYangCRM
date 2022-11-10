import request from '../../src/utils/request'

export default {
  // 产品层级列表
  faultType (data) {
    return request({
      url: '/faultTypeEntity/list',
      type: 'get',
      params: data
    })
  },
  // 产品层级新增
  faultTypeSave (data) {
    return request({
      url: '/faultTypeEntity/save',
      method: 'post',
      params: data
    })
  },
  // 产品层级编辑
  faultTypeEdit (data) {
    return request({
      url: '/faultTypeEntity/edit',
      method: 'post',
      params: data
    })
  },
  // 产品层级删除
  faultTypeDel (data) {
    return request({
      url: '/faultTypeEntity/del',
      method: 'post',
      params: data
    })
  },
}
