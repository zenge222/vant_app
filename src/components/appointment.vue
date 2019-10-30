<template>
  <div :class="{'has-header':!isMicromessenger}">
    <div class="appointment reset-tabs">
      <Tabs v-model="tabActive" @change="onChange" :sticky="true" :offset-top="offsetTop">
        <!-- 综合 -->
        <Tab :class="'tab_item'">
          <div slot="title">
            <img :src="imgBastPath + 'icon_comprehensive.png'" />
            <p v-text="'综合'"></p>
          </div>
          <div class="order_list_null" v-show="!hasList">
            <img class="default_pic" mode="widthFix" :src="defNoOrder" />
            <p>目前没有任何预约服务</p>
          </div>
          <List
            v-show="hasList"
            class="item_list"
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="getDataList"
          >
            <div class="list_card">
              <ul>
                <li class="list_box" v-for="(item,index) in appListData" :key="index">
                  <div class="list_left">
                    <img
                      @click="toDetail(item.id)"
                      class="list_pic"
                      mode="widthFix"
                      :src="item.headImg"
                    />
                  </div>
                  <div class="list_right">
                    <h3>{{item.truename}}</h3>
                    <div class="info clearfix">
                      <h5>{{item.age}}岁</h5>
                      <h5>{{item.domicile}}</h5>
                      <h5>
                        <span>{{item.workYears}}</span>年工作
                      </h5>
                      <h5>
                        服务过
                        <span>0</span>户
                      </h5>
                    </div>
                    <!-- <div class="rate_box">
                  <van-rate
                    custom-class="a"
                    icon-class="b"
                    :value="item.level"
                    :size="'12'"
                    :count="'5'"
                    readonly="true"
                    @change="rateChange"
                  />
                    </div>-->
                    <div class="rate_container">
                      <img :src="rateImg" v-for="(item2,index2) in item.level" :key="index2" />
                    </div>
                    <div class="list_bottom clearfix">
                      <h4 class="fl">
                        <span>{{item.price}}</span>元/小时
                      </h4>
                      <button @click="toDetail2(item.id)" class="list_btn fr">立即面试</button>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </List>
        </Tab>
        <!-- 按价格 -->
        <Tab :class="'tab_item'">
          <div slot="title">
            <img :src="imgBastPath + 'icon_price.png'" />
            <p v-text="'按价格'"></p>
          </div>
          <div class="price_change" v-show="showpriceUp">
            <div @click="upPrice" :class="priceUp?'active1':''">
              <!-- <span></span> -->
            </div>
            <div @click="downPrice" :class="!priceUp?'active2':''">
              <!-- <span></span> -->
            </div>
          </div>
          <div class="order_list_null" v-show="!hasList">
            <img class="default_pic" mode="widthFix" :src="defNoOrder" />
            <p>目前没有任何预约服务</p>
          </div>
          <List
            v-show="hasList"
            class="item_list"
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="getDataList"
          >
            <div class="list_card">
              <ul>
                <li class="list_box" v-for="(item,index) in appListData" :key="index">
                  <div class="list_left">
                    <img
                      @click="toDetail(item.id)"
                      class="list_pic"
                      mode="widthFix"
                      :src="item.headImg"
                    />
                  </div>
                  <div class="list_right">
                    <h3>{{item.truename}}</h3>
                    <div class="info clearfix">
                      <h5>{{item.age}}岁</h5>
                      <h5>{{item.domicile}}</h5>
                      <h5>
                        <span>{{item.workYears}}</span>年工作
                      </h5>
                      <h5>
                        服务过
                        <span>0</span>户
                      </h5>
                    </div>
                    <!-- <div class="rate_box">
                  <van-rate
                    custom-class="a"
                    icon-class="b"
                    :value="item.level"
                    :size="'12'"
                    :count="'5'"
                    readonly="true"
                    @change="rateChange"
                  />
                    </div>-->
                    <div class="rate_container">
                      <img :src="rateImg" v-for="(item2,index2) in item.level" :key="index2" />
                    </div>
                    <div class="list_bottom clearfix">
                      <h4 class="fl">
                        <span>{{item.price}}</span>元/小时
                      </h4>
                      <button @click="toDetail2(item.id)" class="list_btn fr">立即面试</button>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </List>
        </Tab>
        <!-- 按经验 -->
        <Tab :class="'tab_item'">
          <div slot="title">
            <img :src="imgBastPath + 'icon_experience.png'" />
            <p v-text="'按经验'"></p>
          </div>
          <div class="order_list_null" v-show="!hasList">
            <img class="default_pic" mode="widthFix" :src="defNoOrder" />
            <p>目前没有任何预约服务</p>
          </div>
          <List
            v-show="hasList"
            class="item_list"
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="getDataList"
          >
            <div class="list_card">
              <ul>
                <li class="list_box" v-for="(item,index) in appListData" :key="index">
                  <div class="list_left">
                    <img
                      @click="toDetail(item.id)"
                      class="list_pic"
                      mode="widthFix"
                      :src="item.headImg"
                    />
                  </div>
                  <div class="list_right">
                    <h3>{{item.truename}}</h3>
                    <div class="info clearfix">
                      <h5>{{item.age}}岁</h5>
                      <h5>{{item.domicile}}</h5>
                      <h5>
                        <span>{{item.workYears}}</span>年工作
                      </h5>
                      <h5>
                        服务过
                        <span>0</span>户
                      </h5>
                    </div>
                    <!-- <div class="rate_box">
                  <van-rate
                    custom-class="a"
                    icon-class="b"
                    :value="item.level"
                    :size="'12'"
                    :count="'5'"
                    readonly="true"
                    @change="rateChange"
                  />
                    </div>-->
                    <div class="rate_container">
                      <img :src="rateImg" v-for="(item2,index2) in item.level" :key="index2" />
                    </div>
                    <div class="list_bottom clearfix">
                      <h4 class="fl">
                        <span>{{item.price}}</span>元/小时
                      </h4>
                      <button @click="toDetail2(item.id)" class="list_btn fr">立即面试</button>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </List>
        </Tab>
        <!-- 按星级 -->
        <Tab :class="'tab_item'">
          <div slot="title">
            <img :src="imgBastPath + 'icon_star.png'" />
            <p v-text="'按星级'"></p>
          </div>
          <div class="age_change" v-show="showAgeUp">
            <!-- -->
            <div @click="upAge" :class="ageUp?'active1':''">
              <!-- <span></span> -->
            </div>
            <!--  -->
            <div @click="downAge" :class="!ageUp?'active2':''">
              <!-- <span></span> -->
            </div>
          </div>
          <div class="order_list_null" v-show="!hasList">
            <img class="default_pic" mode="widthFix" :src="defNoOrder" />
            <p>目前没有任何预约服务</p>
          </div>
          <List
            v-show="hasList"
            class="item_list"
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="getDataList"
          >
            <div class="list_card">
              <ul>
                <li class="list_box" v-for="(item,index) in appListData" :key="index">
                  <div class="list_left">
                    <img
                      @click="toDetail(item.id)"
                      class="list_pic"
                      mode="widthFix"
                      :src="item.headImg"
                    />
                  </div>

                  <div class="list_right">
                    <h3>{{item.truename}}</h3>
                    <div class="info clearfix">
                      <h5>{{item.age}}岁</h5>
                      <h5>{{item.domicile}}</h5>
                      <h5>
                        <span>{{item.workYears}}</span>年工作
                      </h5>
                      <h5>
                        服务过
                        <span>0</span>户
                      </h5>
                    </div>
                    <!-- <div class="rate_box">
                  <van-rate
                    custom-class="a"
                    icon-class="b"
                    :value="item.level"
                    :size="'12'"
                    :count="'5'"
                    readonly="true"
                    @change="rateChange"
                  />
                    </div>-->
                    <div class="rate_container">
                      <img :src="rateImg" v-for="(item2,index2) in item.level" :key="index2" />
                    </div>
                    <div class="list_bottom clearfix">
                      <h4 class="fl">
                        <span>{{item.price}}</span>元/小时
                      </h4>
                      <button @click="toDetail2(item.id)" class="list_btn fr">立即面试</button>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </List>
        </Tab>
      </Tabs>
    </div>
  </div>
