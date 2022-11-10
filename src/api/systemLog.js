import request from '../../src/utils/request'

export default {
  // 代维单位列表
  getLogList (data) {
    return request({
      url: '/systemPersonnelLogEntity/pageList',
      type: 'get',
      params: data
    })
  },
}
