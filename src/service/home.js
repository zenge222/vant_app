import api from '../api/apiConfig'
import request from '../api/request'

// 首页商品展示
export function _getHomeList(data) {
  return request(api.getHomeList, 'post', data);
}

// 获取home-tab产品列表
export function _getHomeProductList(data) {
  return request(api.getHomeProductList, 'post', data);
}
