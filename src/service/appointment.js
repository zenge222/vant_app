import api from '../api/apiConfig'
import request from '../api/request'

// 我的预约列表
export function _getAppointList(data) {
  return request(api.getAppointList, 'post', data);
}
