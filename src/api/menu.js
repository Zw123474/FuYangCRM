import request from '../../src/utils/request'

export default {
  // 获取菜单侧栏
  menuNav (data) {
    return request({
      url: '/menu/nav',
      type:'get',
      params: data
    })
  },
  menuList (data) {
    return request({
      url: '/menu/list',
      method: 'post',
      params: data
    })
  },
  menuSaveOrUpdate (data) {
    return request({
      url: '/menu/saveOrUpdate',
      method: 'post',
      params: data
    })
  },
  menuDel(data){
    return request({
      url: '/menu/del',
      method: 'post',
      params: data
    })
  }
}
