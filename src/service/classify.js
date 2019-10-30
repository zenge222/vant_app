import api from '../api/apiConfig'
import request from '../api/request'

// 分类列表
export function _getclassifyList(data) {
  return request(api.getclassifyList, 'get', data);
}

// 分类列表详情
export function _getclassifyDetail(id) {
  return request(api.getclassifyDetail + `/${id}`, 'get');
}

// 礼包城市列表
export function _getAppointcitys() {
  return request(api.getAppointcitys, 'get');
}

// 添加分类信息
export function _addAppointTry(data) {
  return request(api.addAppointTry, 'post', data);
}

// 我的预约列表
export function _getAppointmentList(data) {
  return request(api.getAppointmentList, 'post', data);
}


