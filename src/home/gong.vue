<template>
  <div style="height: 100%;width: 100%;display:flex;flex-direction: column;">
    <div class="check-box">
      <div class="return__icon" @click="returnBack" style="float: left">
        <i class="iconfont iconleft-arrow"></i>
      </div>
      <div style="color: #fff;font-size: 17px;margin-top: 10px;margin-left: 40%">
        二维码
      </div>
    </div>
    <div>
      <div class="complete-card">
        <p style="font-size: 16px;margin: 10px 7%">长按二维码关注：</p>
        <div class="info-item__value">
          <div style="height: 200px;width: 200px"><img src="../assets/9.jpg" style="width: 100%;margin-right: -10%"></div>
        </div>
      </div>
      <div class="check_content">
        <p>中科智禾是在国家教育部推进教育创新的背景下，整合了中科院、教育行业及产业企业的科技和教育资源，共同打造的服务于走班教学、智慧学习、志愿填报服务、教师发展和数字化校园管理的智慧教育生态圈。</p>
<!--        <p>通过综合运用互联网、移动化、大数据、人工智能等前沿技术，通过高度融合或深度服务的模式，为教育管理部门推进区域教育发展、为学校数字化校园和智慧化教育推进、为家校协同各相关方提供精准服务和助力，深入推进校园的数字化、可视化和智能化，共同打造新一轮教育改革创新的标杆。</p>-->
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    methods: {
      // 返回
      returnBack () {
        this.$router.go(-1)
      }
    }
  }
</script>
<style lang="scss" scoped="">
  .check-box {
    background: #647cfb;
    background: linear-gradient(to right, #4a8ef9 0%, #5292f7 15%, #347ff4 70%, #0c5ddc 100%);;
    flex: none;
    z-index: 1;
    height: 45px;
  }
  .return__icon{
    margin-left: 10px;
    margin-top: 10px;
    color: #fff;
  }
  .complete-card {
    overflow: hidden;
    position: relative;
    background: #fff;
    /*margin: 16px 20px;*/
    padding: 10px 5px;
    /*box-shadow: 0 6px 6px rgba(75, 92, 178, 0.1);*/
    /*border-radius: 4px;*/
  }
  .info-item__value{
    /*height: 50%;*/
    width: 60%;
    margin-left: 20%;
  }
  .check_content{
    margin: 5px 0;
    padding: 10px 30px;
    background-color: #fff;
    box-shadow: 0 6px 6px rgba(75, 92, 178, 0.1);
    border-radius: 4px;
    p {
      text-indent: 2em;
      display: block;
    }
  }
</style>
