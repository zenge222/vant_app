const apiConfig = {
  getHomeList: '/index',
  getclassifyList: '/productType/list',
  getAppointList: '/user/appoint/list',
  phoneLogin: '/sign/login',
  getCode: '/sms/send',
  phoneRegister: '/sign/register',
  forgetPassword: '/sign/forget',
  getPackagesDetail: '/product/detail',
  getAppointcitys: '/appointTry/serviceAllCity',
  getHomeProductList: '/product/productList',
  getclassifyDetail: '/product/detail',
  getAppointcitys: '/appointTry/serviceAllCity',
  addAppointTry: '/appointTry/add',
  getAppointmentList: '/employee/list',
  getUserAddress: '/user/address/indentAddressList',
  getWxToken: '/wxPay/getAccessToken',
  getWxConfig: '/wxPay/getConfig',
  getCode2: 'https://open.weixin.qq.com/connect/oauth2/authorize',
};
export default apiConfig;
