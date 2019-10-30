<template>
  <div
    style="height:100%;"
    :class="{'wx-header':true,'has-two-header':!isMicromessenger,'has-footer':true}"
  >
    <div class="classify">
      <topHeader :hasBack="false" :title="'分类'"></topHeader>
      <loactionHeader></loactionHeader>
      <!--  -->
      <div class="class_box">
        <ul class="class_menu">
          <li
            @click="changeClass(item,index)"
            :class="classActive==index?'active':''"
            v-for="(item,index) in classInfo"
            :key="index"
          >{{item.title}}</li>
        </ul>

        <div class="class_content">
          <div class="header_img">
            <img class="banner" mode="widthFix" :src="hotBanner" />
            <img mode="widthFix" class="hot" :src="hotPic" />
          </div>
          <div class="class_title">
            <div class="line line_left"></div>
            <h3>推荐分类</h3>
            <div class="line line_right"></div>
          </div>
          <div class="class_list">
            <!--  -->
            <div
              @click="toClassifyDetail(item,index)"
              class="list"
              v-for="(item,index) in classList"
              :key="index"
            >
              <img class="list_pic" mode="widthFix" :src="item.img" />
              <p>{{item.title}}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer :tabIndex="1"></Footer>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";
import { _getclassifyList } from "../service/classify";
import topHeader from "./component/header";
import loactionHeader from "./component/loactionHeader";
import Footer from "./component/footer";
export default {
  name: "Home",
  data() {
    return {
      hotBanner: this.imgBastPath + "def_classification_banner.png",
      hotPic: this.imgBastPath + "def_hot.png",
      classInfo: [],
      classActive: 0,
      classList: []
    };
  },
  computed: {
    ...mapState({
      isMicromessenger: state => state.login.isMicromessenger
    })
  },
  components: {
    topHeader,
    loactionHeader,
    Footer
  },
  activated() {
    if (!this.$route.meta.isUseCache) {
      this.classActive = 0;
      this.init();
    }
  },

  mounted() {
    this.init();
  },
  methods: {
    ...mapMutations(["saveDetailId"]),
    init() {
      let params = {
        loading: true
      };
      _getclassifyList(params).then(res => {
        if (res.data.success) {
          let bastUrl = res.data.data.baseUrl;
          this.classInfo = res.data.data.productTypes;
          this.classInfo.forEach(val => {
            val.childList.forEach(el => {
              el.img = bastUrl + el.img;
            });
          });
          this.classList = this.classInfo[0].childList;
        }
      });
    },
    changeClass(item, index) {
      this.classActive = index;
      this.classList = this.classInfo[index].childList;
    },
    toClassifyDetail(item, index) {
      let id = item.id;
      this.saveDetailId(id);
      if (item.productType == 1) {
        this.pushTo("PackageDetail");
      } else {
        this.pushTo("ClassifyDetail");
      }
    }
  }
};
</script>
<style lang="less" scoped>
.classify {
  height: 100%;
}
.class_box {
  height: 100%;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  background: #fff;

  .class_menu {
    width: 25%;
    // height: 100%;
    box-sizing: border-box;
    background: #f5f5f5;

    .active {
      border-left: 0.06rem solid #eb5d2a;
      color: #eb5d2a;
      // background: rgba(235, 93, 42, 0.1);
      background: #fff;
    }

    li {
      font-size: 0.3rem;
      text-align: center;
      line-height: 0.94rem;
    }
  }

  .class_content {
    width: 75%;
    min-height: 11rem;
    flex: 1;
    // background: red;
    padding: 0.4rem 0.3rem;
    box-sizing: border-box;
    .header_img {
      position: relative;
      border-radius: 10px;

      .banner {
        width: 100%;
      }

      .hot {
        position: absolute;
        right: 0;
        top: 0;
        width: 10%;
      }
    }

    .class_title {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 16px 0;

      h3 {
        font-size: 0.3rem;
      }

      .line {
        margin: 0 8px;
        width: 0.2rem;
        height: 0.02rem;
        background: #bababa;
      }
    }
  }
}
.class_list {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;

  .list {
    width: 33%;
    text-align: center;
    margin-bottom: 0.5rem;

    .list_pic {
      width: 60%;
      border-radius: 100%;
    }

    p {
      font-size: 0.26rem;
      line-height: 2.6;
    }
  }
}
</style>

