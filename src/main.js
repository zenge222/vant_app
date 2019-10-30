// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/index'
import * as types from './store/mutations';
import {
  _getCode2,
  _getWxToken,
  _getWxConfig
} from './service/login'
import wx from 'weixin-js-sdk' //微信sdk依赖
Vue.config.productionTip = false;

// availWidth 属性声明了显示浏览器的屏幕的可用宽度
if (/iphone/gi.test(navigator.userAgent) && (screen.availHeight == 812 && screen.availWidth == 375)) {
  store.commit(types.SETIPHONEX, false);
}
// console.log(device_type);
// var md = new MobileDetect(device_type); //初始化mobile-detect
// console.log(md)
let ua = navigator.userAgent.toLowerCase();
// 是否在微信环境
if (ua.match(/MicroMessenger/i) == "micromessenger") store.commit(types.SET_MICROMESSENGER, true);

let codeParams = {
  appid: store.state.login.appId,
  redirect_uri: encodeURI('http://127.0.0.1:8080/'),
  response_type: 'code',
  scope: 'snsapi_userinfo',
  state: 'STATE#wechat_redirect'
}
_getCode2(codeParams).then(res => {
  let a = res.config.url + '?' + res.config.data;
  console.log(a)
  window.href = a;
})

// _getWxToken().then(res => {
//   store.commit(types.SET_TOKEN, res.data.jsapi_ticket);
//   let params = {
//     url: encodeURI('http://127.0.0.1:8080/'),
//     jsapi_ticket: store.state.login.wxToken
//   }
//   _getWxConfig(params).then(res => {
//     console.log(res.data)
//     let resData = res.data;
//     wx.config({
//       debug: true,
//       appId: resData.appId, // 必填，公众号的唯一标识
//       timestamp: resData.timestamp, // 必填，生成签名的时间戳
//       nonceStr: resData.nonceStr, // 必填，生成签名的随机串
//       signature: resData.signature, // 必填，签名，见附录1
//       jsApiList: [
//         'previewImage',
//         'hideAllNonBaseMenuItem',
//         'showMenuItems',
//         'onMenuShareTimeline',
//         'onMenuShareAppMessage',
//         'chooseWXPay'
//       ] // 必填，需要使用的 JS 接口列表，所有JS接口列表见附录2
//     })
//   })
// })

// 图片懒加载
import {
  Lazyload,
  Notify,
  Toast
} from 'vant';
Vue.use(Lazyload).use(Notify).use(Toast);
Vue.prototype.$Notify = Notify;
Vue.prototype.$Toast = Toast;
const imgBastPath = 'https://file.omnrj.com/static/images/';
Vue.prototype.imgBastPath = imgBastPath;
Vue.prototype.$store = store;
Vue.prototype.pushTo = function (path, parameter = {}) {
  router.push({
    name: path,
    params: parameter
  });
};
Vue.prototype.replaceTo = function (path, parameter = {}) {
  router.replace({
    name: path,
    params: parameter
  });
};

router.beforeEach((to, from, next) => {
  // 设置title
  if (to.meta.title) {
    window.document.title = to.meta.title;
  }
  // 产品列表 
  if (to.name === 'ProductList') {
    if (from.name === "PackageDetail" || from.name === "ClassifyDetail") {
      to.meta.isUseCache = true;
    } else {
      to.meta.isUseCache = false;
    }
  };
  // 产品列表 
  if (to.name === 'Classify') {
    if (from.name === "PackageDetail" || from.name === "ClassifyDetail") {
      to.meta.isUseCache = true;
    } else {
      to.meta.isUseCache = false;
    }
  };
  next();
})

// 跳转后返回顶部
router.afterEach((to, from, next) => {
  window.scrollTo(0, 0);
});
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>'
})
