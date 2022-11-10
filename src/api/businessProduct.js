import request from '../../src/utils/request'

export default {
  // 产品层级列表
  productLevel (data) {
    return request({
      url: '/productLevelEntity/list',
      type: 'get',
      params: data
    })
  },
  // 产品层级新增
  productLevelSave (data) {
    return request({
      url: '/productLevelEntity/save',
      method: 'post',
      params: data
    })
  },
  // 产品层级编辑
  productLevelEdit (data) {
    return request({
      url: '/productLevelEntity/edit',
      method: 'post',
      params: data
    })
  },
  // 产品层级删除
  productLevelDel (data) {
    return request({
      url: '/productLevelEntity/del',
      method: 'post',
      params: data
    })
  },
}
