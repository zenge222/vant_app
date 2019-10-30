<template>
  <div :class="{'has-header':!isMicromessenger}" style="height:100%">
    <div class="login">
      <topHeader :title="'忘记密码'"></topHeader>
      <div class="reg_item">
        <h3>修改密码</h3>
        <!-- <p @click="toLogin">登录</p> -->
      </div>
      <div class="inputs_item">
        <div class="left_item">+86</div>
        <Field v-model="userInfo.phone" maxlength="11" class="input" placeholder="请输入您的手机号" />
      </div>
      <div class="input_item">
        <Field
          v-model="userInfo.password"
          maxlength="16"
          type="password"
          class="input"
          placeholder="请输入您的新密码"
        />
      </div>
      <div class="input_item">
        <Field
          v-model="userInfo.rePassword"
          maxlength="16"
          type="password"
          class="input"
          placeholder="请确认您的新密码"
        />
      </div>
      <div class="input_item">
        <Field
          v-model="userInfo.code"
          maxlength="6"
          class="input input_code"
          placeholder="请输入收到的验证码"
        />
        <div v-if="showGetCode" class="right_icon" @click="sendCode">
          <p>获取验证码</p>
        </div>
        <div v-if="!showGetCode" class="right_icon">
          <p v-text="codeNum+'后重发'"></p>
        </div>
      </div>
      <Button @click="changePassword" class="login_btn">修改密码</Button>
      <!-- <div class="agree_text">
        <p>注册嘉美代表您已同意</p>
        <span>《嘉美用户协议》</span>
      </div>-->
    </div>
  </div>
</template>
<script>
import { Field, Button } from "vant";
import { mapState, mapActions, mapMutations } from "vuex";
import { _getMd5Str } from "../api/common";
import { _getCode, _forgetPassword } from "../service/login";
import topHeader from "./component/header";
export default {
  data() {
    return {
      iconEye: this.imgBastPath + "icon_eye.png",
      iconOpenEyes: this.imgBastPath + "icon_open_eyes.png",
      passwordType: "password",
      showGetCode: true,
      codeNum: 60,
      timer: null,
      userInfo: {
        phone: "",
        password: "",
        rePassword: "",
        code: ""
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
    toLogin() {
      this.replaceTo("Login");
    },
    sendCode() {
      let _this = this;
      let reg = /^((13|14|15|17|18)[0-9]{1}\d{8})$/;
      if (!reg.test(this.userInfo.phone)) {
        this.$Notify({
          message: "请输入正确的手机号码",
          duration: 2000,
          background: "#f44"
        });
        return;
      }
      if (this.userInfo.password.length < 6) {
        this.$Notify({
          message: "请输入6~16位密码",
          duration: 2000,
          background: "#f44"
        });
        return;
      }
      if (this.userInfo.password !== this.userInfo.rePassword) {
        this.$Notify({
          message: "确认密码与新密码不一致",
          duration: 2000,
          background: "#f44"
        });
        return;
      }
      this.showGetCode = false;
      this.timer = setInterval(() => {
        if (this.codeNum > 0) {
          this.codeNum--;
        } else {
          this.showGetCode = true;
          this.codeNum = 60;
          clearInterval(this.timer);
          this.timer = null;
        }
      }, 1000);
      let params = {
        phone: this.userInfo.phone,
        timestamp: _getMd5Str(this.userInfo.phone)[0],
        smsType: 5,
        md5Str: _getMd5Str(this.userInfo.phone)[1]
      };
      _getCode(params).then(res => {
        if (res.data.success) {
          _this.$Notify({
            message: res.data.message,
            duration: 2000,
            background: "#07c160"
          });
        }
      });
    },
    changePassword() {
      let _this = this;
      let reg = /^((13|14|15|17|18)[0-9]{1}\d{8})$/;
      if (!reg.test(this.userInfo.phone)) {
        this.$Notify({
          message: "请输入正确的手机号码",
          duration: 2000,
          background: "#f44"
        });
        return;
      }
      if (this.userInfo.password.length < 6) {
        this.$Notify({
          message: "请输入6~16位密码",
          duration: 2000,
          background: "#f44"
        });
        return;
      }
      if (this.userInfo.password !== this.userInfo.rePassword) {
        this.$Notify({
          message: "确认密码与新密码不一致",
          duration: 2000,
          background: "#f44"
        });
        return;
      }
      if (!this.userInfo.code) {
        this.$Notify({
          message: "请输入验证码",
          duration: 2000,
          background: "#f44"
        });
        return;
      }
      _forgetPassword(this.userInfo).then(res => {
        if (res.data.success) {
          //
          this.$toast({
            message: res.data.message,
            duration: 2000,
            background: "#07c160",
            forbidClick: true,
            onClose() {
              _this.replaceTo("Login");
            }
          });
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
  .inputs_item {
    display: flex;
    align-items: center;
    .left_item {
      width: 1rem;
      padding: 0.4rem 0 0.4rem 0;
      border-bottom: 0.01rem solid #dcdcdc;
      font-size: 0.32rem;
      margin-right: 0.28rem;
      color: #282828;
      font-weight: bold;
    }
    .input {
      flex: 1;
      padding: 0.4rem 0 0.4rem 0;
      border-bottom: 0.01rem solid #dcdcdc;
      font-size: 0.32rem;
    }
  }
  .input_item {
    position: relative;
    .input {
      padding: 0.4rem 0 0.4rem 0;
      border-bottom: 0.01rem solid #dcdcdc;
      font-size: 0.32rem;
    }
    .input_code {
      padding-right: 1.5rem;
    }
    .right_icon {
      position: absolute;
      top: 50%;
      right: 0;
      transform: translate(0, -50%);
      img {
        width: 0.4rem;
      }
      p {
        font-size: 0.28rem;
        color: #666;
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
  .agree_text {
    display: flex;
    font-size: 0.28rem;
    padding-top: 0.4rem;
    p {
      color: #bababa;
    }
    span {
      color: #282828;
    }
  }
}
</style>

