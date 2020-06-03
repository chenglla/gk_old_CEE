<template>
  <div style="height: 100%;width: 100%;display:flex;flex-direction: column;">
    <div class="about-box">
      <div class="about-return return-box">
        <div class="return__icon" @click="gotoBack">
          <i class="iconfont iconleft-arrow"></i>
          关注我们
        </div>
      </div>
    </div>
    <div class="about-info-box">
      高考预测平台是在整合中科院及教育行业的科技和教育专家基础上，研发出的一款服务考生信息查询与志愿优选的参考推荐系统。
      通过对高校及所招专业在各省区历年录取情况的海量数据，以及各省区考试情况数据的综合建模分析，且运用大数据、机器学习、算法和数据库等技术，为高考考生提供全方位的信息查询与报考志愿预测与推荐服务。
      <p>长按二维码关注：</p>
      <div style="height: 130px;width: 130px"><img src="../assets/9.jpg" style="width: 100%;height: 100%;margin-left: 50%"></div>

    </div>
  </div>
</template>
<script>
export default {
  name: 'about',
  methods: {
    gotoBack () {
      this.$router.go(-1)
    }
  }
}
</script>
<style lang="scss" scoped>
  .about-box {
    background: #647cfb;
    background: linear-gradient(to right, #4a8ef9 0%, #5292f7 15%, #347ff4 70%, #0c5ddc 100%);;
    flex: none;
    z-index: 1;
    height: 56px;
  }
  .about-info-box {
    padding: 20px;
    font-size: 14px;
    text-indent: 2em;
    word-break: break-all;
  }
  .about-email {
    margin-top: 40px;
    text-indent: 0;
    .email {
      text-indent: 2em;
      display: block;
    }
    p {
      padding-left: 40px;
    }
  }
</style>
