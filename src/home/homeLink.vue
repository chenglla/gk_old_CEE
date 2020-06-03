<template>
  <div class="home-link">
<!--    <div>-->
      <div class="home-link-left">常用入口</div>
      <div class="link-item">
        <div class="link-item-block">
          <i class="iconfont iconfenshuxianchaxun-"></i>
          <span @click="goCheck()">分数查询</span>
        </div>
<!--        <div class="link-item-block">-->
<!--          <i class="iconfont iconzhiyuanbiao"></i>-->
<!--          <span @click="goZhiyuan()">志愿填报入口</span>-->
<!--        </div>-->
        <!--      <br>-->
        <div class="link-item-block">
          <i class="iconfont iconziyuan" ></i>
          <span @click="gotoOption('zytbpc')" style="">志愿批次信息</span>
        </div>
        <div class="link-item-block">
          <i class="iconfont iconpingtaizhuanyehua"></i>
          <span @click="gotoOption('enrollPlan')">招生计划</span>
<!--          <span><a href="https://gaokao.chsi.com.cn/zsgs/zhangcheng/listVerifedZszc&#45;&#45;method-index,lb-1.dhtml" style="color: #828282;">招生计划</a></span>-->
        </div>

        <div class="link-item-block">
          <i class="iconfont iconyifenyiduan"></i>
          <span @click="gotoOption('oneScore')" style="">一分一段表</span>
        </div>
        <!--      <div class="link-item-block">-->
        <!--        <i class="iconfont iconzhiyexinggeceshi" ></i>-->
        <!--        <span><a href="http://www.zhongkeruitong.top/evaluate/evaluate/index.html" style="color: #828282;">性格职业测试</a></span>-->
        <!--      </div>-->
      </div>
<!--    </div>-->


<!--    <div class="link-item" :class="'link-item' + index" v-for="(item, index) in linkList" :key="item.title">-->
<!--      <a class="link-item-block" :href="item.url">-->
<!--        <i class="iconfont" :class="item.icon"></i>-->
<!--        <span class="link__title">{{item.title}}</span>-->
<!--      </a>-->
<!--    </div>-->
  </div>
</template>
<script>
  export default {
    data () {
      return {
        linkList: [
          { icon: 'iconfenshuxianchaxun-', title: '查分', url: 'https://www.eol.cn/e_html/gk/chafen/index.shtml?' },
          { icon: 'iconzhiyuanbiao', title: '志愿填报', url: 'https://www.eol.cn/e_html/gk/zytbsj/index.shtml?province=bj#' },
          { icon: 'iconpingtaizhuanyehua', title: '信息平台', url: 'http://m.gaokao.com/beikao/' }
        ]
      }
    },
    methods: {
      goCheck () {
        this.$router.push({ path: '/check' })
      },
      goZhiyuan () {
        this.$router.push({ path: '/zhiyuan' })
      },
      // goGongzhonghao () {
      //   this.$router.push({ path: '/gong' })
      // },
      gotoOption (val) {
        this.$router.push({name: val})
      }
    }
  }
</script>
<style lang="scss" scoped="">
  @media screen and (min-height: 320px) {
    .home-link {
      font-size: 13px;
      height: 80px;
      padding-top: 5px;
    }
    .home-link-left {
      top: 12px;
    }
    .link-item {
      padding: 7px 0 7px 15px;
    }
    .link-item-block {
      margin: 4px 0;
      .iconfont{
        font-size: 13px;
        /*position: absolute;*/
        /*margin-top: 13px;*/
        /*margin-right: 20px;*/
        margin-right: 6px;
      }
      /*span {*/
      /*  margin-left: 20px;*/
      /*}*/
    }
    .home-link-left {
      &:after {
        height: 60px;
        top: 0;
      }
    }
  }
  @media screen and (min-height: 750px) {
    .home-link {
      font-size: 15px;
      height: 100px;
      padding-top: 2px;
    }
    .home-link-left {
      top: 18px;
    }
    .link-item {
      padding: 13px 0 12px 15px;
    }
    .link-item-block {
      margin: 4px 0;
      .iconfont{
        font-size: 16px;
        /*position: absolute;*/
        /*margin-top: 18px;*/
        /*margin-right: 15px;*/
        margin-right: 6px;
      }
      /*span {*/
      /*  margin-left: 25px;*/
      /*}*/
    }
    .home-link-left {
      &:after {
        height: 60px;
        top: 0;
      }
    }
  }
  .home-link {
    background: #e1e9ff;
    margin: 0 14px 20px;
    padding-left: 50px;
    border-radius: 10px;
    position: relative;
    box-shadow: 4px 4px 4px 0px rgba(71, 89, 172, 0.12);
    /*height: 100px;*/
  }
  .home-link-left {
    position: absolute;
    left: 20px;
    /*top: 20px;*/
    /*top: 12px;*/
    color: #6e86fb;
    width: 10px;
    line-height: 17px;
    &:after {
      content: '';
      width: 1px;
      /*height: 70px;*/
      background: #d0d8ff;
      display: block;
      position: absolute;
      /*top: -3px;*/
      left: 28px;
    }
  }
  .link-item {
    display: flex;
    width: 90%;
    flex-wrap: wrap;
    /*padding: 11px 0 11px 15px;*/
  }
  .link-item-block {
    /*position: relative;*/
    align-content: center;
    display: flex;
    justify-content: flex-start;
    padding: 3px 0;
    text-align: center;
    flex: 50%;
    &,
    &:focus,
    &:hover {
      color: #828282;
    }
    .iconfont{
      /*position: absolute;*/
      /*font-size: 13px;*/
      /*margin-right: 6px;*/
    }
  }
  .iconyifenyiduan {
    font-weight: bold;
  }
  .iconzhiyexinggeceshi {
    font-weight: bold;
  }
  /*.iconzhiyexinggeceshi1 {*/
  /*  font-size: 18px;*/
  /*}*/
  .link__title {
    text-align: center;
    a {
      color: #373d41;
      text-decoration: underline;
      display: block;
    }
  }
  .link__body {
    text-align: center;
  }
</style>
