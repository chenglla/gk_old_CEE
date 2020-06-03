<template>
  <div class="my-info">
    <div class="my-info_first">
      <div class="first_title" @click="gotoGoal">
        <span>志愿意向</span>
        <span>前往编辑 >></span>
      </div>
      <div class="first_content">
        <div class="first_content_left">
          <span>{{goal.city}}</span>
          <span>意向城市</span>
        </div>
        <div class="first_content_right">
          <span>{{goal.major}}</span>
          <span>意向专业</span>
        </div>
      </div>
    </div>
    <div class="my-info_second" @click="gotoVolunteer">
      <i class="iconfont iconceping6"></i>
      <span>志愿清单</span>
      <i class="iconfont iconiconfontyoujiantou-copy-copy-copy-copy"></i>
    </div>
    <div class="my-info_third my-info_second">
      <div @click="gotoNew">
<!--      <div @click="gotoOpen">-->
        <i class="iconfont iconshoucang"></i>
        <span>关注我们</span>
        <i class="iconfont iconiconfontyoujiantou-copy-copy-copy-copy"></i>
      </div>
      <div v-if="showAbout">
        <div class="goal__content-body">
          {{usText}}
          <p>如想关注公众号，请长按二维码：</p>
        </div>
        <img :src="src" class="img_info"/>
<!--        <qrcode :value="src" type="img"></qrcode>-->
<!--        <div class="ewm_info">-->
<!--          <img class="ewm_img"  src="../assets/img/ewm.jpg" alt="" style="opacity: 0">-->
<!--        </div>-->
        <!--        <div v-transfer-dom>-->
<!--          <previewer :list="list" ref="previewer" :options="options" @on-index-change="logIndexChange"></previewer>-->
<!--        </div>-->
      </div>
    </div>
    <div class="my-info_third my-info_second my-info_four" @click="gotoOpenCall">
      <i class="iconfont icontongxunlu"></i>
      <span>联系我们</span>
      <i class="iconfont iconiconfontyoujiantou-copy-copy-copy-copy"></i>
      <div v-if="showCall">
        <div class="goal__content-body">
          <div class="four_item">
            <i class="iconfont iconweibiaoti-"></i><span>13381173397</span>
          </div>
          <div class="four_item">
            <i class="iconfont icontubiao209"></i><span>zkzh_edu@163.com</span>
          </div>
        </div>
      </div>
    </div>
<!--    <img style="height: 100%;width: 100%;opacity: 0" src="../assets/img/ewm.jpg">-->
<!--    <div class="my-info_bottom">-->
<!--      <span>系统数据来源于网络，版权归原作者所有，如有侵权 请与我们联系，我们将及时清除。</span>-->
<!--    </div>-->
  </div>
