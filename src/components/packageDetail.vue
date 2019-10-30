<template>
  <div :class="{'has-header':!isMicromessenger,'has-footer':true}">
    <div class="packageDetail">
      <topHeader :title="'商品详情'"></topHeader>
      <img class="detail_img" v-lazy="detailData.bannerImg" />
      <!-- 详情信息 -->
      <div class="info">
        <div class="info_left">
          <h3 v-text="detailData.name"></h3>
          <p v-text="detailData.intro"></p>
        </div>
        <div class="info_right">
          <h3>
            折后价
            <span v-text="'￥'+mealInfo.price"></span>
          </h3>
          <p v-text="'￥'+mealInfo.originalPrice"></p>
        </div>
      </div>
      <!-- 套餐选择 -->
      <!-- @click="paymentShow=true" -->
      <div class="sel_project" @click="selPackageShow=true">
        <div>
          选择
          <span style="padding-left:0.22rem;color:#333" v-text="mealInfo.title"></span>
        </div>
        <div class="sel_right">
          <span style="padding-right:0.28rem">请选择套餐</span>
          <Icon class="right_icon" name="arrow" />
        </div>
      </div>
      <!-- 套餐内容 -->
      <div class="meal_content">
        <div class="title">套餐内容</div>
        <div class="meal_data html_content">
          <div v-html="mealInfo.intro"></div>
        </div>
      </div>
      <!-- 商品详情 -->
      <div class="class_title">
        <div class="line line_left"></div>
        <h3>商品详情</h3>
        <div class="line line_right"></div>
      </div>
      <div class="html_content">
        <div v-html="detailData.content"></div>
      </div>
      <!-- 底部 -->
      <div :class="{'goods_action_box':true,'fix-iphonex-buttom':isIphoneX}">
        <div class="icon_box" @click="selCitysShow=true">
          <img src="../assets/icon_Point.png" />
          <p v-text="wxChangeLocation.selCity"></p>
        </div>
        <!-- @click="toCallPhone" -->
        <!-- window.location.href = 'tel://110'; -->
        <div class="icon_box">
          <img src="../assets/icon_Customer_service.png" />
          <p>客服</p>
        </div>
        <Button @click="selPackageShow=true" class="right_btn">立即购买</Button>
      </div>
    </div>
    <!-- 服务城市选择 -->
    <Popup @close="selCitysShow=false" position="bottom" v-model="selCitysShow">
      <Area
        :value="areaValue"
        @cancel="selCitysShow=false"
        @confirm="cityConfirm"
        columns-num="3"
        title="请选择服务地址"
        @change="cityChange"
        :area-list="areaList"
      />
    </Popup>
    <!-- 选择礼包 -->
    <Popup class="pay_pop" @close="selPackageShow=false" position="bottom" v-model="selPackageShow">
      <div class="pop_content">
        <div class="pop_header">
          <img class="header_img" src="../assets/def_pictuer.png" />
          <div class="header_title">
            <h3 v-text="mealInfo.title"></h3>
            <p>
              <span v-text="mealInfo.price+'元/'+mealInfo.unitStr"></span>
            </p>
          </div>
        </div>
        <div class="pop_type">
          <h3>选择商品</h3>
          <ul class="type_list">
            <li
              :class="typeIndex==index?'active':''"
              v-for="(item,index) in detailData.productPackages"
              :key="index"
              @click="changeMeal(item,index)"
              v-text="item.title"
            ></li>
          </ul>
        </div>
      </div>
      <div :class="{'pop_btn_box':true,'fix-iphonex-buttom':isIphoneX}">
        <Button @click="toSubmitOrder" class="pay_btn">立即购买</Button>
      </div>
    </Popup>
  </div>
