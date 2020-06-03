<template>
  <div class="home-ad">
<!--    <div class="home-ad-left">广告</div>-->
    <div @click="gotoUs" class="ad-item" style="background-color: rgb(252,213,181);height: 70px">
      <div style="float:left;padding:10px 0 0 20px">
        <h4 style="color: #828282;">中科智禾</h4>
        <h6 style="color: #828282;margin-top: 4px">&nbsp&nbsp&nbsp&nbsp&nbsp智能教育</h6>
      </div>
      <div class="return__icon" style="float: left;margin-top: 36px;margin-left: 8px">
        <i class="iconfont iconleft-arrow" style="font-size: 8px"></i>
      </div>
      <img src="../assets/1.jpg" style="width: 90%;height: 80%;">
    </div>
    <a href="https://gaokao.chsi.com.cn/xxgk/" class="ad-item" style="background-color: rgb(185,205,229);height: 70px">
      <div style="float:left;padding:10px 0 0 20px">
        <h4 style="color: #828282;">阳光高考</h4>
        <h6 style="color: #828282;margin-top: 4px">&nbsp&nbsp&nbsp&nbsp信息平台</h6>
      </div>
      <div class="return__icon" style="float: left;margin-top: 36px;margin-left: 8px">
        <i class="iconfont iconleft-arrow" style="font-size: 8px"></i>
      </div>
      <img src="../assets/5.png" style="width: 90%;height: 80%;">
    </a>
<!--    <a href="" class="ad-item">-->
<!--      <img src="../assets/1.png" style="width: 100%;height: 100%">-->
<!--    </a>-->
  </div>
</template>
<script>
  import ad1 from '@/assets/img/ad1.png'
  export default {
    inject: ['reload'],
    data () {
      return {
        ad1
        // adList: [
        //   { title: '查分', url: 'https://www.eol.cn/e_html/gk/chafen/index.shtml?', text: '中科瑞通' },
        //   { title: '志愿填报', url: 'https://www.eol.cn/e_html/gk/zytbsj/index.shtml?province=bj#', text: '学而思' },
        //   { title: '信息平台', url: 'http://m.gaokao.com/beikao/', text: '北大青鸟' }
        // ]
      }
    },
    methods: {
      gotoUs () {
        this.$router.push({path: '/aboutus'})
      }
    }
  }
</script>
<style lang="scss" scoped="">
  .home-ad {
    position: relative;
    height: 60px;
    /*margin: 20px 14px;*/
    /*font-size: 0;*/
    background: #fdfdfd;
    border-radius: 10px;
    box-shadow: 4px 4px 4px 0px rgba(71, 89, 172, 0.12);
    padding: 10px 0;
    text-align: center;
  }
  .return__icon{
    transform: rotate(-180deg);
  }
  .ad-item {
    float: left;
    width: 50%;
    /*height: 70px;*/
    text-align: center;
    display: inline-block;
    vertical-align: top;
    img {
      margin: 10px -5px 7px 0;
      max-width: 50px;
      max-height: 70%;
    }
    /*span {*/
    /*  font-size: 13px;*/
    /*  color: #929292;*/
    /*  display: block;*/
    /*}*/
  }
  /*.ad-item-block {*/
  /*  padding: 6px 10px;*/
  /*}*/
</style>
