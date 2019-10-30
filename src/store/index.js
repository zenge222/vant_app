import Vue from 'vue';
import Vuex from 'vuex';
import login from '../store/modules/login'
import detail from '../store/modules/detail'
import addressHistory from '../store/modules/addressHistory'

import createPersistedState from 'vuex-persistedstate'
Vue.use(Vuex)

// 引入vuex-persistedstate，将vuex的数据持久化到本地 处理页面刷新 数据丢失
const store = new Vuex.Store({
  modules: {
    login,
    detail,
    addressHistory
  },
  plugins: [
    createPersistedState() // 引入
  ]
})
export default store;
