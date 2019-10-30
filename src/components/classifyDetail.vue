<template>
  <div :class="{'has-header':!isMicromessenger,'has-footer':true}">
    <div class="classify_detail">
      <div class="class_detail_parse">
        <div v-html="detailInfo.content"></div>
      </div>
      <div :class="{'sel_service':true,'fix-iphonex-buttom':isIphoneX}">
        <Button
          v-if="detailInfo.type==3||detailInfo.type==1"
          class="sel_btn"
          @click="toDetail"
        >购买体验包</Button>
        <Button
          v-if="detailInfo.type==3||detailInfo.type==2"
          class="sel_btn"
          @click="selAddr = true;"
        >我要包月</Button>
      </div>
      <!-- 地址选择 -->
      <Popup class="bottom_pop" v-model="selAddr" position="bottom" @close="selAddr=false">
        <div class="header">
          <span @click="selAddr=false">取消</span>
          <h3>选择预约地址</h3>
          <span></span>
        </div>
        <div class="container_box">
          <div class="input_box">
            <div @click="selAddrList=true" v-text="toFindInfo.areaValueName"></div>
            <Icon class="enter_icon" name="arrow" />
          </div>
        </div>
        <div :class="{'footer_box':true,'pop-iphonex-buttom':isIphoneX}">
          <Button class="sel_btn" size="normal" @click="toAppointment">去挑选小时工</Button>
        </div>
      </Popup>
      <!-- 区域选择 -->
      <Popup class="bottom_pop" v-model="selAddrList" position="bottom" @close="selAddrList=false">
        <Area
          :value="areaValue"
          @cancel="selAddrList=false"
          @confirm="onConfirm"
          columns-num="3"
          title="请选择地址"
          @change="areaChange"
          :area-list="areaList"
        />
      </Popup>
    </div>
  </div>
</template>
<script>
import { Icon, Button, Toast, Lazyload, Popup, Area } from "vant";
import topHeader from "./component/header";
import { mapState, mapActions, mapMutations } from "vuex";
import { _getUnit, _delCity } from "../api/common";
import {
  _getclassifyDetail,
  _getAppointcitys,
  _addAppointTry
} from "../service/classify";
export default {
  name: "ClassifyDetail",
  data() {
    return {
      selAddr: false,
      selAddrList: false,
      detailInfo: {
        type: 0,
        content: "",
        id: "",
        intro: "",
        name: "",
        price: "",
        productId: "",
        productTypeTitle: ""
      },
      toFindInfo: {
        areaValueName: "请选择区域", // 上海市-上海市-浦东区
        // streetName: "测试街道1",
        areaCodes: [], // 310000, 310100, 310115
        // streetId: "1",
        contactsPhone: ""
      },
      areaValue: "", //310115
      streetValue: "", // 110000
      areaList: {},
      detailImg: this.imgBastPath + "details_page_pic.png"
    };
  },
  computed: {
    ...mapState({
      isMicromessenger: state => state.login.isMicromessenger,
      wxChangeLocation: state => state.login.wxChangeLocation,
      isIphoneX: state => state.login.isIphoneX,
      detailId: state => state.detail.detailId
    })
  },
  components: {
    Icon,
    Button,
    Toast,
    Lazyload,
    Popup,
    Area,
    topHeader
  },
  mounted() {
    this.getData(this.detailId);
    this.getCitysData();
  },
  methods: {
    ...mapMutations(["saveAppointmentIds"]),
    getData(id) {
      _getclassifyDetail(id).then(res => {
        if (res.data.success) {
          this.detailInfo = res.data.data.product;
          console.log(res.data.data.product);
        }
      });
    },
    getCitysData() {
      _getAppointcitys().then(res => {
        if (res.data.success) {
          this.areaList = res.data.data.area_list;
        }
      });
    },
    toDetail() {
      this.pushTo("PackageDetail");
    },
    toAppointment() {
      let reg = /^((13|14|15|17|18)[0-9]{1}\d{8})$/;
      if (this.toFindInfo.areaCodes.length < 3) {
        this.$Notify({
          message: "请选择区域",
          type: ""
        });
        return;
      }
      let params = {
        provinceId: this.toFindInfo.areaCodes[0],
        cityId: this.toFindInfo.areaCodes[1],
        areaId: this.toFindInfo.areaCodes[2],
        areaText: this.toFindInfo.areaValueName
      };
      _addAppointTry(params).then(res => {
        /*
            res id --> 下预约的时候用
            this.detailInfo.id --> 预约
        */
        if (res.data.success) {
          // 储存预约 id
          let saveParams = {
            productId: this.detailInfo.id,
            id: res.data.data.id
          };
          this.saveAppointmentIds(saveParams);
          this.pushTo("Appointment");
        }
      });
    },
    onConfirm(e) {
      let values = e;
      let areas = `${values[0].name}-${values[1].name}-${values[2].name}`;
      this.areaValue = values[2].code;
      this.toFindInfo.areaValueName = areas;
      this.toFindInfo.areaCodes = [];
      values.forEach(val => {
        this.toFindInfo.areaCodes.push(val.code);
      });
      this.selAddrList = false;
    },
    areaChange() {}
  }
};
</script>
<style lang="less" scoped>
.classify_detail {
  padding-bottom: 0.96rem;
  .class_detail_parse {
    /deep/img {
      display: block;
      max-width: 100%;
      pointer-events: none;
    }
  }
  .sel_service {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    background: #fff;
    display: flex;
    justify-content: center;
    padding: 0 0.2rem;
    box-sizing: border-box;

    .sel_btn {
      display: block;
      margin: 0.28rem 0.2rem;
      width: 80%;
      border-radius: 0.8rem;
      line-height: 0.88rem;
      height: 0.88rem;
      font-size: 0.28rem;
      background: #eb5d2a;
      color: #fff;
    }
  }
}
.container_box {
  font-size: 0.28rem;
  height: 4rem;
  padding: 0 0.24rem;

  .input_box {
    position: relative;

    > div {
      border: 0.02rem solid #dcdcdc;
      line-height: 0.8rem;
      height: 0.8rem;
      text-align: left;
      padding: 0 0.48rem 0 0.24rem;
      display: block;
      margin: 0.2rem 0;
      border-radius: 0.16rem;
      font-size: 0.28rem;
    }

    .enter_icon {
      position: absolute;
      right: 0.2rem;
      font-size: 0.3rem;
      top: 50%;
      transform: translate(0, -50%);
      color: #9e9e9e;
    }
  }
}

.footer_box {
  .sel_btn {
    display: block;
    margin: 0.24rem auto;
    width: 60%;
    border-radius: 0.8rem;
    // background: @one-color;
    color: #fff;
  }
}
</style>
