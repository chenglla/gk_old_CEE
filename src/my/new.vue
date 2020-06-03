<template>
  <div style="height: 100%;width: 100%;background-color:#fff;">
    <div class="bbs-box feedback-box">
      <div class="bbs__add">
        <div class="bbs-return return-box">
          <div class="return__icon" @click="gotoPage">
            <i class="iconfont iconleft-arrow"></i> 关注我们
          </div>
        </div>
      </div>
    </div>
    <div class="feedback__content">
      <div class="predict__tips__content_volunteer">
        <!--        <div class="tips__header">志愿清单</div>-->
        <div class="goal__content-body">
          {{usText}}
          <p>如想关注公众号，请长按二维码：</p>
        </div>
        <img :src="src" class="img_info"/>
<!--        <qrcode :value="src" type="img"></qrcode>-->
      </div>
    </div>
  </div>
</template>
<script>
  import { Qrcode } from 'vux'
  export default {
    components: {
      Qrcode
    },
    data () {
      return {
        src: require('../assets/img/erweim.jpg'),
        usText: '高考预测平台是在整合中科院及教育行业的科技和教育专家基础上，研发出的一款服务考生信息查询与志愿优选的参考推荐系统。\n' +
          '通过对高校及所招专业在各省区历年录取情况的海量数据，以及各省区考试情况数据的综合建模分析，且运用大数据、机器学习、算法和数据库等技术，为高考考生提供全方位的信息查询与报考志愿预测与推荐服务。',
      }
    },
    mounted () {
    },
    methods: {
      // 去页面
      gotoPage () {
        this.$router.go(-1)
        // this.$router.push({ path: path })
      },
    }
  }
</script>
<style lang="scss">
  .bbs-box {
    background: #647cfb;
    background: linear-gradient(to right, #4a8ef9 0%, #5292f7 15%, #347ff4 70%, #0c5ddc 100%);;
    flex: none;
    z-index: 1;
  }
  .bbs-return {
    background: #647cfb;
    background: linear-gradient(to right, #4a8ef9 0%, #5292f7 15%, #347ff4 70%, #0c5ddc 100%);;
    flex: none;
    z-index: 1;
    height: 50px;
    body &.return-box .return__icon.return__icon {
      color: #fff;
      font-size: 16px;
    }
  }
  .feedback__content {
    flex: 1;
    height: calc(100% - 50px);
    padding: 10px 20px;
  }
  .goal__content-body {
    padding: 10px 5px 3px;
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
  .img_info {
    -webkit-touch-callout: none;
    margin-top: 10px;
    height: 200px;
    width: 200px;
    margin-left: 50%;
    transform: translateX(-50%);
  }
</style>

