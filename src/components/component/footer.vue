<template>
  <div :class="{'footer':true,'fix-iphonex-buttom':isIphoneX}">
    <div
      @click="toLink(item)"
      :class="{'active':tabIndex==index}"
      v-for="(item,index) in footerList"
    >
      <p v-text="item.title"></p>
    </div>
  </div>
</template>
<script>
import { Icon } from "vant";
import { mapState, mapActions, mapMutations } from "vuex";
export default {
  data() {
    return {
      footerList: [
        { title: "首页", path: "Home" },
        { title: "分类", path: "Classify" },
        { title: "预约", path: "MyAppointment" },
        { title: "我的", path: "My" }
      ]
    };
  },
  props: {
    tabIndex: {
      type: Number,
      default: 0
    }
  },
  components: {
    Icon
  },
  computed: {
    ...mapState({
      isMicromessenger: state => state.login.isMicromessenger,
      isIphoneX: state => state.login.isIphoneX
    })
  },
  mounted() {},
  methods: {
    toLink(item) {
      this.replaceTo(item.path);
    }
  }
};
</script>
<style lang="less" scoped>
.footer {
  position: fixed;
  left: 0;
  bottom: 0;
  display: flex;
  width: 100%;
  text-align: center;
  background: #fff;
  border-top: 1px solid #dcdcdc;
  height: 0.96rem;
  > div {
    flex: 1;
    padding: 0.6rem 0 0.1rem 0;
    color: #b1b7c2;
    font-size: 0.2rem;
  }
  > div:nth-child(1) {
    background: url("../../assets/home.png") no-repeat center 2px;
    background-size: 0.5rem;
  }
  > div:nth-child(2) {
    background: url("../../assets/classification.png") no-repeat center 2px;
    background-size: 0.5rem;
  }
  > div:nth-child(3) {
    background: url("../../assets/appointment.png") no-repeat center 2px;
    background-size: 0.5rem;
  }
  > div:nth-child(4) {
    background: url("../../assets/my.png") no-repeat center 2px;
    background-size: 0.5rem;
  }
  > div:nth-child(1).active {
    color: #eb5d2a;
    background: url("../../assets/home-active.png") no-repeat center 2px;
    background-size: 0.5rem;
  }
  > div:nth-child(2).active {
    color: #eb5d2a;
    background: url("../../assets/classification-active.png") no-repeat center
      2px;
    background-size: 0.5rem;
  }
  > div:nth-child(3).active {
    color: #eb5d2a;
    background: url("../../assets/appointment-active.png") no-repeat center 2px;
    background-size: 0.5rem;
  }
  > div:nth-child(4).active {
    color: #eb5d2a;
    background: url("../../assets/my-active.png") no-repeat center 2px;
    background-size: 0.5rem;
  }
}
</style>
