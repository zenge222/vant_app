<template>
  <div :class="{'home':true,'wx-header':true,'has-two-header':!isMicromessenger,'has-footer':true}">
    <!-- 头部 -->
    <topHeader :hasBack="false" :title="'嘉美'"></topHeader>
    <loactionHeader></loactionHeader>
    <!-- 轮播 -->
    <div>
      <Swipe
        autoplay="true"
        @change="bannerChange"
        class="swipe_box"
        :autoplay="2000"
        indicator-color="transparent"
      >
        <Swipe-item v-for="(item, index) in movies" :key="index">
          <img width="100%" v-lazy="item.imgUrl" />
        </Swipe-item>
        <div slot="indicator"></div>
      </Swipe>
      <div class="spot_box" v-if="movies.length>=2">
        <div :class="bannerIndex==index?'active':''" v-for="(item,index) in movies" :key="index"></div>
      </div>
    </div>
    <!-- 商品栏 -->
    <div class="pro_tab_container">
      <div
        class="pro_item"
        v-for="(item,index) in productList"
        :key="index"
        @click="toProductList(item)"
      >
        <img class="bg_pic" :src="item.imgUrl" mode="widthFix" />
        <div class="pro_info">
          <h3>{{item.title}}</h3>
          <p>{{item.intr}}</p>
        </div>
      </div>
    </div>
    <!-- 商品列表 -->
    <div class="title_content">
      <div class="line"></div>
      <h3>热销单品</h3>
      <div class="line"></div>
    </div>

    <div class="home_list">
      <cardItem :cardParams="mainProduct" v-if="mainProduct.productTypeId"></cardItem>
    </div>

    <div class="home_list" v-if="recommendProduct.productTypeId">
      <cardItem :cardParams="recommendProduct"></cardItem>
    </div>

    <div class="advert">
      <img src="https://file.omnrj.com/static/images/def_advertisement.png" mode="widthFix" alt />
    </div>

    <div class="home_list" style="padding:20px;" v-if="activityProduct.productTypeId">
      <cardItem :cardParams="activityProduct"></cardItem>
    </div>

    <div class="cut_bg"></div>

    <div class="home_list home_bottom">
      <div class="list_title">
        <div class="title_line"></div>我们是嘉家
      </div>
      <button v-show="false" open-type="getUserInfo" bindgetuserinfo="getUserInfo">授权</button>
    </div>
    <img mode="widthFix" style="width:100%;" :src="img1" />
    <div class="cut_bg"></div>
    <Footer :tabIndex="0"></Footer>
  </div>
</template>