</template>
<script>
import { Icon, Button, Toast, Lazyload, Popup, Area } from "vant";
import topHeader from "./component/header";
import { mapState, mapActions, mapMutations } from "vuex";
import { _getUnit, _delCity } from "../api/common";
import { _getPackagesDetail, _getAppointcitys } from "../service/detail";
export default {
  name: "PackageDetail",
  data() {
    return {
      selCitysShow: false,
      selPackageShow: false,
      typeIndex: 0,
      areaList: {},
      areaValue: "",
      detailData: {
        bannerImg: "",
        content: "", // 商品详情
        id: "",
        intro: "", // 套餐内容
        name: "",
        price: 0,
        productImages: [{ imgUrl: "" }],
        productPackages: [], // 套餐
        productTypeId: "",
        productTypeTitle: "",
        servicesNum: 0,
        smallImg: ""
      },
      mealInfo: {
        id: "",
        intro: "",
        originalPrice: 0,
        price: 0,
        productId: "",
        serviceNum: 0,
        title: "",
        unitStr: ""
      }
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
    console.log("packageDetail");
    this.getData(this.detailId);
    this.getCitysData();
  },
  methods: {
    ...mapMutations(["packageSelLocation", "saveDetailInfo"]),
    getData(id) {
      _getPackagesDetail(id).then(res => {
        if (res.data.success) {
          let baseUrl = res.data.data.baseUrl;
          this.detailData = res.data.data.product;
          this.detailData.bannerImg = baseUrl + this.detailData.bannerImg;
          this.detailData.smallImg = baseUrl + this.detailData.smallImg;
          this.detailData.productPackages.forEach(val => {
            val.unitStr = _getUnit(val.priceUnit);
          });
          if (this.detailData.productPackages) {
            this.mealInfo = this.detailData.productPackages[0];
          }
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
    cityConfirm(e) {
      /*
        目前只改变城市 经纬度待解决
      */
      let val = e;
      let params = {
        province: val[0].name,
        city: _delCity(val[1].name),
        area: val[2].name,
        latitude: "",
        longitude: ""
      };
      this.packageSelLocation(params);
      this.selCitysShow = false;
    },
    cityChange(e) {},
    changeMeal(item, index) {
      this.typeIndex = index;
      this.mealInfo = this.detailData.productPackages[index];
    },
    toSubmitOrder() {
      // 是否登录 待处理
      let sendOrderInfo = {
        id: this.detailData.id,
        name: this.detailData.name,
        productTypeTitle: this.detailData.productTypeTitle,
        smallImg: this.detailData.smallImg,
        productTypeId: this.detailData.productTypeId,
        message: "",
        productPackage: this.mealInfo,
        intro: this.detailData.intro
      };
      // 储存详情数据
      this.mealInfo = this.detailData.productPackages[this.typeIndex];
      this.saveDetailInfo(sendOrderInfo);
      this.selPackageShow = false;
      this.pushTo("SubmitOrder");
    }
  }
};
</script>
<style lang="less" scoped>
.packageDetail {
  padding-bottom: 0.96rem;
  .detail_img {
    width: 100%;
    display: block;
  }
  .detail_info {
    padding: 0.3rem;
    background: #fff;
  }
  .info {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    padding: 0.3rem;
    background: #fff;
    margin-bottom: 0.2rem;

    h3 {
      font-size: 0.36rem;
    }

    p {
      color: #bababa;
      line-height: 2;
    }

    .info_left {
      text-align: left;
    }

    .info_right {
      text-align: right;

      h3 {
        font-size: 0.32rem;
        span {
          color: #eb5d2a;
        }
      }
      p {
        text-decoration: line-through;
      }
    }
  }
  .sel_project {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    color: #666;
    font-size: 0.28rem;
    background: #fff;
    margin-bottom: 0.2rem;
    padding: 0.3rem;
    .sel_right {
      display: flex;
      align-items: center;
      .right_icon {
        margin-top: 0.02rem;
      }
    }
  }
  .meal_content {
    margin-bottom: 0.2rem;
    .title {
      font-size: 0.32rem;
      line-height: 44px;
      border-bottom: 1px solid #dcdcdc;
      background: #fff;
      padding-left: 0.3rem;
    }

    .meal_data {
      padding: 0.3rem;
      font-size: 0.28rem;
      background: #fff;
      img {
        max-width: 100%;
      }
    }
  }
  .class_title {
    display: flex;
    justify-content: center;
    align-items: center;
    background: #fff;
    padding: 0.36rem 0;
    // margin-bottom: 0.2rem;
    h3 {
      font-size: 0.3rem;
    }
    .line {
      margin: 0 0.19rem;
      width: 6%;
      height: 0.02rem;
      background: #bababa;
    }
  }

  .goods_action_box {
    position: fixed;
    bottom: 0;
    left: 0;
    display: flex;
    flex-direction: row;
    text-align: center;
    background: #fff;
    border-top: 1px solid #dcdcdc;
    box-sizing: border-box;
    width: 100%;

    .icon_box {
      width: 20%;
      //   padding: 0.14rem 0;
      img {
        width: 0.38rem;
        display: block;
        margin: 0.14rem auto 0.04rem auto;
      }

      p {
        font-size: 0.24rem;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }

    .icon_box:first-child {
      border-right: 0.01rem solid #dcdcdc;
    }

    .right_btn {
      background: #eb5d2a;
      height: 0.96rem;
      line-height: 0.96rem;
      flex: 1;
      color: #fff;
      font-size: 0.32rem;
    }
  }
}
.pay_pop {
  overflow-y: visible;
  z-index: 20;
  .pop_btn_box {
    border-top: 0.01rem solid #dcdcdc;
    text-align: center;
    padding: 0.3rem 0;

    .pay_btn {
      width: 70%;
      background: #eb5d2a;
      color: #fff;
      border-radius: 0.4rem;
    }
  }

  .pop_content {
    padding-left: 0.3rem;
  }

  .pop_header {
    display: flex;
    flex-flow: row nowrap;
    border-bottom: 0.01rem solid #dcdcdc;
    height: 1.5rem;

    img {
      width: 1.6rem;
      height: 1.6rem;
      border-radius: 0.1rem;
      transform: translateY(-0.4rem);
    }

    .header_title {
      padding-left: 0.22rem;

      h3 {
        font-size: 0.32rem;
        line-height: 1;
        padding-top: 0.35rem;
      }

      p {
        font-size: 0.28rem;
        color: #eb5d2a;
        line-height: 1;
        padding-top: 0.29rem;
        // span {
        //    font-size: 15px;
        // }
      }
    }
  }

  .pop_type {
    padding: 0.3rem 0;
    // border-bottom: 1px solid @border-color;

    h3 {
      font-size: 0.28rem;
      line-height: 1;
      padding-bottom: 0.34rem;
    }

    .type_list {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;

      li {
        border-radius: 30px;
        font-size: 0.28rem;
        background: #f5f5f5;
        color: #333;
        line-height: 0.6rem;
        padding: 0 10px;
        margin: 0 12px 12px 0;
        box-sizing: border-box;
        border: 0.01rem solid #f5f5f5;
      }

      .active {
        box-sizing: border-box;
        border: 0.01rem solid #eb5d2a;
        color: #eb5d2a;
        background: #fbdfd4;
      }
    }
  }
  //   .pop_count {
  //     display: flex;
  //     flex-flow: row nowrap;
  //     justify-content: space-between;
  //     padding: 15px 12px 15px 0;

  //     p {
  //       font-size: 12px;
  //       line-height: 30px;
  //     }
  //   }
}
</style>