</template>
<script>
import { TransferDom, Qrcode } from 'vux'
export default {
  directives: {
    TransferDom
  },
  components: {
    Qrcode
  },
  name: 'user-info',
  data () {
    return {
      usText: '高考预测平台是在整合中科院及教育行业的科技和教育专家基础上，研发出的一款服务考生信息查询与志愿优选的参考推荐系统。\n' +
        '通过对高校及所招专业在各省区历年录取情况的海量数据，以及各省区考试情况数据的综合建模分析，且运用大数据、机器学习、算法和数据库等技术，为高考考生提供全方位的信息查询与报考志愿预测与推荐服务。',
      dataText: '系统数据来源于网络，版权归原作者所有，如有侵权请与我们联系，我们将及时清除。',
      showAbout: false,
      showCall: false,
      src: require('../assets/img/erweim.jpg'),
      list: [{
        msrc: require('../assets/img/erweim.jpg'),
        src: require('../assets/img/erweim.jpg'),
      }],
      options: {
        getThumbBoundsFn (index) {
          // find thumbnail element
          let thumbnail = document.querySelectorAll('.previewer-demo-img')[index]
          // get window scroll Y
          let pageYScroll = window.pageYOffset || document.documentElement.scrollTop
          // optionally get horizontal scroll
          // get position of element relative to viewport
          let rect = thumbnail.getBoundingClientRect()
          // w = width
          return {x: rect.left, y: rect.top + pageYScroll, w: rect.width}
          // Good guide on how to get element coordinates:
          // http://javascript.info/tutorial/coordinates
        }
      }
    }
  },
  props: {
    myGoal: Object,
    goal: Object
  },
  computed: {
  },
  mounted () {
  },
  methods: {
    logIndexChange (arg) {
      console.log(arg)
    },
    show (index) {
      this.$refs.previewer.show(index)
    },
    gotoNew () {
      this.$router.push({path: '/new'})
    },
    gotoCheck () {
      this.$router.push({ name: 'predict' })
    },
    gotoEdit () {
      this.$router.push({ path: '/complete?type=edit' })
    },
    gotoGoal () {
      this.$router.push({ path: '/goal' })
    },
    gotoVolunteer () {
      this.$router.push({path: '/volunteer'})
    },
    gotoUs () {
      this.$router.push({ path: '/about' })
    },
    gotoOpen () {
      this.showAbout = !this.showAbout
      this.transformIcon(this.showAbout, '.my-info_third .iconfont')
    },
    transformIcon (val, cssInfo) {
      const ifon = document.querySelectorAll(cssInfo)
      if (val === true) {
        ifon[1].className = 'iconfont iconjiantou1'
      } else {
        ifon[1].className = 'iconfont iconiconfontyoujiantou-copy-copy-copy-copy'
      }
    },
    gotoOpenCall () {
      this.showCall = !this.showCall
      this.transformIcon(this.showCall, '.my-info_four .iconfont')
    },
    feedback () {
      // this.$vux.confirm.show({
      //   title: '意见反馈',
      //   showInput: true,
      //   onConfirm: () => {
      //     this.checkLincense = true
      //   }
      // })
      this.$router.push({ name: 'feedback' })
    }
  }
}
</script>
<style lang="scss">
  @media screen and (min-height: 320px) {
    .my-info_first {
      padding: 15px;
    }
    .first_content {
      margin-top: 15px;
    }
    .my-info_second {
      margin-top: 8px;
      padding: 10px 15px;
    }
    .my-info_first .first_content .first_content_left::after {
      top: 0;
      height: 30px;
    }
  }
  @media screen and (min-height: 750px) {
    .my-info_first {
      padding: 20px 15px;
    }
    .first_content {
      margin-top: 20px;
    }
    .my-info_second {
      margin-top: 10px;
      padding: 15px;
    }
    .my-info_first .first_content .first_content_left::after {
      top: 10px;
      height: 30px;
    }
  }
  .my-info_first {
    background-color: #fff;
    /*padding: 15px;*/
    color: #3c3c3c;
    .first_title {
      display: flex;
      justify-content: space-between;
      span:first-child {
        font-size: 18px;
        font-weight: bold;
      }
      span:nth-child(2) {
        font-size: 13px;
      }
    }
    .first_content {
      /*margin-top: 15px;*/
      display: flex;
      justify-content: space-between;
      .first_content_left,
      .first_content_right {
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        position: relative;
        /*color: #3c3c3c;*/
        font-weight: bold;
        span:nth-child(2) {
          color: #9c9c9c;
          font-weight: normal;
          font-size: 13px;
          margin-top: 2px;
        }
      }
      .first_content_left::after {
        position: absolute;
        right: 0;
        /*top: 10px;*/
        /*height: 30px;*/
        width: 1px;
        content: "";
        background-color: #9c9c9c;
      }
    }
  }
  .my-info_second {
    color: #3c3c3c;
    /*margin-top: 8px;*/
    /*padding: 10px 15px;*/
    background-color: #fff;
    .iconceping6 {
      color: rgb(5, 99, 218);
      font-size: 22px;
    }
    span {
      /*font-weight: bold;*/
      font-size: 16px;
      color: #333;
    }
    .iconiconfontyoujiantou-copy-copy-copy-copy {
      float: right;
      font-size: 20px;
    }
  }
  .my-info_third {
    position: relative;
    .iconshoucang {
      color: #ffbe00;
      font-size: 18px;
      margin-right: 3px;
    }
    .img_info {
      -webkit-touch-callout: none;
      margin-top: 10px;
      height: 200px;
      width: 200px;
      margin-left: 50%;
      transform: translateX(-50%);
    }
  }
  .my-info_four {
    /*margin: 0 15px;*/
    margin-top: unset!important;
    border-top: 1px solid #efefef;
    .icontongxunlu {
      color: #42bb81;
      font-size: 20px;
      margin-right: 3px;
    }
  }
  .iconjiantou1 {
    float: right;
    font-size: 20px;
  }
  .goal__content-body {
    padding: 15px 5px 3px;
    font-size: 14px;
    text-indent: 2em;
    line-height: 26px;
    word-break: break-all;
    .four_item {
      margin-top: 5px;
      .iconfont {
        margin-right: 8px;
        font-weight: bold;
      }
      span {
        font-weight: normal;
      }
    }
  }
  .ewm_info {
    background-image: url('../assets/img/ewm.jpg');
    /*position: absolute;*/
    height: 160px;
    width: 160px;
  }
  .ewm_img {
    position: relative;
    left: 30%;
    top: 30%;
    opacity: 0;
  }
  /*.my-info_bottom {*/
  /*  text-align: center;*/
  /*  width: 76%;*/
  /*  margin-left: 12%;*/
  /*  color: #9c9c9c;*/
  /*  font-size: 13px;*/
  /*  position: fixed;*/
  /*  bottom: 8px;*/
  /*}*/
</style>
