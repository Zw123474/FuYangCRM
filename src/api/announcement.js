import request from '../../src/utils/request'

export default {
  // 代维单位列表
  announcementList (data) {
    return request({
      url: '/announcementEntity/pageList',
      type: 'get',
      params: data
    })
  },
  // 代维单位新增
  announcementListSave (data) {
    return request({
      url: '/announcementEntity/save',
      method: 'post',
      params: data
    })
  },
  // 代维单位详情
  announcementListDetails (data) {
    return request({
      url: '/announcementEntity/details',
      type: 'get',
      params: data
    })
  },
  // 代维单位编辑
  announcementListEdit (data) {
    return request({
      url: '/announcementEntity/edit',
      method: 'post',
      params: data
    })
  },
  // 代维单位删除
  announcementListDel (data) {
    return request({
      url: '/announcementEntity/del',
      method: 'post',
      params: data
    })
  },
}
