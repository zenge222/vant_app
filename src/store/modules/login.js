import request from '../../api/request';
import apiConfig from '../../api/apiConfig';
import * as types from '../mutations';

const login = {
  state: {
    wxToken: '',
    appId: 'wxcdb14cbb3390f529',
    // 是否在微信环境
    isMicromessenger: null,
    // 是否 iphoneX
    isIphoneX: false,
    // 登录状态
    authorization: '',
    phoneLoginInfo: {
      phoneNum: '',
      phone: '',
    },
    // 微信授权用户信息
    wxUserInfo: {
      nickName: '',
      avatarUrl: '',
      gender: null,
      province: '',
      city: '',
      country: ''
    },
    // 微信授权定位信息
    wxLocation: {
      /*
        城市列表 重新定位
        1.定位成功后用于服务地址搜索
      */
      cityName: '定位失败',
      cityLatitude: '',
      cityLongitude: '',
      /*
        选择服务地址
        1.定位成功后 用于切换首页街道
        2.定位成功后 用于map定位参数
      */
      cStreet: '定位失败',
      cLatitude: '',
      cLongitude: '',
    },
    wxChangeLocation: {
      /*
        1.主页 街道
        2.主页|礼包详情(区域请求参数)
        3.实时改变selProvince等
      */
      street: '上海',
      orderProvince: '上海', // 详情 底部city 初始上海
      orderCity: '上海',
      orderArea: '长岭区',
      orderLatitude: '31.40527',
      orderLongitude: '121.48941',
      /*
         1.用于礼包详情 区域选择
         2.选择地址的判断条件
      */
      selProvince: 's上海',
      selCity: 's上海',
      selArea: 's长岭区',
      selLatitude: '31.40527',
      selLongitude: '121.48941',
    },
  },
  mutations: {
    // 设置环境
    [types.SET_TOKEN](state, data) {
      state.wxToken = data;
      console.log(state.wxToken)
    },
    // 设置环境
    [types.SET_MICROMESSENGER](state, data) {
      state.isMicromessenger = data;
    },
    // 设置iphoneX
    [types.SETIPHONEX](state, data) {
      state.isIphoneX = data;
    },
    // 设置 authorization
    [types.SET_AUTHORIZATION](state, data) {
      state.authorization = data;
    },
    // 主页 设置详情城市
    setSelLocation(state) {
      state.wxChangeLocation.selProvince = state.wxChangeLocation.orderProvince;
      state.wxChangeLocation.selCity = state.wxChangeLocation.orderCity;
      state.wxChangeLocation.selArea = state.wxChangeLocation.orderArea;
      state.wxChangeLocation.selLatitude = state.wxChangeLocation.orderLatitude;
      state.wxChangeLocation.selLongitude = state.wxChangeLocation.selLongitude;
    },
    // 礼包详情 城市选择
    packageSelLocation(state, data) {
      state.wxChangeLocation.selProvince = data.province;
      state.wxChangeLocation.selCity = data.city;
      state.wxChangeLocation.selArea = data.area;
      state.wxChangeLocation.selLatitude = data.latitude;
      state.wxChangeLocation.selLongitude = data.longitude;
    },
    [types.CHANGE_NICKNAME](state, data) {
      state.wxUserInfo.nickName = data;
    },

  },
  actions: {
    changeNickName({
      commit
    }, params) {
      commit(types.CHANGE_NICKNAME, params);
    },
  }
}

export default login;
