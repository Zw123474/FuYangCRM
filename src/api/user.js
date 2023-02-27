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
  // 上传文件
  uploadFile (data) {
    return request({
      url: '/verification/img',
      method: 'post',
      params: data,
      qs: false
    })
  },
  // 工作台统计
  workbench () {
    return request({
      url: '/workbench/info',
      type: 'get'
      // params: data
    })
  },
  // 工作台统计
  personalWorkload (data) {
    return request({
      url: '/workbench/personalWorkload',
      type: 'get',
      params: data
    })
  },
  // 工作台统计
  productLevelAnalyze (data) {
    return request({
      url: '/workbench/productLevelAnalyze',
      type: 'get',
      params: data
    })
  },
  // 工作台统计
  repairCategoryAnalyze (data) {
    return request({
      url: '/workbench/repairCategoryAnalyze',
      type: 'get',
      params: data
    })
  },
  // 用户信息文件导入
  userInfUpload (data) {
    return request({
      url: '/userInfoEntity/userInfUpload',
      method: 'post',
      params: data,
      qs: false
    })
  },
  // 项目安装单文件导入
  installationWorkOrderUpload (data) {
    return request({
      url: '/installationWorkOrderEntity/installationWorkOrderUpload',
      method: 'post',
      params: data,
      qs: false
    })
  },
  // 产品层级文件导入
  productInfoUpload (data) {
    return request({
      url: '/productLevelEntity/productInfoUpload',
      method: 'post',
      params: data,
      qs: false
    })
  },
  // 运维工单筛选导出
  workOrderExport (data) {
    return request({
      url: '/maintenanceWorkOrderEntity/workOrderExport',
      type: 'get',
      params: data
    })
  },
}
