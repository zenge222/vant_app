import api from '../api/apiConfig'
import request from '../api/request'

// 非WX 手机登录
export function _phoneLogin(data) {
  return request(api.phoneLogin, 'post', data);
}

// 获取验证码
export function _getCode(data) {
  return request(api.getCode, 'post', data);
}

// 非WX 手机注册
export function _phoneRegister(data) {
  return request(api.phoneRegister, 'post', data);
}

// 非WX 忘记密码
export function _forgetPassword(data) {
  return request(api.forgetPassword, 'post', data);
}

// 获取wx code
export function _getCode2(data) {
  return request(api.getCode2, 'post', data);
}

// 获取Token
export function _getWxToken() {
  return request(api.getWxToken, 'get');
}

// 获取Config
export function _getWxConfig(data) {
  return request(api.getWxConfig, 'post', data);
}

// 用户订单地址列表
export function _getUserAddress(data) {
  return request(api.getUserAddress, 'post', data);
}
