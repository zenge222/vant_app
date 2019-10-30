<template>
  <div :class="{'has-header':!isMicromessenger,'has-footer':true}">
    <div class="my_appointment reset-tabs">
      <topHeader :hasBack="false" :title="'预约'"></topHeader>
      <!-- <PullRefresh v-model="isLoading" @refresh="onRefresh">
      <p>刷新次数: {{ count }}</p>-->
      <Tabs v-model="tabActive" :sticky="true" :offset-top="offsetTop">
        <!-- 待确认 -->
        <Tab :class="'tab_item'">
          <div slot="title">
            <img src="../assets/icon_To_be_confirmed.png" />
            <p v-text="'待确认'"></p>
          </div>
          <div class="order_list_null" v-show="appListData.length==0">
            <img class="default_pic" mode="widthFix" :src="defNoOrder" />
            <p>目前没有任何预约服务</p>
          </div>
          <List v-model="loading" :finished="finished" finished-text="没有更多了" @load="getListData">
            <div v-for="item in appListData" :key="item">{{item}}</div>
          </List>
        </Tab>
        <!-- 已结束 -->
        <Tab :class="'tab_item'">
          <div slot="title">
            <img src="../assets/icon_over.png" />
            <p v-text="'已结束'"></p>
          </div>
          <div class="order_list_null" v-show="appListData.length==0">
            <img class="default_pic" mode="widthFix" :src="defNoOrder" />
            <p>目前没有任何预约服务</p>
          </div>
          <List v-model="loading" :finished="finished" finished-text="没有更多了" @load="getListData">
            <div v-for="item in appListData" :key="item">{{item}}</div>
          </List>
        </Tab>
      </Tabs>
      <!-- </PullRefresh> -->
    </div>
    <!-- <Button @click="pushTo('Login')" type="primary">非WX登录</Button> -->
    <Button type="primary">WX登录</Button>
    <Footer :tabIndex="2"></Footer>
  </div>
</template>
<script>
import { Tab, Button, Tabs, List, Cell, PullRefresh } from "vant";
import { mapState, mapActions, mapMutations } from "vuex";
import { _getAppointList } from "../service/appointment";
import topHeader from "./component/header";
import Footer from "./component/footer";
export default {
  name: "Home",
  data() {
    return {
      defNoOrder: this.imgBastPath + "def_No_appointment.png",
      tabActive: 0,
      tabList: [
        {
          title: "待确认",
          icon: require("../assets/icon_To_be_confirmed.png")
        },
        { title: "已结束", icon: require("../assets/icon_over.png") }
      ],
      appointParams: {
        pageSize: 5,
        pageNumber: 1,
        type: "wait"
      },
      appListData: [1, 2, 3],
      loading: false,
      finished: false,
      count: 0,
      isLoading: false
    };
  },
  computed: {
    ...mapState({
      isMicromessenger: state => state.login.isMicromessenger
    }),
    offsetTop: function() {
      let offset = 0;
      if (!this.isMicromessenger) {
        offset = (50 / 750) * (screen.availWidth * 2);
      }
      return offset;
    }
  },
  components: {
    Tab,
    Tabs,
    List,
    Cell,
    Button,
    PullRefresh,
    topHeader,
    Footer
  },
  mounted() {},
  methods: {
    getListData() {
      let _this = this;
      _getAppointList(this.appointParams).then(res => {
        console.log(res);
        if (res.data.success) {
        }
      });
      //   // 异步更新数据
      //   setTimeout(() => {
      //     for (let i = 0; i < 10; i++) {
      //       this.appListData.push(this.appListData.length + 1);
      //     }
      //     // 加载状态结束
      //     this.loading = false;
      //     // 数据全部加载完成
      //     if (this.appListData.length >= 40) {
      //       this.finished = true;
      //     }
      //   }, 500);
    },
    onRefresh() {
      setTimeout(() => {
        // this.$toast("刷新成功");
        this.isLoading = false;
        this.count++;
      }, 500);
    }
  }
};
</script>
<style lang="less" scoped>
.my_appointment {
  .order_list_null {
    margin-top: 0.2rem;
    background: #fff;
    padding: 50px 0 300px 0;

    .default_pic {
      width: 50%;
      display: block;
      margin: 0 auto;
    }

    p {
      font-size: 0.32rem;
      text-align: center;
      color: #818181;
      line-height: 3;
    }
  }
}
</style>
