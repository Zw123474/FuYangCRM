import request from '../../src/utils/request'

export default {
  // 代维单位列表
  agentList (data) {
    return request({
      url: '/agentMaintainUnitEntity/pageList',
      type: 'get',
      params: data
    })
  },
  // 代维单位新增
  agentListSave (data) {
    return request({
      url: '/agentMaintainUnitEntity/save',
      method: 'post',
      params: data
    })
  },
  // 代维单位详情
  agentListDetails (data) {
    return request({
      url: '/agentMaintainUnitEntity/details',
      method: 'post',
      params: data
    })
  },
  // 代维单位编辑
  agentListEdit (data) {
    return request({
      url: '/agentMaintainUnitEntity/edit',
      method: 'post',
      params: data
    })
  },
  // 代维单位删除
  agentListDel (data) {
    return request({
      url: '/agentMaintainUnitEntity/del',
      method: 'post',
      params: data
    })
  },
  // 代维单位下拉框
  agentOption () {
    return request({
      url: '/agentMaintainUnitEntity/agentOption',
      type: 'get'
      // params: data
    })
  },
}
