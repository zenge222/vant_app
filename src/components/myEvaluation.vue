<template>
  <div class="my_evaluation reset-tabs">
    <Tabs v-model="tabActive" :sticky="true">
      <Tab :class="'tab_item'">
        <div slot="title">
          <img src="../assets/icon_To_be_confirmed.png" />
          <p v-text="'待确认'"></p>
        </div>
        <!--  v-show="appListData.length==0" -->
        <div class="order_list_null">
          <img class="default_pic" mode="widthFix" :src="defNoOrder" />
          <p>目前没有任何预约服务</p>
        </div>
        <List v-model="loading" :finished="finished" finished-text="没有更多了" @load="getListData">
          <div v-for="item in hasEvaluate" :key="item">{{item}}</div>
        </List>
      </Tab>
    </Tabs>
  </div>
</template>
<script>
import { Tab, Button, Tabs, List, Cell, PullRefresh } from "vant";
import { mapState, mapActions, mapMutations } from "vuex";
export default {
  name: "myEvaluation",
  data() {
    return {
      cardImg: this.imgBastPath + "def_product.png",
      defNoOrder: this.imgBastPath + "def_evaluate1.png",
      tabActive: 0,
      finished: false,
      loading: false,
      tabList: [
        {
          title: "待确认",
          icon: require("../assets/icon_To_be_confirmed.png")
        },
        { title: "已结束", icon: require("../assets/icon_over.png") }
      ],
      servicesParams: {
        pageNumber: 1,
        pageSize: 5,
        loading: true
      },
      servicesParams2: {
        pageNumber: 1,
        pageSize: 5,
        loading: true
      },
      hasEvaluate: [],
      noneEvaluate: [],
      hasMore1: true,
      hasMore2: true,
      haSreach: true
    };
  },
  computed: {},
  components: {
    Tab,
    Button,
    Tabs,
    List
  },
  mounted() {},
  methods: {
    getListData() {}
  }
};
</script>
<style lang="less" scope>
</style>