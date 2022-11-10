import request from '../../src/utils/request'

export default {
  // 组织架构列表相关----------------
  // 获取用户信息列表
  userList (data) {
    return request({
      url: '/user/list',
      type: 'get',
      params: data
    })
  },
  // 用户详情
  userDetails (data) {
    return request({
      url: '/user/query',
      type: 'get',
      params: data
    })
  },
  // 一键同步
  syncDingding () {
    return request({
      url: '/ding-inform/synAll',
      method: 'post',
      // params: data
    })
  },
  // 角色列表
  roleList (data) {
    return request({
      url: '/role/list',
      type: 'get',
      params: data
    })
  },
  // 角色绑定菜单
  roleBinding (data) {
    return request({
      url: '/role/bindingMenu',
      method: 'post',
      params: data
    })
  },
  // 部门列表
  deptList (data) {
    return request({
      url: '/dept/pageList',
      type: 'get',
      params: data
    })
  },
  // 部门下拉产品类型列表
  treeOptionList () {
    return request({
      url: '/productLevelEntity/treeOption',
      type: 'get',
      // params: data
    })
  },
  // 部门接单类型
  deptProBinding (data) {
    return request({
      url: '/productLevelDeptEntity/binding',
      method: 'post',
      params: data,
      qs: false
    })
  },
}
