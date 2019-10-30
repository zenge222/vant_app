<template>
  <div class="select_address">
    <!-- 头部 -->
    <div class="header">
      <div class="header_left">
        <div class="location_item" @click="toCityList">
          <Icon class="l_icon fl" name="location-o" />
          <p class="fl">{{wxChangeLocation.selCity}}</p>
          <Icon class="l_icon fl" name="arrow-down" />
        </div>
        <!-- @click="tosearchAddress" -->
        <Field class="header_input" type="text" disabled placeholder="小区/街道/学校等" />
      </div>
      <!--  @click="toAddAddress" -->
      <div class="header_add_address">新增地址</div>
    </div>
    <!-- 内容b -->
    <div class="sel_container">
      <div class="sel_header">
        <!-- @click="toHome" -->
        <h3>{{wxLocation.cStreet}}</h3>
        <!-- @click="toRelocation" -->
        <div class="to_location">
          <img mode="widthFix" :src="iconRepositioning" />
          <span>重新定位</span>
        </div>
      </div>
      <div class="sel_addr_list">
        <div class="list_header">
          <img mode="widthFix" :src="iconHome" />
          <span>我的服务地址</span>
        </div>
        <div
          :class="{'my_addr_list':true,'down_active':downMore}"
          :style="downMore?'height:'+moreHeight+'rpx':''"
        >
          <!-- @click="myAddressClick(item,index)" -->
          <div ref="addr" class="addr_info" v-for="(item,index) in myAddressList" :key="index">
            <h3>{{item.locationName}} {{item.address}}</h3>
            <p>
              <span>{{item.linkName}}</span>
              <span>{{item.sex==0?'先生':'女士'}}</span>
              <span>{{item.linkPhone}}</span>
            </p>
          </div>
          <!-- <div class="addr_info">
            <h3>决斗学院 鹤城新村2幢2号202室</h3>
            <p>
              <span>王鑫斌</span>
              <span>先生</span>
              <span>13056770791</span>
            </p>
          </div>-->
          <!-- @click="openList" -->
          <div v-show="myAddressList.length>3" class="addr_load_more">
            <span>展开更多地址</span>
            <Icon color="#868686" :type="downMore?'arrow-up':'arrow-down'" />
          </div>
        </div>
      </div>
    </div>
    <!-- 内容e -->
  </div>
</template>
<script>
import { Button, Tabs, Icon, Field, PullRefresh } from "vant";
import { mapState, mapActions, mapMutations } from "vuex";
export default {
  name: "SelectAddress",
  data() {
    return {
      isInService: false,
      notInServiceImg: this.imgBastPath + "not_in_service_map.png",
      iconRepositioning: this.imgBastPath + "icon_Repositioning.png",
      iconHome: this.imgBastPath + "icon_home.png",
      iponePic: this.imgBastPath + "ipone.png",
      downMore: false,
      login_pop_show: false,
      moreHeight: 0,
      myAddressList: []
    };
  },
  components: {
    Icon,
    Field
  },
  computed: {
    ...mapState({
      isMicromessenger: state => state.login.isMicromessenger,
      isIphoneX: state => state.login.isIphoneX,
      //   mapKey: state => state.login.mapKey,
      wxLocation: state => state.login.wxLocation,
      wxChangeLocation: state => state.login.wxChangeLocation
    })
  },
  mounted() {},
  methods: {
    toCityList() {
      this.pushTo("CityList");
    }
  }
};
</script>
<style lang="less">
</style>