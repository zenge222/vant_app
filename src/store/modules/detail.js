import request from '../../api/request';
import apiConfig from '../../api/apiConfig';
import * as types from '../mutations';

const detail = {
  state: {
    detailId: '',
    // 产品类型   3 双拼 2包月 1体验包  
    productType: 0,
    detailInfo: {
      id: '',
      name: '',
      productTypeTitle: '',
      smallImg: '',
      productTypeId: '',
      message: "",
      productPackage: null,
      intro: '',
    },
    appointmentIds: {
      productId: '',
      id: ''
    }
    // 
  },
  mutations: {
    // 储存详情id
    saveDetailId(state, data) {
      state.detailId = data;
    },
    // 储存详情数据
    saveDetailInfo(state, data) {
      state.detailInfo = data;
    },
    // 储存预约id
    saveAppointmentIds(state, data) {
      state.appointmentIds = data;
    },
  },
  actions: {

  }
}

export default detail;
