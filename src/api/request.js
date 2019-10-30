import axios from 'axios';
// import apiConfig from './apiConfig';
// import router from '../router/index';
import qs from 'qs'
import store from '../store/index'
import router from '../router/index';
import * as types from '../store/mutations';
import wx from 'weixin-js-sdk' //微信sdk依赖
// 是否在微信环境下
const isWX = store.state.login.isMicromessenger;
axios.defaults.baseURL = "https://api.omnrj.com";
axios.defaults.timeout = 5000;
axios.defaults.headers["smstoken"] = "";
axios.defaults.headers.jsonType = "jsonType";
// axios.defaults.headers.jsonType = "jsonType";
// console.log(wx)
// wx.config({})
require('es6-promise').polyfill() //axios是基于Promise 兼容低版本浏览器

function fetch(url, method = 'get', data = {}) {
  const instance = axios.create({});
  // http request 拦截器
  instance.interceptors.request.use((config) => {
      const res = config;
      const data = qs.parse(res.data);
      // 添加短信MD5
      if (data.md5Str) {
        res.headers["cipher"] = data.md5Str;
      }
      // 设置登录状态
      if (store.state.login.authorization) {
        res.headers["authorization"] = store.state.login.authorization;
      }
      return res;
    },
    (err) => {
      const error = err;
      return Promise.reject(error);
    },
  );
  // http response 拦截器
  instance.interceptors.response.use((response) => {
      const res = response;
      if (res.headers.smstoken) {
        axios.defaults.headers["smstoken"] = res.headers.smstoken;
      }
      if (res.headers.authorization) {
        store.commit(types.SET_AUTHORIZATION, res.headers.authorization);
      }
      if (res.data.data && res.data.data.code && (res.data.data.code == 100011 || res.data.data.code == 100023 || res.data.data.code == 100021)) {
        if (store.state.login.isMicromessenger) {
          // WX
        } else {
          // 非WX
          router.replace({
            path: '/login',
            // query: { redirect: router.currentRoute.fullPath }
          });
        }
      }
      return res;
    },
    (err) => {
      const error = err;
      if (error.response) {

      }
      return Promise.reject(error); // 返回接口返回的错误信息
    },
  );

  switch (method) {
    case 'get':
      return instance.get(url, {
        params: data
      });
    case 'post':
      //   axios.defaults.headers = {
      //     'Content-type': 'application/x-www-form-urlencoded;charset=UTF-8'
      //   }
      // qs.stringify()将对象 序列化成URL的形式，以&进行拼接
      // qs.parse()将URL解析成对象的形式
      return instance.post(url, qs.stringify(data));
    case 'put':
      return instance.put(url, data);
    case 'delete':
      return instance.delete(url, data);
    default:
      return instance.get(url, {
        params: data
      });
  }
}


function request(url, method = 'get', data = {}) {
  return new Promise((resolve, reject) => {
    const resData = fetch(url, method, data)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
    return resData;
  });
}
export default request;
