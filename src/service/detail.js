import api from '../api/apiConfig'
import request from '../api/request'

// 获取礼包详情 
export function _getPackagesDetail(id) {
  return request(api.getPackagesDetail + `/${id}`, 'get');
}

// 获取详情城市列表
export function _getAppointcitys() {
  return request(api.getAppointcitys, 'get');
}
