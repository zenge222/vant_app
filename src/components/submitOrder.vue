<template>
  <div class="submit_order">
    <img class="detail_pic" mode="widthFix" :src="productDetail.bannerImg" />
  </div>
</template>
<script>
import { mapState, mapActions, mapMutations } from "vuex";
import { _getUserAddress } from "../service/login";
export default {
  name: "SubmitOrder",
  data() {
    return {
      iconPoint: this.imgBastPath + "icon_Point.png",
      payPopProduct: this.imgBastPath + "pay_pop_product.png",
      iponeIcon: this.imgBastPath + "ipone.png",
      iconCustomerService2: this.imgBastPath + "icon_customer_service.png",
      paymentShow: false,
      login_pop_show: false,
      phoneShow: false,
      selAddrList: false,
      types: ["星级家·保洁套餐一", "星级家·保洁套餐二", "星级家·保洁套餐三"],
      typeIndex: 0,
      typeCount: 1,
      productDetail: {
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
      },
      orderId: "",
      areaValue: "", //310115
      currentCity: "",
      areaList: null
    };
  },
  computed: {
    ...mapState({
      isIphoneX: state => state.login.isIphoneX,
      detailId: state => state.detail.detailId,
      wxChangeLocation: state => state.login.wxChangeLocation
    })
  },
  mounted() {
    this.currentAddress = [];
    this.init();
  },
  methods: {
    init() {
      let params = {
        pageNumber: 1,
        pageSize: 20,
        province: this.wxChangeLocation.orderProvince,
        city: this.wxChangeLocation.orderCity,
        area: this.wxChangeLocation.orderArea
      };
      _getUserAddress(params).then(res => {
        if (res.data.success) {
          let address = res.data.data.list;
          let arr1 = [];
          let arr2 = [];
          address.forEach(val => {
            val.checked = false;
            if (val.inArea) {
              arr1.push(val);
            } else {
              arr2.push(val);
            }
          });
          if (arr1.length > 0) {
            arr1[0].checked = true;
            this.currentAddress = arr1[0];
          }
          this.addressList = arr1.concat(...arr2);
        } else {
          this.$Toast(res.data.message);
        }
      });
    }
  }
};
</script>
<style lang="less" scope>
</style>