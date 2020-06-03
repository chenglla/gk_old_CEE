<template>
  <div class="ul-btns">
    <div class="menu-icon" @click="gotoPage('school')">
      <div class="icon-bac"><i class="iconfont iconxuexiao"></i></div>
      <div class="icon-text">搜学校</div>
    </div>
    <div class="menu-icon" @click="gotoPage('major')">
      <div class="icon-bac"><i class="iconfont iconxueke"></i></div>
      <div class="icon-text">查专业</div>
    </div>
    <div class="menu-icon" @click="gotoPage('news')">
      <div class="icon-bac"><i class="iconfont iconxinwen"></i></div>
      <div class="icon-text">高考资讯</div>
    </div>
    <div class="menu-icon" @click="gotoPage('bbs')">
      <!-- <div class="icon-bac"><i class="iconfont iconxiaoyou"></i></div> -->
      <div class="icon-bac"><i class="iconfont icontiezi"></i></div>
      <div class="icon-text">填报交流</div>
    </div>
    <div class="menu-circle" @click="gotoPage('predict')">
      <div class="icon-text">高考填报</div>
    </div>
  </div>
</template>
<script>
  export default {
    methods: {
      gotoPage (name) {
        if (name === 'school') {
          this.$router.push({
            name: name,
            params: { type: 'all' }
          })
        } else if (name === 'bbs') {
          this.$router.push({ path: '/bbs/hot' })
        } else {
          this.$router.push({ name: name })
        }
      }
    }
  }
</script>
<style lang="scss" scoped>
  @media screen and (min-height: 320px) {
    .ul-btns {
      margin: 10px 0 30px;;
      /*font-size: 13px;*/
    }
    .menu-circle, .menu-icon {
      font-size: 14px;
    }
  }
  @media screen and (min-height: 750px) {
    .ul-btns {
      /*font-size: 16px;*/
      margin: 20px 0 35px;
    }
    .menu-circle, .menu-icon {
      font-size: 16px;
    }
  }
  .ul-btns {
    /*margin: 10px 0 30px;*/
    text-align: center;
    font-size: 0;
    position: relative;
  }
  .menu-circle {
    position: absolute;
    z-index: 2;
    /*font-size: 14px;*/
    background:  url("../assets/img/icon.png") no-repeat;
    background-size: cover;
    color: #ffffff;
    width: 90px;
    height: 90px;
    border-radius: 100px;
    line-height: 90px;
    text-align: center;
    left: 50%;
    top: 50%;
    margin: -46px;
  }
  .menu-icon {
    position: relative;
    display: inline-block;
    width: 44%;
    margin: 1.5%;
    text-align: center;
    padding-top: 6px;
    padding-bottom: 10px;
    border-radius: 8px;
    box-shadow: 0px 0px 12px 0px #10184852;
    &:nth-child(1) {
      background: #4b6a98;
      color: #fff;
      .iconfont {
        color: #fff;
      }
    }
    &:nth-child(2) {
      background: #4c8365 ;
      color: #fff;
      .iconfont {
        color: #fff;
      }
    }
    &:nth-child(3) {
      background: #f4a95c;
      color: #fff;
      .iconfont {
        color: #fff;
      }
    }
    &:nth-child(4) {
      background: #a47bb9;
      color: #fff;
      .iconfont {
        color: #fff;
      }
    }
    .icon-bac {
      margin: 0 auto;
      width: 40px;
      height: 40px;
      color: #72b7e4;
      border-radius: 40px;
      text-align: center;
      line-height: 40px;
    }
    .iconfont {
      color: #72b7e4;
      font-size: 22px;
    }
    .icon-text {
      /*font-size: 13px;*/
    }
  }
</style>
