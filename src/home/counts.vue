<template>
  <div class="counts-box">
    <div class="counts-days">
      <div>距离高考 <span class="num">{{count}}</span><span class="unit">天</span></div>
    </div>
    <div class="my-intention">
     <!--  <div>
        <span class="my-intention__title">批次:</span>
        <span class="my-intention__value">{{infoObj.batch}}</span>
      </div> -->
      <div>
        <span class="my-intention__title">类别:</span>
        <span class="my-intention__value">{{infoObj.categ}}</span>
      </div>
      <div>
        <span class="my-intention__title">高考所在地:</span>
        <span class="my-intention__value">{{infoObj.prov}}</span>
      </div>
    </div>
  </div>
</template>
<script>
  import { getGaokaoDate } from '@/api/index'
  export default {
    data () {
      return {
        count: 0
      }
    },
    computed: {
      infoObj () {
        return this.$store.state.user.infoObj
      }
    },
    beforeMount () {
      getGaokaoDate().then(res => {
        this.count = res.data.data
      })
    }
  }
</script>
<style lang="scss" scoped="">
  @media screen and (min-height: 320px) {
    .counts-box {
      font-size: 14px;
    }
    .counts-days div,
    .my-intention div,
    .my-intention__title {
      font-size: 12px;
    }
    .my-intention div {
      line-height: 20px;
    }
    .num {
      top: 0;
      left: 50%;
    }
    .unit {
      bottom: 10px;
    }
  }
  @media screen and (min-height: 750px) {
    .counts-box {
      padding: 10px 0;
      font-size: 17px;
    }
    .counts-days div,
    .my-intention div,
    .my-intention__title {
      font-size: 15px;
    }
    .my-intention div {
      line-height: 23px;
    }
    .num {
      top: 8px;
      left: 53%;
    }
    .unit {
      bottom: 5px;
    }
  }
  .counts-box {
    /*padding: 8px 0;*/
    position: relative;
    height: 50px;
    /*font-size: 0;*/
    box-shadow: 0px 10px 10px 0px #647cfb20;
    z-index: 1;
    margin-bottom: 10px;
    background: #ffffff;
    overflow: hidden;
    display: flex;
    .counts-days {
      flex: 55%;
    }
    .my-intention {
      flex: 45%;
    }
    .counts-days,
    .my-intention {
      /*width: 40%;*/
      /*display: inline-block;*/
      /*font-size: 2rem;*/
      /*font-size: 14px;*/
      height: 50px;
      vertical-align: top;
      padding-top: 4px;
    }
  }
  .my-intention div {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 100%;
  }
  .counts-box .counts-days {
    /*width: 60%;*/
    box-shadow: 6px 0px 20px rgba(221, 221, 221, 0.2);
    position: relative;
    & > div {
      padding-left: 20px;
      /*font-size: 12px;*/
    }
    .num {
      position: absolute;
      font-size: 36px;
      color: #ee625f;
      /*top: 8px;*/
      display: block;
      width: 40px;
      text-align: center;
      /*left: 53%;*/
      margin-left: -20px;
      font-weight: bold;
    }
    .unit {
      position: absolute;
      left: 50%;
      bottom: 5px;
      /*top: 10px;*/
      margin-left: 40px;
    }
  }
  .my-intention div {
    padding-left: 20px;
    padding: 0 20px;
    /*margin-top: 4px;*/
    text-align: left;
    line-height: 23px;
    position: relative;
    /*font-size: 13px;*/
  }
  .my-intention__title {
    color: #888;
    /*font-size: 12px;*/
  }
</style>
