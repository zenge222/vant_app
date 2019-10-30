<template>
  <div class="card_item" @click="toDetail(cardInfo)">
    <!-- type 1 礼包  2 钟点工 3 双拼 -->
    <!--  v-if="mainProduct.type==3" -->
    <div class="title_head" v-if="cardInfo.type==3">
      <h3>{{cardInfo.name}}</h3>
      <div class="title_adorn">
        <img src="https://file.omnrj.com/static/images/def_label.png" mode="widthFix" />
        <p>服务任选</p>
      </div>
      <em>{{cardInfo.intro}}</em>
    </div>
    <!-- 商品图片 -->
    <img
      style="width:100%;"
      src="https://file.omnrj.com/static/images/def_Gift _Picture.png"
      mode="widthFix"
    />
    <!-- 内容 -->
    <!-- type 1 礼包  2 钟点工 3 双拼 -->
    <div class="pro_list_info1" v-if="cardInfo.type==1||cardInfo.type==2">
      <div class="info_item">
        <h3>{{cardInfo.name}}</h3>
        <div class="price item_top" v-if="cardInfo.type==2">
          <span class="price1">每{{cardInfo.priceUnitStr}}￥</span>
          <span class="price2">{{cardInfo.price}}</span>
        </div>
        <div class="price item_top" v-if="cardInfo.type==1">
          <span class="activity">活动价￥</span>
          <span>{{cardInfo.productPackages[0].price}}</span>
          <!-- <span>/{{mainProduct.productPackages[0].serviceNum}}次</span> -->
          <span>/{{cardInfo.productPackages[0].unitStr}}</span>
        </div>
      </div>
      <div class="info_item">
        <em>{{cardInfo.intro}}</em>
        <div class="flex_item item_bottom" v-if="cardInfo.type==1">
          <i>{{cardInfo.productPackages[0].originalPrice}}/{{cardInfo.productPackages[0].unitStr}}</i>
          <!-- <p>/{{mainProduct.productPackages[0].serviceNum}}次</p> -->
          <!-- <p></p> -->
        </div>
      </div>
    </div>
    <!-- 卡卷 -->
    <div class="card_flex" v-if="cardInfo.type==3">
      <div class="card_padding">
        <div class="card_item">
          提供包月服务 {{cardInfo.price}}元/{{cardInfo.priceUnitStr}}
          <div class="card_round1"></div>
          <div class="card_white1"></div>
          <div class="card_round2"></div>
          <div class="card_white2"></div>
        </div>
      </div>
      <div class="card_padding">
        <div class="card_item">
          体验大礼包 {{cardInfo.productPackages[0].price}}/{{cardInfo.productPackages[0].unitStr}}
          <div class="card_round1"></div>
          <div class="card_white1"></div>
          <div class="card_round2"></div>
          <div class="card_white2"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  data() {
    return {
      cardInfo: this.cardParams
    };
  },
  props: {
    cardParams: {
      type: Object,
      required: true
    }
  },
  watch: {
    cardInfo: function(newVal, oldVal) {
      this.cardInfo = newVal;
    }
  },
  mounted() {
    // console.log(this.cardInfo);
  },
  methods: {
    ...mapMutations(["setSelLocation", "saveDetailId"]),
    toDetail(item) {
      // type 3 两个都有  1体验包  2包月
      let id = item.productTypeId;
      this.saveDetailId(id);
      if (item.type == 1) {
        // 修改区域
        this.setSelLocation();
        this.pushTo("PackageDetail");
      } else {
        this.pushTo("ClassifyDetail");
      }
    }
  }
};
</script>
<style lang="less" scope>
.card_item {
  padding: 5px 8px;
  background: #fff;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.05);
  border-radius: 4px;
  margin-top: 12px;

  .title_head {
    padding-bottom: 10px;
    display: flex;
    align-items: baseline;
    > em {
      font-size: 0.24rem;
      color: #bababa;
    }

    h3 {
      font-size: 0.4rem;
      line-height: 20px;
      display: inline-block;
    }

    .title_adorn {
      display: inline-block;
      margin: 0 0.08rem 0 0.08rem;
      position: relative;
      width: 1.3rem;
      top: 3px;
      img {
        display: block;
        width: 1.3rem;
      }

      p {
        width: 100%;
        position: absolute;
        left: 50%;
        top: 1px;
        transform: translate(-50%, 0);
        color: #fff;
        text-align: center;
        font-size: 0.19rem;
        line-height: 0.3rem;
      }
    }
  }

  .pro_list_info1 {
    padding-top: 10px;

    .info_item {
      display: flex;
      justify-content: space-between;

      .price {
        color: #eb5d2a;
        font-size: 0.5rem;
        display: flex;
        align-items: baseline;
      }

      h3 {
        font-size: 0.4rem;
      }

      em {
        font-size: 0.24rem;
        color: #bababa;
      }

      i {
        font-size: 0.24rem;
        color: #bababa;
        text-decoration: line-through;
      }
    }
  }
}

.card_flex {
  display: flex;
  justify-content: space-between;
  padding-top: 10px;

  .card_padding:first-child {
    padding-right: 8px;
    box-sizing: border-box;
  }

  .card_padding:last-child {
    padding-left: 8px;
    box-sizing: border-box;
  }

  .card_padding {
    width: 50%;

    .card_item {
      border: 1px solid #eb5d2a;
      text-align: center;
      font-size: 0.24rem;
      // line-height: 2;
      position: relative;
      color: #eb5d2a;

      .card_round1,
      .card_round2 {
        width: 10px;
        height: 10px;
        border-radius: 100%;
        border: 1px solid #eb5d2a;
        background: #fff;
      }

      .card_white1,
      .card_white2 {
        width: 6px;
        height: 20px;
        background: #fff;
      }

      .card_round1 {
        position: absolute;
        top: 50%;
        left: 0;
        transform: translate(-50%, -50%);
      }

      .card_white1 {
        position: absolute;
        top: 50%;
        left: -4px;
        transform: translate(-50%, -50%);
      }

      .card_round2 {
        position: absolute;
        top: 50%;
        right: 0;
        transform: translate(50%, -50%);
      }

      .card_white2 {
        position: absolute;
        top: 50%;
        right: -4px;
        transform: translate(50%, -50%);
      }
    }
  }
}
.item_bottom {
  font-size: 0.24rem;
  color: #bababa;
}

.item_top {
  .activity {
    font-size: 0.24rem;
  }
  span:last-child {
    font-size: 0.24rem;
  }
  .price1 {
    font-size: 0.24rem !important;
  }
  .price2 {
    font-size: 0.5rem !important;
  }
}
</style> 
