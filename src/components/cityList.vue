<template>
  <div class="city_list">
    <!-- 头部 -->
    <div class="city_header">
      <div class="location_info">
        <Icon class="location_icon" color="#666" name="location-o" />
        <span>当前定位</span>
      </div>
      <div class="location_box">
        <!-- @click="changeCityCurrent" -->
        <h3 class="current_city">{{wxLocation.cityName}}</h3>
        <!-- @click="toLocation" -->
        <div class="to_location">
          <img mode="widthFix" :src="iconRepositioning" />
          <span>重新定位</span>
        </div>
      </div>
    </div>
    <!-- 内容 -->
    <div class="fill_bg"></div>
    <div class="option_citys">
      <!-- v-show="locationList.length>0" -->
      <div class="common_city">
        <div class="common_header">
          <span>常用城市：</span>
          <!--  @click="delCityList" -->
          <Icon class="del_icon" name="delete" color="#BABABA" />
        </div>
        <div class="common_list">
          <!--  @click="historyChangeCity(item)" -->
          <div v-for="(item,index) in locationList" :key="index" class="item_city">{{item.cityName}}</div>
        </div>
      </div>
      <div class="common_city">
        <div class="common_header">
          <span>已开通城市：</span>
        </div>
        <div class="common_list">
          <!--  :class="{'item_city':true,'active':activeIndex==index}" -->
          <!--  @click="changeCity2(item,index)" -->
          <div
            v-for="(item,index) in optionList2"
            :key="index"
            :class="{'item_city':true}"
          >{{item.cityName}}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Icon } from "vant";
import { mapState, mapActions, mapMutations } from "vuex";

export default {
  name: "CityList",
  data() {
    return {
      iconRepositioning: this.imgBastPath + "icon_Repositioning.png",
      optionList1: [
        {
          cityName: "宁波",
          latitude: "29.89889",
          longitude: "121.84431",
          checked: false
        },
        {
          cityName: "上海",
          latitude: "31.40527",
          longitude: "121.48941",
          checked: false
        },
        {
          cityName: "北京",
          latitude: "40.22077",
          longitude: "116.23128",
          checked: false
        }
      ],
      optionList2: [
        { cityName: "宁波", latitude: "29.89889", longitude: "121.84431" },
        { cityName: "上海", latitude: "31.40527", longitude: "121.48941" },
        { cityName: "北京", latitude: "40.22077", longitude: "116.23128" }
      ],
      activeIndex: -1
    };
  },
  components: {
    Icon
  },
  computed: {
    ...mapState({
      wxLocation: state => state.login.wxLocation,
      wxChangeLocation: state => state.login.wxChangeLocation,
      locationList: state => state.addressHistory.locationList
    })
  },
  methods: {
    ...mapMutations(["addLocationHistory", "clearLocationHistory"])
  }
};
</script>
<style lang="less" scope>
</style>