</template>
<script>
import { Tab, Button, Tabs, List, Cell, PullRefresh } from "vant";
import { mapState, mapActions, mapMutations } from "vuex";
import { _getUnit, _delCity } from "../api/common";
import { _getAppointmentList } from "../service/classify";
export default {
  data() {
    return {
      rateImg: this.imgBastPath + "icon_Diamonds.png",
      defNoOrder: this.imgBastPath + "def_No_appointment.png",
      tabActive: 0,
      priceUp: false,
      ageUp: true,
      showpriceUp: true,
      showAgeUp: true,
      hasList: false,
      appointParams: {
        pageSize: 5,
        pageNumber: 1,
        type: "wait"
      },

      appParams: {
        orderBy: "", // price：价格，experience：经验，age：年龄
        pageNumber: 1,
        pageSize: 5,
        orderDir: "", // desc，逆向，asc：正向
        startTime: "",
        endTime: "",

        appointTryId: "",
        productId: ""
      },
      appListData: [],
      loading: false,
      finished: false,
      haSreach: true
    };
  },
  components: {
    Tab,
    Tabs,
    List,
    Cell,
    Button,
    PullRefresh
  },
  computed: {
    ...mapState({
      isMicromessenger: state => state.login.isMicromessenger,
      wxChangeLocation: state => state.login.wxChangeLocation,
      isIphoneX: state => state.login.isIphoneX,
      appointmentIds: state => state.detail.appointmentIds
    }),
    offsetTop: function() {
      let offset = 0;
      if (!this.isMicromessenger) {
        offset = (50 / 750) * (screen.availWidth * 2);
      }
      return offset;
    }
  },
  activated() {
    if (!this.$route.meta.isUseCache) {
      this.appListData = [];
      this.setIds();
    }
  },
  mounted() {
    console.log("mounted");
    this.setIds();
  },
  methods: {
    setIds() {
      this.appListData = [];
      this.appParams.productId = this.appointmentIds.productId;
      this.appParams.appointTryId = this.appointmentIds.id;
      this.getDataList("change");
      this.finished = false;
    },
    //
    initData() {
      this.appParams.pageNumber = 1;
      this.appListData = [];
      // this.finished = false;
    },
    getDataList(flag) {
      let _this = this;
      _getAppointmentList(this.appParams).then(res => {
        if (res.data.success) {
          let page = res.data.data.page;
          if (this.appParams.pageNumber < page.totalPage) {
            _this.finished = true;
          } else {
            this.haSreach = false;
          }
          let bastPath = res.data.data.baseUrl;
          let resData = res.data.data.list;
          resData.forEach(val => {
            val.headImg = bastPath + val.headImg;
          });
          // 加载状态结束
          this.loading = false;
          if (resData.length < 5) {
            _this.finished = true;
          }

          if (resData.length > 0) {
            this.hasList = true;
          } else {
            this.hasList = false;
          }
          if (flag == "change") {
            _this.appListData = resData;
          } else {
            _this.appListData = _this.appListData.concat(resData);
          }
        }
      });
    },
    upPrice() {
      this.initData();
      this.appParams.orderDir = "asc";
      this.priceUp = true;
      this.getDataList("change");
    },

    downPrice() {
      this.initData();
      this.appParams.orderDir = "desc";
      this.priceUp = false;
      this.getDataList("change");
    },

    upAge() {
      this.initData();
      this.appParams.orderDir = "asc";
      this.ageUp = true;
      this.getDataList("change");
    },

    downAge() {
      this.initData();
      this.appParams.orderDir = "desc";
      this.ageUp = false;
      this.getDataList("change");
    },
    onChange(e) {
      this.tabActive = e;
      switch (e) {
        // 综合
        case 0:
          this.initData();
          this.appParams.orderBy = "";
          this.appParams.orderDir = "";
          this.appParams.startTime = "";
          this.appParams.endTime = "";
          this.showpriceUp = this.showAgeUp = false;
          this.getDataList(this.appParams, "change");
          break;
        // 按价格
        case 1:
          this.initData();
          this.appParams.orderBy = "price";
          this.appParams.orderDir = "asc";
          this.priceUp = true;
          this.appParams.startTime = "";
          this.appParams.endTime = "";
          this.showpriceUp = true;
          this.showAgeUp = false;
          this.getDataList(this.appParams, "change");
          break;
        case 2:
          // 按经验
          this.initData();
          this.appParams.orderBy = "experience";
          this.appParams.orderDir = "asc";
          this.appParams.startTime = "";
          this.appParams.endTime = "";
          this.getDataList(this.appParams, "change");
          this.showpriceUp = this.showAgeUp = false;
          break;
        case 3:
          // 按星际
          this.initData();
          this.appParams.orderBy = "age";
          this.appParams.orderDir = "";
          this.appParams.startTime = "";
          this.ageUp = true;
          this.appParams.endTime = "";
          this.getDataList(this.appParams, "change");
          this.showAgeUp = true;
          this.showpriceUp = false;
          break;
        default:
          break;
      }
    }
  }
};
</script>
<style lang="less" scope>
</style>