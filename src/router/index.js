import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/home'
import Classify from '@/components/classify'
import MyAppointment from '@/components/myAppointment'
import Appointment from '@/components/appointment'
import Login from '@/components/login'
import Register from '@/components/register'
import ForgetPassword from '@/components/forgetPassword'
import My from '@/components/my'
import PackageDetail from '@/components/packageDetail'
import ClassifyDetail from '@/components/classifyDetail'
import ProductList from '@/components/productList'
import SubmitOrder from '@/components/submitOrder'
import SetUp from '@/components/setUp'
import SelectAddress from '@/components/selectAddress'
import CityList from '@/components/cityList'
import MyOrder from '@/components/myOrder'
import MyEvaluation from '@/components/myEvaluation'

Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      name: 'Home',
      component: Home,
      meta: {
        title: '嘉美',
        requireAuth: false,
        keepAlive: false
      }
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta: {
        title: '登录',
        requireAuth: false,
        keepAlive: false
      }
    },
    {
      path: '/register',
      name: 'Register',
      component: Register,
      meta: {
        title: '注册',
        requireAuth: false,
        keepAlive: false
      }
    },
    {
      path: '/forgetPassword',
      name: 'ForgetPassword',
      component: ForgetPassword,
      meta: {
        title: '忘记密码',
        requireAuth: false,
        keepAlive: false
      }
    },
    {
      path: '/classify',
      name: 'Classify',
      component: Classify,
      meta: {
        title: '分类',
        requireAuth: false,
        keepAlive: true,
        isUseCache: false,
      }
    },
    {
      path: '/myAppointment',
      name: 'MyAppointment',
      component: MyAppointment,
      meta: {
        title: '预约',
        requireAuth: false,
        keepAlive: false
      }
    },
    {
      path: '/appointment',
      name: 'Appointment',
      component: Appointment,
      meta: {
        title: '预约',
        requireAuth: false,
        keepAlive: false,
        isUseCache: false,
      }
    },
    {
      path: '/my',
      name: 'My',
      component: My,
      meta: {
        title: '我的',
        requireAuth: false,
        keepAlive: false
      }
    },
    {
      path: '/setUp',
      name: 'SetUp',
      component: SetUp,
      meta: {
        title: '个人信息',
        requireAuth: false,
        keepAlive: false
      }
    },

    {
      path: '/classifyDetail',
      name: 'ClassifyDetail',
      component: ClassifyDetail,
      meta: {
        title: '商品详情',
        requireAuth: false,
        keepAlive: false
      }
    },
    {
      path: '/productList',
      name: 'ProductList',
      component: ProductList,
      meta: {
        title: '产品列表',
        requireAuth: false,
        keepAlive: true,
        isUseCache: false,
      }
    },
    {
      path: '/packageDetail',
      name: 'PackageDetail',
      component: PackageDetail,
      meta: {
        title: '商品详情',
        requireAuth: false,
        keepAlive: false,
      }
    },
    {
      path: '/submitOrder',
      name: 'SubmitOrder',
      component: SubmitOrder,
      meta: {
        title: '提交订单',
        requireAuth: false,
        keepAlive: false,
      }
    },
    {
      path: '/selectAddress',
      name: 'SelectAddress',
      component: SelectAddress,
      meta: {
        title: '选择服务地址',
        requireAuth: false,
        keepAlive: false,
      }
    },
    {
      path: '/cityList',
      name: 'CityList',
      component: CityList,
      meta: {
        title: '选择城市',
        requireAuth: false,
        keepAlive: false,
      }
    },
    {
      path: '/myOrder',
      name: 'MyOrder',
      component: MyOrder,
      meta: {
        title: '我的订单',
        requireAuth: false,
        keepAlive: false,
      }
    },
    {
      path: '/myEvaluation',
      name: 'MyEvaluation',
      component: MyEvaluation,
      meta: {
        title: '我的评价',
        requireAuth: false,
        keepAlive: false,
      }
    },

  ],
  mode: 'history',
  history: true,
})
