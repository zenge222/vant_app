<template>
  <div class="location">
    <div :class="{'location_header':true,'no_header':isMicromessenger}">
      <div class="header_left" @click="toSelectAddress">
        <Icon class="location_icon" name="location-o" />
        <p v-text="wxChangeLocation.street"></p>
        <Icon name="arrow-down" />
      </div>
      <div class="header_right" @click="changeMore">
        <Icon :class="{'add_icon':true,'click_more':moreShow}" name="add-o" />
      </div>
    </div>
    <div class="more_info" v-show="showMoreBox">
      <div class="triangle_border_up"></div>
      <div class="more_list">
        <!-- <Icon name="orders-o"> -->
        <Icon class="left_icon" name="orders-o" />
        <span>我的订单</span>
      </div>
      <div class="more_list">
        <Icon class="left_icon" name="comment-o" />
        <span>我的消息</span>
      </div>
      <!-- <div class="more_list">
        <Icon class="left_icon" name="scan" />
        <span>扫一扫</span>
      </div>-->
    </div>
  </div>
</template> 
<script>
import { Icon } from "vant";
import { mapState, mapActions, mapMutations } from "vuex";
export default {
  data() {
    return {
      moreShow: false,
      showMoreBox: false
    };
  },
  components: {
    Icon
  },
  computed: {
    ...mapState({
      wxChangeLocation: state => state.login.wxChangeLocation,
      isMicromessenger: state => state.login.isMicromessenger
    })
  },
  mounted() {
    this.moreShow = false;
  },
  methods: {
    changeMore() {
      this.moreShow = !this.moreShow;
      this.showMoreBox = !this.showMoreBox;
    },
    toSelectAddress() {
      this.pushTo("SelectAddress");
    }
  }
};
</script>
<style lang="less" scoped>
.location_header {
  padding: 0 10px;
  position: fixed;
  left: 0;
  top: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 0.8rem;
  background: #fff;
  font-size: 0.3rem;
  border-bottom: 0.01rem solid #efefef;
  z-index: 2;
  .header_left {
    display: flex;
    align-items: center;
    > p {
      font-size: 0.3rem;
      padding: 0 8px;
      line-height: 44px;
    }
    .location_icon {
      font-size: 0.3rem;
    }
  }

  .add_icon {
    font-size: 0.5rem;
    transform: rotate(0deg);
    transition: transform linear 0.3s;
  }
  .click_more {
    transform: rotate(45deg);
  }
}
.no_header {
  top: 0;
}
.location {
  position: relative;
}
.more_info {
  position: fixed;
  background: #fff;
  border-radius: 4px;
  box-shadow: 0 0 30px rgba(203, 203, 203, 0.15);
  width: 2.8rem;
  right: 0.2rem;
  top: 0.9rem;
  z-index: 2;
  .more_list {
    padding: 0.27rem 0.3rem;
    border-bottom: 1px solid #efefef;
    display: flex;
    align-items: center;
    .left_icon {
      font-size: 0.32rem;
      display: block;
    }
    span {
      font-size: 0.28rem;
      padding-left: 0.24rem;
    }
  }

  .more_list:last-child {
    border-bottom: none;
  }

  .triangle_border_up {
    width: 0;
    height: 0;
    border-width: 0 10px 10px;
    border-style: solid;
    border-color: transparent transparent #fff;
    margin: 40px auto;
    position: absolute;
    right: 3px;
    top: -48px;
    z-index: 20;
  }
}
</style>
