<template>
  <div class="home-ad">
    <div class="home_ad_one">
      <div class="one cp">
<!--        <div class="left">-->
          <a href="https://zhongkeruitong.top/evaluate/evaluate/index.html" style="color: #262626" class="left">
            <span>性格职业测评</span>
            <span>清晰了解自己</span>
          </a>
<!--        </div>-->
        <div class="right">
          <img src="../assets/img/cp.png" alt="">
        </div>
      </div>
      <div class="one ys" @click="gotoOption('tbys')">
        <div class="left">
          <span>AI填报优势</span>
          <span>多维、全面、智能</span>
        </div>
        <div class="right">
          <img src="../assets/img/ys.png" alt="">
        </div>
      </div>
    </div>
    <div class="home_ad_two" @click="gotoOption('tb')">
      <p>五步志愿填报法</p>
      <i class="iconfont iconiconfontyoujiantou-copy-copy-copy-copy"></i>
    </div>
  </div>
</template>
<script>
  // import ad1 from '@/assets/img/ad1.png'
  export default {
    inject: ['reload'],
    data () {
      return {
      }
    },
    methods: {
      gotoUs () {
        this.$router.push({path: '/aboutus'})
      },
      // gotoTB () {
      //   this.$router.push({path: '/tb'})
      // },
      gotoOption (val) {
        this.$router.push({name: val})
      }
    }
  }
</script>
<style lang="scss" scoped="">
  @media screen and (min-height: 320px) {
    .home-ad {
      /*margin: 10px 0 30px;*/
      font-size: 14px;
    }
    .home_ad_two {
      margin-top: 20px;
      font-size: 13px;
    }
  }
  @media screen and (min-height: 750px) {
    .home-ad {
      font-size: 15px;
      /*margin: 20px 0 35px;*/
    }
    .home_ad_two {
      margin-top: 25px;
      font-size: 15px;
    }
  }
  .home-ad {
    position: relative;
    /*height: 60px;*/
    margin: 20px 14px;
    /*font-size: 0;*/
    background: #fdfdfd;
    /*border-radius: 10px;*/
    /*box-shadow: 1px 1px 4px 0px rgba(71, 89, 172, 0.12);*/
    padding: 10px 0;
    text-align: center;
  }
  .home_ad_one {
    display: flex;
    width: 100%;
    /*height: 60px;*/
    justify-content: space-between;
    align-content: center;
    box-shadow: 1px 1px 4px 2px rgba(71, 89, 172, 0.12);
    padding: 10px 0;
    .cp {
      flex: 5;
    }
    .ys {
      flex: 6;
    }
    .one {
      display: flex;
      /*flex: 1;*/
      padding: 0 8px;
      align-content: center;
      justify-content: center;
      .left {
        flex: 3;
        display: flex;
        flex-direction: column;
        align-content: space-between;
        justify-content: center;
        color: #262626;
        span:nth-child(2) {
           margin-top: 3px;
           color: #9c9c9c;
           font-size: 11.5px;
         }
      }
      .right {
        flex: 1;
        height: 40px;
        /*margin-top: 10px;*/
        /*margin-left: 15px;*/
        display: flex;
        flex-direction: column;
        align-content: space-between;
        justify-content: center;
        img {
          height: 100%;
        }
      }
    }
  }
  .home_ad_two {
    position: relative;
    /*margin-top: 20px;*/
    line-height: 50px;
    height: 50px;
    background-color: #fff;
    box-shadow: 1px 2px 2px 2px rgba(71, 89, 172, 0.12);
    background-image: url('../assets/img/tb.png');
    background-size: 100%;
    color: #3c3c3c;
    p {
      position: absolute;
      left: 40px;
      /*font-size: 13px;*/
    }
    .iconfont {
      position: absolute;
      right: 5px;
      font-size: 17px;
      /*font-weight: 600;*/
    }
  }
</style>
