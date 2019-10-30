<template>
  <div :class="{'has-header':!isMicromessenger}" style="height:100%">
    <div class="login">
      <topHeader :title="'登录'"></topHeader>
      <div class="reg_item">
        <h3>登录嘉美</h3>
        <p @click="replaceTo('Register')">注册</p>
      </div>
      <div class="input_item">
        <Field v-model="userInfo.phoneNum" maxlength="11" class="input" placeholder="请输入用户名" />
      </div>
      <div class="input_item">
        <Field
          v-model="userInfo.pwd"
          :type="passwordType"
          maxlength="16"
          class="input"
          placeholder="请输入密码"
        />
        <div class="right_icon" v-show="passwordType=='password'" @click="openEye">
          <img mode="widthFix" :src="iconEye" />
        </div>
        <div class="right_icon" v-show="passwordType=='text'" @click="openEye">
          <img mode="widthFix" :src="iconOpenEyes" />
        </div>
      </div>
      <Button @click="loginSubmit" class="login_btn">登录</Button>
      <div @click="pushTo('ForgetPassword')" class="forget_btn">忘记密码</div>
    </div>
  </div>
</template>
<script>
import { Field, Button } from "vant";
import { mapState, mapActions, mapMutations } from "vuex";
import { _phoneLogin } from "../service/login";
import topHeader from "./component/header";
export default {
  data() {
    return {
      iconEye: this.imgBastPath + "icon_eye.png",
      iconOpenEyes: this.imgBastPath + "icon_open_eyes.png",
      passwordType: "password",
      userInfo: {
        phoneNum: "",
        pwd: ""
      }
    };
  },
  computed: {
    ...mapState({
      isMicromessenger: state => state.login.isMicromessenger
    })
  },
  components: {
    Field,
    Button,
    topHeader
  },
  mounted() {},
  methods: {
    openEye() {
      this.passwordType = this.passwordType === "text" ? "password" : "text";
    },
    loginSubmit() {
      let _this = this;
      if (!this.userInfo.phoneNum) {
        this.$Notify({
          message: "请输入手机号码",
          duration: 2000,
          background: "#f44"
        });
      } else if (!this.userInfo.pwd) {
        this.$Notify({
          message: "请输入密码",
          duration: 2000,
          background: "#f44"
        });
      } else {
        let user_info = {
          phone: this.userInfo.phoneNum,
          password: this.userInfo.pwd
        };
        _phoneLogin(user_info).then(res => {
          console.log(res)
          if (res.data.success) {
            _this.$router.go(-1);
            // let url = `../home/main`;
            // this.toUserLogin(this.userInfo.phoneNum);
          } else {
            this.$Notify({
              message: res.data.message,
              duration: 2000,
              background: "#f44"
            });
          }
        });
      }
    }
  }
};
</script>
<style lang="less" scoped>
.login {
  height: 100%;
  background: #fff;
  padding: 0 0.6rem;
  .reg_item {
    display: flex;
    justify-content: space-between;
    padding: 0.6rem 0;
    align-items: baseline;
    h3 {
      font-size: 0.36rem;
      color: #282828;
      font-weight: bold;
    }
    p {
      font-size: 0.28rem;
      color: #eb5d2a;
    }
  }
  .input_item {
    position: relative;
    .input {
      padding: 0.4rem 0 0.4rem 0;
      border-bottom: 0.01rem solid #dcdcdc;
      font-size: 0.32rem;
    }
    .right_icon {
      position: absolute;
      top: 50%;
      right: 0;
      transform: translate(0, -50%);
      img {
        width: 0.4rem;
      }
    }
  }
  .login_btn {
    width: 100%;
    display: block;
    margin-top: 0.8rem;
    border-radius: 0.45rem;
    background: #eb5d2a;
    color: #fff;
    line-height: 0.9rem;
    height: 0.9rem;
  }
  .forget_btn {
    text-align: center;
    font-size: 0.28rem;
    margin-top: 0.6rem;
  }
}
</style>

