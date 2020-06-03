<template>
<!--  <div style="height: calc(100% - 50px);overflow: hidden;position: relative;" ref="aboutus">-->
  <div style="width: 100%;height:100%;">
    <div class="about-box">
      <div class="about-return return-box">
        <div class="return__icon" @click="gotoBack">
          <i class="iconfont iconleft-arrow"></i>
          关于我们
        </div>
      </div>
    </div>
    <div class="about-info-box" ref="aboutus">
      <div style="padding: 10px 0;position: relative;">
        中科智禾是在国家教育部推进教育创新的背景下，整合了中科院、教育行业及产业企业的科技和教育资源，共同打造的服务于走班教学、智慧学习、志愿填报服务、教师发展和数字化校园管理的智慧教育生态圈。

        <img src="../assets/8.png" style="width: 100%;height: 100%;">
        <img src="../assets/11.png" style="width: 100%;height: 100%;">
        <img src="../assets/12.png" style="width: 100%;height: 100%;">
        <img src="../assets/14.png" style="width: 100%;height: 100%;">
        <p style="margin-top: 10px">通过综合运用互联网、移动化、大数据、人工智能等前沿技术，通过高度融合或深度服务的模式，为教育管理部门推进区域教育发展、为学校数字化校园和智慧化教育推进、为家校协同各相关方提供精准服务和助力，深入推进校园的数字化、可视化和智能化，共同打造新一轮教育改革创新的标杆。</p>
        <div class="about-email">欢迎联系：<p>zkzh_edu@163.com </p><p>gkyc_edu@163.com</p> </div>
      </div>
    </div>
  </div>
</template>
<script>
  import BScroll from 'better-scroll'
  export default {
    data () {
      return {
        majorScroll: null
      }
    },
    // name: 'aboutus',
    mounted () {
      this.$nextTick(() => {
        this.majorScroll = new BScroll(this.$refs.aboutus, {
          click: true
        })
      })
    },
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
    /*background: linear-gradient(to right, #4a8ef9 0%, #5292f7 15%, #347ff4 70%, #0c5ddc 100%);;*/
    flex: none;
    /*z-index: 1;*/
    height: 56px;
  }
  .about-info-box {
    position: relative;
    margin: 0 5px 16px;
    /*background-color: #0bb20c;*/
    /*box-shadow: 0 6px 6px rgba(75, 92, 178, 0.1);*/
    /*border-radius: 4px;*/
    padding: 10px;
    font-size: 14px;
    text-indent: 2em;
    height: calc(100% - 76px);
    overflow: hidden;
    /*word-break: break-all;*/
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
