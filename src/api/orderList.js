import request from '../../src/utils/request'

export default {
  // 工单列表
  orderList (data) {
    return request({
      url: '/maintenanceWorkOrderEntity/pageList',
      type: 'get',
      params: data
    })
  },
  // 工单列表新增
  orderListSave (data) {
    return request({
      url: '/maintenanceWorkOrderEntity/save',
      method: 'post',
      params: data,
      qs: false
    })
  },
  // 工单列表详情
  orderListDetails (data) {
    return request({
      url: '/maintenanceWorkOrderEntity/details',
      type: 'get',
      params: data
    })
  },
  // 工单列表编辑
  orderListEdit (data) {
    return request({
      url: '/maintenanceWorkOrderEntity/edit',
      method: 'post',
      params: data,
      qs: false
    })
  },
  // 工单列表删除
  orderListDel (data) {
    return request({
      url: '/agentMaintainUnitEntity/del',
      method: 'post',
      params: data
    })
  },
  // 耗材名称下拉框
  consumablesOption (data) {
    return request({
      url: '/consumablesEntity/consumablesOption',
      type: 'get',
      params: data
    })
  },
  // 运维人员补充字段
  replenish (data) {
    return request({
      url: '/maintenanceWorkOrderEntity/replenish',
      method: 'post',
      params: data,
      qs: false
    })
  },
  // 运维人员接单
  receiveOrder (data) {
    return request({
      url: '/maintenanceWorkOrderEntity/receiveOrder',
      method: 'post',
      params: data
    })
  },
  // 运维人员处理完成
  completePending (data) {
    return request({
      url: '/maintenanceWorkOrderEntity/completePending',
      method: 'post',
      params: data
    })
  },
  // 修改重新派发
  redistribute (data) {
    return request({
      url: '/maintenanceWorkOrderEntity/redistribute',
      method: 'post',
      params: data
    })
  },
  // 部门主管撤销退回工单
  revoke (data) {
    return request({
      url: '/maintenanceWorkOrderEntity/revoke',
      method: 'post',
      params: data
    })
  },
  // 总调度驳回
  turnDown (data) {
    return request({
      url: '/maintenanceWorkOrderEntity/turnDown',
      method: 'post',
      params: data
    })
  },
  // 总调度完结
  finish (data) {
    return request({
      url: '/maintenanceWorkOrderEntity/finish',
      method: 'post',
      params: data
    })
  },
  // 运维人员撤销完成
  revokeCompletePending (data) {
    return request({
      url: '/maintenanceWorkOrderEntity/revokeCompletePending',
      method: 'post',
      params: data
    })
  },
  // 部门主管退回工单
  returnWorkOrder (data) {
    return request({
      url: '/maintenanceWorkOrderEntity/returnWorkOrder',
      method: 'post',
      params: data
    })
  },
  // 部门主管指派人员接单
  assignOrders (data) {
    return request({
      url: '/maintenanceWorkOrderEntity/assignOrders',
      method: 'post',
      params: data
    })
  },
}
