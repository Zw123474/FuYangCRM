import request from '../../src/utils/request'

export default {
  // 代维单位列表
  areaInfOption () {
    return request({
      url: '/areaBelongsEntity/areaInfOption',
      type: 'get'
      // params: data
    })
  },
}