<script>
import { Button, Toast, Swipe, SwipeItem, Lazyload } from "vant";
import { mapState, mapActions, mapMutations } from "vuex";
import { _getHomeList } from "../service/home.js";
import { _getUnit } from "../api/common";
import topHeader from "./component/header";
import loactionHeader from "./component/loactionHeader";
import cardItem from "./component/cardItem";
import Footer from "./component/footer";
export default {
  name: "Home",
  data() {
    return {
      img1: this.imgBastPath + "def_Brand_promotion.png",
      movies: [
        "https://file.omnrj.com/upload/20190621140248907412.jpg",
        "https://file.omnrj.com/upload/20190702171645326346.jpg"
      ],
      bannerIndex: 0,
      // 商品栏
      productList: [
        {
          type: 2,
          title: "店长力荐",
          intr: "低至66",
          imgUrl: "https://file.omnrj.com/static/images/btn_recommend.png"
        },
        {
          type: 3,
          title: "随心选择",
          intr: "超值服务",
          imgUrl: "https://file.omnrj.com/static/images/btn_select.png"
        },
        {
          type: 1,
          title: "明星爆款",
          intr: "优惠特价",
          imgUrl: "https://file.omnrj.com/static/images/btn_Blasting.png"
        }
      ],

      // 主推
      mainProduct: {
        name: "",
        price: 0,
        smallImg: "",
        productTypeId: null,
        productTypeTitle: "",
        smallImg: "",
        priceUnitStr: "",
        type: 0
      },
      // 推荐
      recommendProduct: {
        name: "",
        price: 0,
        smallImg: "",
        productTypeId: null,
        productTypeTitle: "",
        smallImg: "",
        priceUnitStr: "",
        type: 0
      },
      // 活动
      activityProduct: {
        name: "",
        price: 0,
        smallImg: "",
        productTypeId: null,
        productTypeTitle: "",
        smallImg: "",
        priceUnitStr: "",
        type: 0
      }
    };
  },
  watch: {
    wxChangeLocation: {
      handler(newName, oldName) {
        this.fullName = newName + " " + this.lastName;
        this.init();
      },
      // 代表在wacth里声明了wxChangeLocation 这个方法之后立即先去执行handler方法
      immediate: true,
      deep: true
    }
  },
  components: {
    Button,
    Toast,
    Swipe,
    SwipeItem,
    Lazyload,
    topHeader,
    loactionHeader,
    cardItem,
    Footer
  },
  computed: {
    ...mapState({
      wxChangeLocation: state => state.login.wxChangeLocation,
      isMicromessenger: state => state.login.isMicromessenger
    })
  },
  mounted() {},
  methods: {
    init() {
      let _this = this;
      let params = {
        streate: this.wxChangeLocation.street,
        province: this.wxChangeLocation.orderProvince,
        city: this.wxChangeLocation.orderCity,
        area: this.wxChangeLocation.orderArea,
        longitude: this.wxChangeLocation.orderLatitude,
        latitude: this.wxChangeLocation.orderLatitude
        // loading: true
      };
      _getHomeList(params)
        .then(res => {
          if (res.data.success) {
            let bastPath = res.data.data.baseUrl;
            let banners = res.data.data.bannersList;
            banners.forEach(val => {
              val.imgUrl = bastPath + val.imgUrl;
            });
            this.movies = banners;
            if (res.data.data.mainProduct) {
              let mainData = res.data.data.mainProduct;
              mainData.smallImg = bastPath + res.data.data.mainProduct.smallImg;
              if (mainData.productPackages.length != 0) {
                mainData.productPackages[0].unitStr = _getUnit(
                  mainData.productPackages[0].priceUnit
                );
              }
              _this.mainProduct = mainData;
            }

            if (res.data.data.recommendProduct) {
              let recommendData = res.data.data.recommendProduct;
              recommendData.smallImg =
                bastPath + res.data.data.recommendProduct.smallImg;
              if (recommendData.productPackages.length != 0) {
                recommendData.productPackages[0].unitStr = _getUnit(
                  recommendData.productPackages[0].priceUnit
                );
              }
              this.recommendProduct = recommendData;
            }

            if (res.data.data.activityProduct) {
              let activityData = res.data.data.activityProduct;
              activityData.smallImg =
                bastPath + res.data.data.activityProduct.smallImg;
              if (activityData.productPackages.length != 0) {
                activityData.productPackages[0].unitStr = _getUnit(
                  activityData.productPackages[0].priceUnit
                );
              }
              this.activityProduct = activityData;
            }
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    bannerChange(e) {
      this.bannerIndex = e;
    },
    toProductList(item) {
      let params = {
        type: item.type
      };
      this.pushTo("ProductList", params);
    }
  }
};
</script>
<style lang="less" scoped>
.home {
  background: #fff;
}
.swipe_box {
  height: 3.5rem;
  overflow: hidden;
}
.spot_box {
  display: flex;
  justify-content: center;
  margin-top: 10px;
  > div {
    border-radius: 10px;
    background: #bfbfbf;
    width: 0.12rem;
    height: 0.12rem;
    margin: 0 0.12rem;
    transition: width linear 0.3s;
  }

  .active {
    background: #eb5d2a;
    width: 0.48rem;
  }
}
.pro_tab_container {
  display: flex;
  padding: 0.3rem 0.3rem 0 0.3rem;

  .pro_item {
    width: 33%;
    position: relative;

    .bg_pic {
      width: 100%;
      display: block;
    }

    .pro_info {
      width: 100%;
      position: absolute;
      bottom: 0.28rem;
      left: 50%;
      transform: translate(-50%, 0);
      text-align: center;
      color: #fff;

      h3 {
        font-size: 0.28rem;
        line-height: 1.5;
      }

      p {
        font-size: 0.24rem;
      }
    }
  }

  .pro_item:nth-child(1) {
    margin-right: 6px;
  }

  .pro_item:nth-child(2) {
    margin: 0 3px;
  }

  .pro_item:nth-child(3) {
    margin-left: 6px;
  }
}
.title_content {
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 10px;

  h3 {
    font-size: 0.36rem;
    padding: 0 10px;
    color: #282828;
  }

  .line {
    width: 0.55rem;
    height: 1px;
    background: #333;
    border-radius: 1px;
  }
}
.advert {
  padding: 0.3rem 0.3rem 0 0.3rem;

  img {
    width: 100%;
  }
}

.home_list {
  padding: 0.3rem 0.3rem 0 0.3rem;
  .list_title {
    font-size: 0.32rem;
    position: relative;
    padding-left: 0.26rem;

    .title_line {
      width: 0.1rem;
      height: 0.3rem;
      background: #eb5d2a;
      position: absolute;
      left: 0;
      top: 50%;
      transform: translate(0, -50%);
      border-radius: 10px;
    }

    span {
      font-size: 12px;
      color: #666666;
      padding-left: 12px;
    }
  }
}
.home_bottom {
  padding: 20px;
}
.cut_bg {
  height: 10px;
  background: #f5f5f5;
  width: 100%;
}
</style>
