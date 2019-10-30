<template>
  <div class="my_order reset-tabs">
    <!-- :offset-top="offsetTop" -->
    <Tabs v-model="tabActive" @change="onChange" :sticky="true">
      <!-- 全部 -->
      <Tab :class="'tab_item'">
        <div slot="title">
          <img :src="imgBastPath + 'icon_all.png'" />
          <p v-text="'全部'"></p>
        </div>
        <div class="order_list_null" v-show="orderList.length==0">
          <img class="default_pic" mode="widthFix" :src="noOrderPic" />
          <p>目前没有任何订单</p>
        </div>
        <List
          v-show="hasList"
          class="item_list"
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="getDataList"
        ></List>
      </Tab>
      <!-- 待支付 -->
      <Tab :class="'tab_item'">
        <div slot="title">
          <img :src="imgBastPath + 'icon_confirmed.png'" />
          <p v-text="'待支付'"></p>
        </div>
        <div class="order_list_null" v-show="orderList.length==0">
          <img class="default_pic" mode="widthFix" :src="noOrderPic" />
          <p>目前没有任何订单</p>
        </div>
        <List
          v-show="hasList"
          class="item_list"
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="getDataList"
        ></List>
      </Tab>
      <!-- 待服务 -->
      <Tab :class="'tab_item'">
        <div slot="title">
          <img :src="imgBastPath + 'icon_serve.png'" />
          <p v-text="'待服务'"></p>
        </div>
        <div class="order_list_null" v-show="orderList.length==0">
          <img class="default_pic" mode="widthFix" :src="noOrderPic" />
          <p>目前没有任何订单</p>
        </div>
        <List
          v-show="hasList"
          class="item_list"
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="getDataList"
        ></List>
      </Tab>
      <!-- 已完成 -->
      <Tab :class="'tab_item'">
        <div slot="title">
          <img :src="imgBastPath + 'icon_pay.png'" />
          <p v-text="'已完成'"></p>
        </div>
        <div class="order_list_null" v-show="orderList.length==0">
          <img class="default_pic" mode="widthFix" :src="noOrderPic" />
          <p>目前没有任何订单</p>
        </div>
        <List
          v-show="hasList"
          class="item_list"
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="getDataList"
        ></List>
      </Tab>
    </Tabs>
  </div>
</template>
<script>
import { Tab, Button, Tabs, List, Cell, PullRefresh } from "vant";
import { mapState, mapActions, mapMutations } from "vuex";
export default {
  data() {
    return {
      noOrderPic: this.imgBastPath + "def_no_order.png",
      orderPic: this.imgBastPath + "order_pic.png",
      loading: false,
      finished: false,
      imgs: [
        this.imgBastPath + "icon_all.png",
        this.imgBastPath + "icon_confirmed.png",
        this.imgBastPath + "icon_serve.png",
        this.imgBastPath + "icon_pay.png",
        this.imgBastPath + "icon_evaluate2.png"
      ],
      picPop: false,
      tabActive: 0,
      hasList: false,
      orderParams: {
        pageNumber: 1,
        pageSize: 5,
        status: "",
        payStatus: "",
        loading: true
      },
      toBePaidParams: {
        pageNumber: 1,
        pageSize: 5
      },
      orderList: [],
      toBePaidList: [],
      hasMore: true,
      loadShow: true,
      haSreach: true
    };
  },
  components: {
    Tab,
    Button,
    Tabs,
    List
  },
  computed: {
    offsetTop: function() {
      let offset = 0;
      if (!this.isMicromessenger) {
        offset = (50 / 750) * (screen.availWidth * 2);
      }
      return offset;
    }
  },
  mounted() {
    if (this.$route.params) {
      this.tabActive = this.$route.params.index;
    }
  },
  methods: {
    onChange() {},
    getDataList() {}
  }
};
</script>
<style lang="less" scope>
</style>