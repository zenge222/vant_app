<template>
  <div class="product_list">
    <List v-model="loading" :finished="finished" finished-text="没有更多了" @load="getData">
      <div class="home_list" v-if="productParams.type==1">
        <div
          class="card_box"
          v-for="(item,index) in productList"
          :key="index"
          @click="toDetail(item)"
        >
          <img style="width:100%;" :src="item.bannerImg" mode="widthFix" />
          <div class="pro_list_info1">
            <div class="info_item">
              <h3>{{item.name}}</h3>
              <div class="price item_top">
                <span class="activity">活动价￥</span>
                <span style="font-size:25px;">{{item.productPackages[0].price}}</span>
                <span>/{{item.productPackages[0].unitStr}}</span>
              </div>
            </div>
            <div class="info_item">
              <em>{{item.intro}}</em>
              <div class="flex_item item_bottom">
                <i>{{item.productPackages[0].originalPrice}}/{{item.productPackages[0].unitStr}}</i>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="home_list" v-if="productParams.type==2">
        <div
          class="card_box"
          v-for="(item,index) in productList"
          :key="index"
          @click="toDetail(item)"
        >
          <img style="width:100%;" :src="item.bannerImg" mode="widthFix" />
          <div class="pro_list_info1">
            <div class="info_item">
              <h3>{{item.name}}</h3>
              <div class="price item_top">
                <span style="font-size:12px;">每{{item.priceUnitStr}}￥</span>
                <span style="font-size:25px;">{{item.price}}</span>
              </div>
            </div>
            <div class="info_item">
              <em>{{item.intro}}</em>
            </div>
          </div>
        </div>
      </div>

      <div class="home_list" v-if="productParams.type==3">
        <div
          class="card_box"
          v-for="(item,index) in productList"
          :key="index"
          @click="toDetail(item)"
        >
          <div class="title_head">
            <h3>{{item.name}}</h3>
            <div class="title_adorn">
              <img src="https://file.omnrj.com/static/images/def_label.png" mode="widthFix" />
              <p>服务任选</p>
            </div>
            <em>{{item.intro}}</em>
          </div>
          <img style="width:100%;" :src="item.bannerImg" mode="widthFix" />
          <div class="card_flex">
            <div class="card_padding">
              <div class="card_item">
                提供包月服务 {{item.price}}元/{{item.priceUnitStr}}
                <div class="card_round1"></div>
                <div class="card_white1"></div>
                <div class="card_round2"></div>
                <div class="card_white2"></div>
              </div>
            </div>
            <div class="card_padding">
              
              <div class="card_item">
                体验大礼包 {{item.productPackages[0].price}}/{{item.productPackages[0].unitStr}}
                <div class="card_round1"></div>
                <div class="card_white1"></div>
                <div class="card_round2"></div>
                <div class="card_white2"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </List>
  </div>
</template>
<script>
import { List, Toast, Cell, Lazyload } from "vant";
import { _getHomeProductList } from "../service/home";
import { mapMutations } from "vuex";
import { _getUnit } from "../api/common";
export default {
  name: "ProductList",
  data() {
    return {
      productParams: {
        type: "",
        pageNumber: 1,
        pageSize: 6,
        loading: true
      },
      productList: [],
      loading: false,
      finished: false
    };
  },
  components: {
    List,
    Toast,
    Cell,
    Lazyload
  },
  activated() {
    if (!this.$route.meta.isUseCache) {
      this.productList = [];
      this.productParams.pageNumber = 1;
      this.productParams.type = this.$route.params.type;
      this.finished = false;
    }
  },
  mounted() {
    this.productList = [];
    this.productParams.pageNumber = 1;
    this.productParams.type = this.$route.params.type;
    this.finished = false;
  },

  methods: {
    ...mapMutations(["saveDetailId"]),
    getData(flag) {
      let _this = this;
      _getHomeProductList(this.productParams).then(res => {
        if (res.data.success) {
          let page = res.data.data.page;
          let baseUrl = res.data.data.baseUrl;
          let resData = res.data.data.list;
          resData.forEach(val => {
            val.bannerImg = baseUrl + val.bannerImg;
            if (val.productPackages.length != 0) {
              val.productPackages[0].unitStr = _getUnit(
                val.productPackages[0].priceUnit
              );
            }
          });
          // 加载状态结束
          this.loading = false;
          if (_this.productParams.pageNumber <= page.totalPage) {
            _this.finished = true;
            if (flag && falg == "change") {
              _this.productList = resData;
            } else {
              _this.productList = _this.productList.concat(resData);
            }
          }
        }
      });
    },
    toDetail(item) {
      // type  1体验包(detail)  2包月(classify_detail) 3 两个都有
      // let params = {
      //   id: item.productTypeId
      // };

      let id = item.productTypeId;
      this.saveDetailId(id);
      if (item.type == 1) {
        this.pushTo("PackageDetail");
      } else {
        this.pushTo("ClassifyDetail");
      }
    }
  }
};
</script>
<style lang="less" scoped>
</style>
