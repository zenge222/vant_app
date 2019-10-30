<template>
  <div class="set_up">
    <div class="my_order" @click="picPop=true">
      <div class="order_header">
        <p>头像</p>
        <div class="right_btn">
          <div class="user_header_pic">
            <img class="user_pic" mode="widthFix" :src="wxUserInfo.avatarUrl||headerPic" />
          </div>
          <Icon class="right_icon" name="arrow" />
        </div>
      </div>
    </div>
    <div class="my_order2">
      <div class="order_header" @click="namePop=true">
        <p>昵称</p>
        <div class="right_btn">
          <span style="color:#282828;" v-text="wxUserInfo.nickName||'先生/女士'"></span>
          <Icon class="right_icon" name="arrow" />
        </div>
      </div>
      <div class="order_header">
        <p>手机号码</p>
        <div class="right_btn">
          <span class="phone_number" v-text="phoneLoginInfo.phoneNum||'1************'">
            <i style="display:inline-block;padding-left:10px;">已验证</i>
          </span>
          <!-- <i-icon color="#BABABA" type="enter" /> -->
        </div>
      </div>
      <!-- <div class="order_header" @click="toChangePassword">
        <p>修改密码</p>
        <div class="right_btn">
          <span></span>
          <i-icon color="#BABABA" type="enter"/>
        </div>
      </div>-->
    </div>
    <Popup v-model="picPop" class="name_pop2" position="bottom" @close="picPop=false">
      <div class="pic1">拍照</div>
      <div class="pic2">从相册选择</div>
      <div @click="picPop=false" class="close_pop">取消</div>
    </Popup>
    <Popup class="name_pop" v-model="namePop">
      <h3>请输入您的新昵称</h3>
      <input v-model="changeName" type="text" />
      <Button @click="changeNameSubmit" class="name_btn">确定</Button>
      <Icon @click="closeNamePop" class="close_icon" name="cross" color="#666" />
    </Popup>
  </div>
</template>
<script>
import { mapState, mapActions, mapMutations } from "vuex";
import { Button, Lazyload, Icon, Popup, Field } from "vant";
export default {
  name: "SetUp",
  data() {
    return {
      namePop: false,
      picPop: false,
      headerPic: require("../assets/home-active.png"),
      changeName: "",
      cacheNumber: 8.2,
      carWin_img_hidden: true, //展示照片的view是否隐藏
      carWin_img: "" //存放照片路径的
    };
  },
  components: {
    Icon,
    Popup,
    Button,
    Field
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
    ...mapActions(["changeNickName"]),
    closeNamePop() {
      this.namePop = false;
      this.changeName = this.wxUserInfo.nickName;
    },
    changeNameSubmit() {
      if (!this.changeName) {
        this.$Notify({
          message: "请输入昵称",
          background: "#ff976a"
        });
      } else {
        let userName = {
          nickname: this.changeName
        };
        this.namePop = false;
        this.changeNickName(this.changeName);
        // _changeNickName(userName).then(res => {
        //   if (res.data.success) {
        //     this.namePop = false;
        //     this.changeNickName(this.changeName);
        //     this.$Message({
        //       content: res.data.message,
        //       type: "success"
        //     });
        //   }
        // });
      }
    }
  }
};
</script>
<style lang="less" scope>
</style>