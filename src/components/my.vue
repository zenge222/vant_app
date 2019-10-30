<template>
  <div :class="{'my':true,'has-header':!isMicromessenger,'has-footer':true}">
    <!-- 头部 -->
    <topHeader :hasBack="false" :title="'我的'"></topHeader>
    <!-- 用户信息头部 -->
    <div class="header_container">
      <div class="user_item">
        <!-- src="../../static/icon/btn_setUp.png"  -->
        <img :src="wxUserInfo.avatarUrl||headerPic" />
        <div class="user_info">
          <h3 v-text="wxUserInfo.nickName||'先生/女士'"></h3>
          <p v-text="phoneLoginInfo.phoneNum||'13***********'"></p>
        </div>
      </div>
      <img @click="toSetUp" class="set_up_icon" src="../assets/btn_setUp.png" />
    </div>
    <!-- 我的订单 -->
    <div class="order_container">
      <div class="order_header" @click="toMyOrder">
        <h3>我的订单</h3>
        <div class="right_item">
          <span>全部订单</span>
          <Icon class="right_icon" name="arrow" />
        </div>
      </div>
      <div class="order_menu">
        <div
          @click="toMyOrder2(item)"
          class="menu_list"
          v-for="(item,index) in orderMenuList"
          :key="index"
        >
          <img :src="item.icon" />
          <p v-text="item.title"></p>
        </div>
      </div>
    </div>
    <!-- list列表 -->
    <div class="list_container">
      <!-- <div class="list_item">
        <div class="list_left">
          <img src="../assets/icon_Coupon.png" />
          <p>优惠券</p>
        </div>
        <div class="list_right">
          <Icon class="right_icon" name="arrow" />
        </div>
      </div>-->
      <div class="list_item">
        <div class="list_left">
          <img src="../assets/icon_map.png" />
          <p>我的地址</p>
        </div>
        <div class="list_right">
          <Icon class="right_icon" name="arrow" />
        </div>
      </div>
      <div class="list_item" @click="toMyEvaluation">
        <div class="list_left">
          <img src="../assets/icon_evaluate.png" />
          <p>我的评价</p>
        </div>
        <div class="list_right">
          <Icon class="right_icon" name="arrow" />
        </div>
      </div>
    </div>
    <div class="list_container">
      <div class="list_item">
        <div class="list_left">
          <img src="../assets/icon_Agreement.png" />
          <p>服务协议</p>
        </div>
        <div class="list_right">
          <Icon class="right_icon" name="arrow" />
        </div>
      </div>
      <div class="list_item">
        <div class="list_left">
          <img src="../assets/icon_Customer_service.png" />
          <p>客服热线</p>
        </div>
        <div class="list_right">
          <span>400-888-8888</span>
          <Icon class="right_icon" name="arrow" />
        </div>
      </div>
    </div>
    <!-- 底部 -->
    <Footer :tabIndex="3"></Footer>
  </div>
</template>

<script>
import { Button, Lazyload, Icon } from "vant";
import { mapState, mapActions, mapMutations } from "vuex";
import topHeader from "./component/header";
import Footer from "./component/footer";
export default {
  name: "Home",
  data() {
    return {
      headerPic: require("../assets/btn_setUp.png"),
      orderMenuList: [
        {
          title: "待支付",
          icon: require("../assets/order_To_be_confirmed.png"),
          index: 1
        },
        {
          title: "待服务",
          icon: require("../assets/order_Waiting_for_service.png"),
          index: 2
        },
        {
          title: "已完成",
          icon: require("../assets/order_payment.png"),
          index: 3
        }
        // {
        //   title: "待评价",
        //   icon: require("../assets/order_evaluate.png"),
        //   path: ""
        // }
      ]
    };
  },
  watch: {},
  components: {
    Icon,
    Button,
    Lazyload,
    topHeader,
    Footer
  },
  computed: {
    ...mapState({
      isMicromessenger: state => state.login.isMicromessenger,
      wxUserInfo: state => state.login.wxUserInfo,
      phoneLoginInfo: state => state.login.phoneLoginInfo
    })
  },
  mounted() {},
  methods: {
    toSetUp() {
      this.pushTo("SetUp");
    },
    toMyOrder() {
      this.pushTo("MyOrder");
    },
    toMyOrder2(item) {
      let params = {
        index: item.index
      };
      this.pushTo("MyOrder", params);
    },
    toMyEvaluation() {
      this.pushTo("MyEvaluation");
    }
  }
};
</script>
<style lang="less" scoped>
.my {
  .header_container {
    position: relative;
    background: linear-gradient(to right, #ef9235, #eb5e2a);
    padding: 0.3rem;
    .set_up_icon {
      position: absolute;
      right: 0.3rem;
      top: 0.3rem;
      width: 0.4rem;
    }
    .user_item {
      display: flex;
      align-items: center;
      > img {
        width: 1.3rem;
        border-radius: 100%;
        display: block;
        margin-right: 0.25rem;
      }
      .user_info {
        color: #fff;
        padding: 0.58rem 0;
        h3 {
          font-size: 0.36rem;
          line-height: 1;
          padding-bottom: 0.32rem;
        }
        p {
          font-size: 0.24rem;
          padding-left: 0.3rem;
          background: url("../assets/icon_ipone.png") no-repeat left center;
          background-size: 0.16rem;
          line-height: 1;
        }
      }
    }
  }
  .order_container {
    padding-left: 0.3rem;
    background: #fff;
    margin-bottom: 0.2rem;
    .order_header {
      display: flex;
      justify-content: space-between;
      padding: 0.3rem 0.3rem 0.3rem 0;
      border-bottom: 0.01rem solid #f0f0f0;
      > h3 {
        font-size: 0.28rem;
      }
      .right_item {
        display: flex;
        align-items: center;
        font-size: 0.24rem;
        span {
          color: #666;
        }
        .right_icon {
          font-size: 0.3rem;
          color: #868686;
          margin: 0.02rem 0 0 0.12rem;
        }
      }
    }
    .order_menu {
      padding: 0.3rem 0.3rem 0.3rem 0;
      display: flex;
      .menu_list {
        flex: 1;
        text-align: center;
        > img {
          width: 0.44rem;
        }
        > p {
          font-size: 0.24rem;
          padding-top: 0.08rem;
        }
      }
    }
  }
  .list_container {
    padding-left: 0.2rem;
    background: #fff;
    margin-bottom: 0.2rem;
    .list_item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0.3rem 0.3rem 0.3rem 0;
      border-bottom: 0.01rem solid #f0f0f0;
      .list_left {
        display: flex;
        align-items: center;
        > img {
          width: 0.3rem;
          display: block;
          margin-right: 0.2rem;
        }
        > p {
          font-size: 0.28rem;
        }
      }
      .list_right {
        display: flex;
        align-items: center;
        > span {
          font-size: 0.24rem;
          color: #868686;
        }
        .right_icon {
          font-size: 0.3rem;
          color: #868686;
          margin: 0.02rem 0 0 0.12rem;
        }
      }
    }
    .list_item:last-child {
      border-bottom: none;
    }
  }
}
</style>
